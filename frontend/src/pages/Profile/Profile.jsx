import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { getUser } from '../../services/posts';


export const Profile = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const user = await response.json();
        const fetchedUsername = await getUser(user._id);
        setUsername(fetchedUsername);
        console.log(fetchedUsername);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function directly
  }, []);

  return (
    <>
      <Navbar />
      <h2>Profile</h2>
      <p>Username: {username}</p>
    </>
  );
};
