import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/users";
import { getPostsbyId } from "../../services/posts";
import Post from "../../components/Post/Post";
import Navbar from "../Navbar/Navbar";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const { userId } = useParams(); // Capture the userId from the URL

  useEffect(() => {
    console.log(`Fetching data for User ID: ${userId}`);

    getUser(userId)
      .then((data) => {
        console.log(`Data received from getUser for User ID ${userId}:`, data);
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
      <p>My Posts:</p>
      <div>
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
