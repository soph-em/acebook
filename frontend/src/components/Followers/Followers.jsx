import { useState, useEffect } from "react";
import { getFollowers } from "../../services/followers";

const Followers = ({ userId }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getFollowers(userId);
        console.log("Data received:", data); // Log the received data
        // Check if data.followers is defined and not empty before setting the state
        if (data && Array.isArray(data) && data.length > 0) {
          console.log("Followers:", data); // Log the followers array
          setFollowers(data);
        } else {
          console.log("No followers data found");
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [userId]);

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers &&
          followers.map((follower) => (
            <li key={follower._id}>{follower.username}</li>
          ))}
      </ul>
    </div>
  );
};

export default Followers;
