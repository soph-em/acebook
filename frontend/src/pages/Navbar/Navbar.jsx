import "./navbar.css"
import Logout from "../../components/Logout/Logout";
import { useState } from "react";



const Navbar = () => {
    const [isLoggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") !== null)

    let content
    // (console.log(isLoggedIn))

    if (isLoggedIn) {
        // If user is logged in, show these buttons
        content = (
            <>
                <li>
                    <a href="/dashboard">Feed</a>
                </li>
                <li>
                    <a href="/profile">My Profile</a>
                </li>
                <li>
                    <Logout />
                </li>
            </>
        );

    } else {
        // If user is not logged in, show these buttons
        content = (
            <>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/signup">Sign Up</a>
                </li>
            </>
        );
    }

    return (
        <nav className="nav">
            <ul className="navLinks">
                {/* <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/posts">Posts</a>
                </li>
                <li>
                <a href="/posts">Profile</a>
                </li> */}
                {content}
            </ul>
        </nav>
    );
}

export default Navbar;







// const Navbar = () => {
//     return (
        
//         <nav className="nav">
//             <a className ="navTitle" href ="/">Acebook</a>
//             <ul className="navLinks">
//                 <li>
//                     <a href = "/posts">Home</a>
//                 </li>
//                 <li>
//                     <a href="/posts">Posts</a>
//                 </li>
//                 <li>
//                     {/* will route once we have a profile page */}
//                     <a href="">Profile</a>
//                 </li>
//             </ul>
//         </nav> 
//     )
// }

// export default Navbar