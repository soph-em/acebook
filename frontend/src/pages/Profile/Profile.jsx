import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser, putUser } from "../../services/users";
import { getPostsbyId } from "../../services/posts";
import { getUserIdFromToken } from "../../services/decodeToken";
import Post from "../../components/Post/Post";
import Navbar from "../Navbar/Navbar";
// import Comments from "../../components/Comments/Comment";
import UploadWidget from "./UploadWidget";
//import Followers from "../../components/Followers/Followers";
//import Following from "../../components/Followers/Following";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const loggedInUserId = getUserIdFromToken(); // Use the function to get the logged-in user's ID
  const { userId } = useParams(); // Capture the userId from the URL
  const [image, setImage] = useState(null);

  const handleUpload = (imageUrl) => {
    putUser(imageUrl);
    setImage(imageUrl);
  };
  useEffect(() => {
    getUser(userId)
      .then((data) => {
        setUsername(data.username);
        setImage(data.image);
      })
      .catch((err) => {
        console.error(err);
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

  const updatePostInState = (updatedPost) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === updatedPost._id) {
        return updatedPost; // Replace with the updated post
      }
      return post; // Return untouched post
    });
    setPosts(updatedPosts); // Update state with the new posts array
  };

  const deletePostFromState = (postId) => {
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts); // Update state with the filtered posts array
  };

  return (
    <>
      <Navbar />
      <h2 className="text-2xl pt-3 pb-5">Profile</h2>
      <p className="text-xl pb-3">
        Username: <p className="text-blue-500">{username}</p>
      </p>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center pb-5">
          <img className="h-14 w-max pt-2" src={image} alt="Profile" />
        </div>
        {loggedInUserId === userId && (
          <div className="flex flex-col p-3 pl-3 pb-5">
            <>
              <p>Upload a new profile photo:</p>
              <UploadWidget onImageUpload={handleUpload} />
            </>
          </div>
        )}
      </div>

      <p className="pt-3">My Posts:</p>

      <div>
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            token={token}
            allowComments={!!token}
            onUpdatePost={updatePostInState}
            onDeletePost={deletePostFromState}
          />
        ))}
      </div>
    </>
  );
};
