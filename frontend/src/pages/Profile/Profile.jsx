import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import { getUser } from "../../services/users";
import { getPostsbyId } from "../../services/posts"; // Assuming this function exists and works similarly
import Post from "../../components/Post/Post";
import Navbar from "../Navbar/Navbar";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const { userId } = useParams(); // Capture the userId from the URL

  useEffect(() => {
    // Pass userId to getUser; if userId is undefined, getUser defaults to logged-in user
    getUser(userId)
      .then((data) => {
        setUsername(data.username);
      })
      .catch((err) => {
        console.error(err);
      });

    // Assuming getPostsById is adapted to accept a userId and fetch posts for that user
    getPostsbyId(userId) // Pass userId to getPostsById
      .then((data) => {
        setPosts(data.posts.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]); // React to changes in userId

  return (
    <>
      <Navbar />
      <h2>Profile</h2>
      <p>Username: {username}</p>
      <p>My Posts:</p>
      <div>
        {posts &&
          posts.map((post) => post && <Post post={post} key={post._id} />)}
      </div>
    </>
  );
};
