import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { getUser } from "../../services/users";
import { getPostsbyId } from "../../services/posts";
import Post from "../../components/Post/Post";

export const Profile = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getUser()
    .then((data) => {
        // console.log(data)
        setUsername(data.username);
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
