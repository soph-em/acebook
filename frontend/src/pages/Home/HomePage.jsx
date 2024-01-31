
import { Link } from "react-router-dom";
import Logout from "../../components/Logout/Logout";
import Navbar from "../Navbar/Navbar";

import "./HomePage.css";
import { FeedPage } from "../Feed/FeedPage";


export const HomePage = () => {
  return (
    <div className="home">
      <Navbar />
      <h1>Welcome to Acebook!</h1>

      {/* <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>

      <Logout /> */}

      <FeedPage/>


    </div>
  );
};
