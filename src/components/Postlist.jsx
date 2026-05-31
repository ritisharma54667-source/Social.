 import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { PostListContext } from "../store/Post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const Postlist = () => {
  const { postList, addInitialPosts } = useContext(PostListContext);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://dummyjson.com/posts', { signal })
      .then(res => res.json())
      .then(data => {
        addInitialPosts(data.posts);
        setFetching(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setFetching(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="main-feed">
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching && postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Postlist;