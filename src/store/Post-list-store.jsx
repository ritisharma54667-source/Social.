 import { createContext, useReducer, useEffect } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === 'DELETE_POST') {
    newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
  } else if (action.type === 'ADD_INITIAL_POSTS') {
    // ✅ Keep user posts at top, add API posts below
    const userPosts = currPostList.filter(
      post => typeof post.userId === 'string'
    );
    newPostList = [...userPosts, ...action.payload.posts];
  } else if (action.type === 'ADD_POST') {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostlistProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    [],
    () => {
      const saved = localStorage.getItem('userPosts');
      return saved ? JSON.parse(saved) : [];
    }
  );

  // ✅ save user posts to localStorage on every change
  useEffect(() => {
    const userPosts = postList.filter(
      post => typeof post.userId === 'string'
    );
    if (userPosts.length > 0) {
      localStorage.setItem('userPosts', JSON.stringify(userPosts));
    }
  }, [postList]);

  const addPost = (userId, postTitle, postBody, reactions, tags, image = null) => {
    dispatchPostList({
      type: 'ADD_POST',
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions || { likes: 0, dislikes: 0 },
        userId: userId,
        tags: tags,
        image: image,
      }
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: 'ADD_INITIAL_POSTS',
      payload: { posts },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  return (
    <PostListContext.Provider value={{ postList, addPost, addInitialPosts, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostlistProvider;