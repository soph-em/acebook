import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FriendsDropdown({ userId, getFollowers, getFollowing }) {
  const [isOpen, setIsOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const followersData = await getFollowers(userId);
        // console.log("Followers data:", followersData);
        setFollowers(followersData);
        const followingData = await getFollowing(userId);
        // console.log("Following data:", followingData);
        setFollowing(followingData);
      } catch (error) {
        // console.error("Error fetching friends data:", error);
      }
    };

    fetchFriendsData();
  }, [userId, getFollowers, getFollowing]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ul>
      <li style={{ position: "relative", zIndex: 9999 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            toggleDropdown(); // Function to toggle the visibility of the dropdown menu
          }}
          style={{ cursor: "pointer" }}
        >
          {/* Ensures cursor changes to pointer on hover */}
          Friends
        </a>
        {isOpen && (
          <div
            className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-48"
            style={{ left: "0", top: "100%" }}
          >
            <ul className="py-1 text-sm text-gray-700">
              <li key="followers" className="font-bold">
                Followers
              </li>
              {followers.map((follower) => (
                <li key={follower._id} className="py-1">
                  <Link
                    to={`/profile/${follower._id}`}
                    className="text-blue-500 text-sm"
                  >
                    {follower.username}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="py-1 text-sm text-gray-700">
              <li key="following" className="font-bold">
                Following
              </li>
              {following.map((user) => (
                <li key={user._id} className="py-1">
                  <Link
                    to={`/profile/${user._id}`}
                    className="text-blue-500 text-sm"
                  >
                    {user.username}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    </ul>
  );
}

export default FriendsDropdown;
