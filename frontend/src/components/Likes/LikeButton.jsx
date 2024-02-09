import React, { useState, useEffect } from "react";
import { getUserIdFromToken } from "../../services/decodeToken";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LikeButton = ({ postId, postLikes, setLikes }) => {
  const [isLiked, setIsLiked] = useState(false); //Default False
  const userId = getUserIdFromToken();

  //Check if the post is liked
  useEffect(() => {
    // Check if postLikes is an array and userId is valid
    if (Array.isArray(postLikes) && userId && postLikes.includes(userId)) {
      setIsLiked(true);
    }
  }, [postLikes, userId]);

  const handleLikeClick = async () => {
    if (isLiked) return; //If the post is already liked do nothing.

    try {
      //Fetch Request
      const response = await fetch(`${BACKEND_URL}/like/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      //If request is succesful..
      //updates status to show post as been liked
      //add postID to the likes array and updates frontend
      if (response.ok) {
        setIsLiked(true);
        setLikes([...postLikes, postId]);
      } else {
        //If request fails
        const errorData = await response.json();
        console.error("Unable to like post", errorData.msg);
      }
    } catch (error) {
      console.error("Error liking the post", error.message);
    }
  };

  //Create Unlike Btn
  const handleUnLikeClick = async () => {
    try {
      //Fetch Request
      const response = await fetch(`${BACKEND_URL}/unlike/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setIsLiked(false);
        setLikes(postLikes.filter((id) => id !== postId));
      } else {
        // Check if the response can be parsed as JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          console.error("Unable to unlike post", errorData.msg);
        } else {
          console.error("Unable to unlike post", await response.text());
        }
      }
    } catch (error) {
      console.error("Error unliking the post", error.message);
    }
  };

  return (
    <button
      className="w-full border-2 p-2 bg-white"
      onClick={isLiked ? handleUnLikeClick : handleLikeClick}
      // disabled={isLiked}
    >
      {isLiked ? "Unlike Post" : "Like Post"}
    </button>
  );
};

export default LikeButton;
