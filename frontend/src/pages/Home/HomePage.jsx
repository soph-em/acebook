// import { Link } from "react-router-dom";

import "./HomePage.css";
import Navbar from "../Navbar/Navbar";

export const HomePage = () => {
  return (
    <div className="home">
      <Navbar />
      <h1>Welcome to Acebook!</h1>
      {/* <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link> */}
    </div>
  );
};
