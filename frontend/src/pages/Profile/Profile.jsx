import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { getUser } from "../../services/users";


export const Profile = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem('token'));


  useEffect(() => {
    getUser(token)
    .then((data) => {
        console.log(data)
        setUsername(data.username);
    })
    .catch((err) => {
        console.log(err);
    })
}, [token]);
    console.log(username);

  return (
    <>
      <Navbar />
      <h2>Profile</h2>
      <p>Username: {username}</p>
    </>
  );
};
