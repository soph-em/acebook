import { useState, useEffect } from "react";
import { getFollowing } from "../../services/following";

const Following = ({ userId }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const data = await getFollowing(userId);
        console.log("Data received:", data); // Log the received data
        // Check if data.following is defined and not empty before setting the state
        if (data && Array.isArray(data) && data.length > 0) {
          console.log("Following:", data); // Log the following array
          setFollowing(data);
        } else {
          console.log("No following data found");
        }
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };

    fetchFollowing();
  }, [userId]);

  return (
    <div>
      <h2>Following</h2>
      <ul>
        {following &&
          following.map((user) => <li key={user._id}>{user.username}</li>)}
      </ul>
    </div>
  );
};

export default Following;
