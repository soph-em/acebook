import { useState, useEffect } from "react";
import { getFollowing } from "../../services/following";

// Component to display users that the current user is following.
const Following = ({ userId }) => {
  // State for storing the list of users being followed.
  const [following, setFollowing] = useState([]);

  // Fetch the list of users being followed when component mounts or userId changes.
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const data = await getFollowing(userId);
        // Update following list if data is valid and not empty.
        if (data && Array.isArray(data) && data.length > 0) {
          setFollowing(data);
        } else {
          console.log("No following data found");
        }
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };

    fetchFollowing();
  }, [userId]); // Dependency array includes userId to refetch on change.

  // Render the list of users being followed with styling.
  return (
    <div className="flex">
      <div className="w-1/2 p-2">
        <h2 className="text-s text-blue-500 font-semibold">Following</h2>
        <ul>
          {/* Map through following list to display each user with styling. */}
          {following &&
            following.map((user) => (
              <li key={user._id} className="mb-2 text-blue-500">
                {user.username}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Following;
