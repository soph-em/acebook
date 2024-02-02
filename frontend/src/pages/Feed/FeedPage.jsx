/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import { getPosts, createPost } from "../../services/posts";
import Post from "../../components/Post/Post";
import NewPost from "../../components/Post/NewPost";
import "../.././styles.css";
import Navbar from "../Navbar/Navbar";

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

  const handleNewPost = async (message) => {
    if (!token) {
      console.error("No token provided");
      return; // Exit if no token is present
    }

    try {
      const response = await createPost(message, token);
      setPosts((prevPosts) => [response.post, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <h2>Posts</h2>
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
                />
              )
          )}
      </div>
    </>
  );
};
