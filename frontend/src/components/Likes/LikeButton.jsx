import React, { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LikeButton = ({ postId, postLikes, setLikes }) => {
  const [isLiked, setIsLiked] = useState(false); //Default False

  const handleLikeClick = async () => {
    //FETCH - PUT request
    const response = await fetch(`${BACKEND_URL}/like/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setLikes([...postLikes, data.user_id]);
    console.log(postLikes);
  };

  return (
    <button
      className="w-full border-2 p-2 bg-white"
      onClick={handleLikeClick}
      disabled={isLiked}
    >
      {isLiked ? "Liked!" : "Like Post"}
    </button>
  );
};

export default LikeButton;
