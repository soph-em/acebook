import Navbar from "../Navbar/Navbar";

import "./HomePage.css";
import { FeedPage } from "../Feed/FeedPage";

export const HomePage = () => {
  return (
    <div className="home">
      <Navbar />
      <br></br>

      <h1>Welcome to Acebook!</h1>
      <br />

      <FeedPage />
    </div>
  );
};
