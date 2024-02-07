import { useState, useEffect } from "react";
import { getFollowing } from "../../services/following";

const Following = ({ userId }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const data = await getFollowing(userId);
        // Check if data.following is defined and not empty before setting the state
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
  }, [userId]);

  return (
    <div className="flex">
      <div className="w-1/2 p-2">
        <h2 className="text-s text-blue-500 font-semibold">Following</h2>
        <ul>
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
