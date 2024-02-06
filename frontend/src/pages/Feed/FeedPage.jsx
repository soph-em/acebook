import { useState, useEffect } from "react";

import { getPosts, createPost } from "../../services/posts";
import Post from "../../components/Post/Post";
import NewPost from "../../components/Post/NewPost";
import "../.././styles.css";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  useEffect(() => {
    // Fetch posts without needing a token
    getPosts()
      .then((data) => {
        setPosts(data.posts.reverse()); // Update state with fetched posts
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleNewPost = async (message, imageUrl) => {
    console.log(message);
    if (!token) {
      console.error("No token provided");
      return; // Exit if no token is present
    }

    try {
      const response = await createPost(message, imageUrl, token);
      setPosts((prevPosts) => [response.post, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post, ) => post._id !== postId));
  };


  return (
    <>
      {/* <Navbar /> */}
      <h2 className="text-blue-500 font-bold">Posts</h2>
      <br />
      {/* Only render the new post component if there is a token present */}
      {token && <NewPost onNewPost={handleNewPost} />}

      <div className="feed" role="feed">
        {posts &&
          posts.map(
            (post) =>
              post && (
                <Post
                  post={post}
                  key={post._id}
                  token={token}
                  // if token is null, undefined, or an empty string (meaning the
                  // user is not authenticated or the token is not present),
                  // !!token evaluates to false and comments are not rendered
                  allowComments={!!token}
                  onUpdatePost={handleUpdatePost}
                  onDeletePost={handleDeletePost}
                />
              )
          )}
      </div>
    </>
  );
};

export default FeedPage;