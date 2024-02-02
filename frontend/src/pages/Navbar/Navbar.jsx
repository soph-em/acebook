/* eslint-disable no-unused-vars */
import "./navbar.css"
import Logout from "../../components/Logout/Logout";

import { useState } from "react";



const Navbar = () => {
    const [isLoggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") !== null)
    const currentURL = window.location.pathname
    let content

    if (isLoggedIn) {
        // If user is logged in, show these buttons
        content = (
            <>
                <li>
                    {/* This line will need to be added for each of the other pages
                    once they have been made, only need to add the path to make it work */}
                    <a href="/" className={currentURL === "/" ? "active" : ""}>Feed</a>
                </li>

                <li>
                    <a href="/friends">Friends</a>
                </li>
                
                <li>
                    <a href="/profile">My Profile</a>
                </li>
            </>
        );

    } else {
        // If user is not logged in, show these buttons
        content = (
            <>
                <li>
                    <a href="/login" className={currentURL === "/login" ? "active" : ""}>Login</a>
                </li>
                <li>
                    <a href="/signup" className={currentURL === "/signup" ? "active" : ""}>Sign Up</a>
                </li>
            </>
        );
    }
    
    return (
        <nav className="nav">
            <ul className="navLinks">
                {content}
            </ul>
            <Logout />
        </nav>
    );
}

export default Navbar;

