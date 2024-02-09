/* eslint-disable no-unused-vars */
import "./Navbar.css";
import Logout from "../../components/Logout/Logout";
import { getUserIdFromToken } from "../../services/decodeToken";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user_id = getUserIdFromToken();
  const [isLoggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("token") !== null
  );
  const currentURL = window.location.pathname;
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
          <a href="/friends" data-testid="test-profile">
            Friends
          </a>
        </li>

        <li>
          <Link to={`/profile/${user_id}`}
          className={location.pathname === `/profile/${user_id}` ? "active" : ""}>My Profile</Link> 
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
