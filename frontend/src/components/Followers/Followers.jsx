import { useState, useEffect } from "react";
import { getFollowers } from "../../services/followers";
import { followUser, unfollowUser } from "../../services/followers";

const Followers = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getFollowers(userId);
        // Check if data.followers is defined and not empty before setting the state
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
  }, [userId]);

  const handleFollow = async () => {
    try {
      await followUser(userId);
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(userId);
      setIsFollowing(false);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower._id}>{follower.username}</li>
        ))}
      </ul>
      {!isFollowing ? (
        <button onClick={handleFollow}>Follow</button>
      ) : (
        <button onClick={handleUnfollow}>Unfollow</button>
      )}
    </div>
  );
};

export default Followers;
