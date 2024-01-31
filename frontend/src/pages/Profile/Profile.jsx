import Navbar from "../Navbar/Navbar";
import { getPosts } from '../../services/posts';
export const Profile = () => {
    // Fetch user information in your React component
const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const user = await response.json();
      console.log(user.username); // This is the username
  
    } catch (error) {
      console.error(error);
    }
  };
  
    return (
        <>
        <Navbar/>
        <h2>Profile</h2>
        <p>{user._id}</p>
        </>
    )
}