import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { getUser, putUser } from "../../services/users";
import { getPostsbyId } from "../../services/posts";
import Post from "../../components/Post/Post";
import UploadWidget from "./UploadWidget";

export const Profile = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([])
  const [image, setImage] = useState(null)

  const handleUpload = (imageUrl) => {
    putUser(imageUrl)
    setImage(imageUrl)
  }
  useEffect(() => {
    getUser()
    .then((data) => {
        setUsername(data.username);
        setImage(data.image);
    })
    .catch((err) => {
        console.log(err);
    })
    getPostsbyId()
    .then((data) => {
        setPosts(data.posts.reverse());
      })
    .catch((err) => {
    console.error(err);
    });
}, []);
    // console.log(username);
    // if (image == null ){
    //   setImage("https://www.shutterstock.com/image-vector/default-profile-picture-avatar-photo-260nw-1681253560.jpg")
    // }
  return (
    <>
      <Navbar />
      <h2>Profile</h2>
      <p>Username: {username}</p>
      <UploadWidget onImageUpload={handleUpload}/>
      <img src={image}/>
      <p>My Posts:</p>
      <div>
        {posts &&
          posts.map((post) => post && <Post post={post} key={post._id} />)}
      </div>
    </>
  );
};
