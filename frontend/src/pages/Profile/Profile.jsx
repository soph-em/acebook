import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/users";
import { getPostsbyId } from "../../services/posts";
import Post from "../../components/Post/Post";
import Navbar from "../Navbar/Navbar";
import Comments from "../../components/Comments/Comment";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const { userId } = useParams(); // Capture the userId from the URL

  useEffect(() => {
    getUser(userId)
      .then((data) => {
        setUsername(data.username);
      })
      .catch((err) => {
        console.error(`Error fetching user for User ID ${userId}:`, err);
      });

    getPostsbyId(userId)
      .then((data) => {
        const userPosts = data.posts.filter(
          (post) => post.createdBy._id === userId
        );
        setPosts(userPosts.reverse()); // Apply reverse here
      })
      .catch((err) => {
        console.error(`Error fetching posts for User ID ${userId}:`, err);
      });
  }, [userId]); // React to changes in userId

  return (
    <>
      <Navbar />
      <h2>Profile</h2>
      <p>Username: {username}</p>
      <div className="feed" role="feed">
        {posts &&
          posts.map(
            (post) =>
              post && (
                <Post
                  post={post}
                  key={post._id}
                  token={token}
                  allowComments={!!token}
                />
              )
          )}
      </div>
    </>
  );
};
