import { useState, useEffect } from "react";

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
    // Creating a div element with a relative position and a high zIndex to ensure it appears on top of other elements
    <div style={{ position: "relative", zIndex: 9999 }}>
      <div className="relative inline-block text-right">
        <button
          onClick={toggleDropdown}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Friends
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700"
          style={{ left: "-175%", top: "100%" }}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li key="followers" className="font-semibold">
              Followers
            </li>
            {followers.map((follower, index) => (
              <li key={`follower_${index}`} className="py-1">
                {follower.username}
              </li>
            ))}
          </ul>
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li key="following" className="font-semibold">
              Following
            </li>
            {following.map((user, index) => (
              <li key={`following_${index}`} className="py-1">
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FriendsDropdown;
