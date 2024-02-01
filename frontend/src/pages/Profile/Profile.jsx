import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { getUser } from "../../services/users";


export const Profile = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    getUser()
    .then((data) => {
        console.log(data)
        setUsername(data.username);
    })
    .catch((err) => {
        console.log(err);
    })
}, []);
    console.log(username);

  return (
    <>
      <Navbar />
      <h2>Profile</h2>
      <p>Username: {username}</p>
    </>
  );
};
