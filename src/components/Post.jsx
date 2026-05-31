import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostListContext } from "../store/Post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);

 const getInitials = (userId) => {
  return userId ? String(userId).slice(0, 2).toUpperCase() : "U";
};


  const getReactions = () => {
    if (post.reactions && typeof post.reactions === 'object') {
      return { likes: post.reactions.likes || 0, dislikes: post.reactions.dislikes || 0 };
    }
    return { likes: post.reactions || 0, dislikes: 0 };
  };

  const { likes, dislikes } = getReactions();

  return (
    <div className="post-card">
      {post.image && (
        <img src={post.image} alt="post" className="post-image" />
      )}
      <div className="post-body">
        <div className="post-header">
          <div className="post-user">
            <div className="post-avatar">{getInitials(post.userId)}</div>
            <div className="post-user-info">
              <span className="post-username">{post.userId || "Anonymous"}</span>
              <span className="post-time">Just now</span>
            </div>
          </div>
          <button
            className="post-delete-btn"
            onClick={() => deletePost(post.id)}
            title="Delete post"
          >
            <MdDelete />
          </button>
        </div>

        <div className="post-title">{post.title}</div>
        <div className="post-content">{post.body}</div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="post-tag">#{tag}</span>
            ))}
          </div>
        )}

        <div className="post-reactions">
          <button className="reaction-btn likes">
            👍 <span>{likes} Likes</span>
          </button>
          <button className="reaction-btn dislikes">
            👎 <span>{dislikes} Dislikes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;