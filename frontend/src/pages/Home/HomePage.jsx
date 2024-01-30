import { Link } from "react-router-dom";

import "./HomePage.css";
import { FeedPage } from "../Feed/FeedPage";

export const HomePage = () => {
  return (
    <div className="home">
      <h1>Welcome to Acebook!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
      <FeedPage/>
    </div>
  );
};
