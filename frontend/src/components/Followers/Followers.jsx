import { useState, useEffect } from "react";
import { getFollowers } from "../../services/followers";
import { followUser, unfollowUser } from "../../services/followers";

// Component to display followers of a user and allow to follow/unfollow.
const Followers = ({ userId }) => {
  // State for storing followers list.
  const [followers, setFollowers] = useState([]);
  // State to track if the current user is following the viewed user.
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch followers when component mounts or userId changes.
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getFollowers(userId);
        // Update followers list if data is valid and not empty.
        if (data && Array.isArray(data) && data.length > 0) {
          setFollowers(data);
        } else {
          console.log("No followers data found");
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [userId]); // Dependency array includes userId to refetch on change.

  // Function to handle follow action.
  const handleFollow = async () => {
    try {
      await followUser(userId);
      setIsFollowing(true); // Update state to reflect the follow action.
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  // Function to handle unfollow action.
  const handleUnfollow = async () => {
    try {
      await unfollowUser(userId);
      setIsFollowing(false); // Update state to reflect the unfollow action.
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  // Render followers list and follow/unfollow button with TailwindCSS styling.
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg text-blue-500 font-semibold">Followers</h2>
      <ul className="w-full p-2">
        {/* Map through followers list to display each follower with styling. */}
        {followers.map((follower) => (
          <li key={follower._id} className="mb-2 text-blue-500">
            {follower.username}
          </li>
        ))}
      </ul>
      {/* Conditional rendering for follow/unfollow button with styling. */}
      {!isFollowing ? (
        <button
          onClick={handleFollow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Follow
        </button>
      ) : (
        <button
          onClick={handleUnfollow}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Unfollow
        </button>
      )}
    </div>
  );
};

export default Followers;
