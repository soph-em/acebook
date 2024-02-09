/* eslint-disable no-unused-vars */
import "./Navbar.css";
import Logout from "../../components/Logout/Logout";
import { getUserIdFromToken } from "../../services/decodeToken";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFollowers } from "../../services/followers";
import { getFollowing } from "../../services/following";
import FriendsDropdown from "../Navbar/FriendDropdown";

const Navbar = () => {
  const user_id = getUserIdFromToken();
  const [isLoggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("token") !== null
  );
  const [followers, setFollowers] = useState([]); // State to store the user's followers list
  const [following, setFollowing] = useState([]); // State to store the user's following list
  const currentURL = window.location.pathname;
  const [showDropdown, setShowDropdown] = useState(false); // State to control the visibility of the dropdown

  useEffect(() => {
    // Fetch the user's followers and following lists when the component mounts
    fetchFollowers();
    fetchFollowing();
  }, []);

  const fetchFollowers = async () => {
    try {
      const data = await getFollowers(user_id); // Fetch the user's followers list
      setFollowers(data); // Set the fetched followers list in state
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const data = await getFollowing(user_id); // Fetch the user's following list
      setFollowing(data); // Set the fetched following list in state
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle the visibility of the dropdown
  };

  let content;

  if (isLoggedIn) {
    // If user is logged in, show these buttons
    content = (
      <>
        <li>
          {/* This line will need to be added for each of the other pages
            once they have been made, only need to add the path to make it work */}
          <a href="/" className={currentURL === "/" ? "active" : ""}>
            Feed
          </a>
        </li>

        <li>
          <FriendsDropdown
            userId={user_id}
            getFollowers={getFollowers}
            getFollowing={getFollowing}
            toggleDropdown={toggleDropdown}
          />
        </li>

        <li>
          {user_id && <Link to={`/profile/${user_id}`}>My Profile</Link>}
        </li>
        <Logout />
      </>
    );
  } else {
    // If user is not logged in, show these buttons
    content = (
      <>
        <li>
          <a href="/login" className={currentURL === "/login" ? "active" : ""}>
            Login
          </a>
        </li>
        <li>
          <a
            data-testid="sign-up"
            href="/signup"
            className={currentURL === "/signup" ? "active" : ""}
          >
            Sign Up
          </a>
        </li>
      </>
    );
  }

  return (
    <nav className="nav">
      <ul className="navLinks">{content}</ul>
    </nav>
  );
};

export default Navbar;
