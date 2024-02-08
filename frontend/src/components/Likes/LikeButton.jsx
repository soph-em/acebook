import React, { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LikeButton = ({postId, postLikes, setLikes}) => {
    const [isLiked, setIsLiked] = useState(false); //Default False
    
    const handleLikeClick = async () => {
      if (isLiked) return; //If the post is already liked do nothing.

      try {
        //Fetch Request
        const response = await fetch(`${BACKEND_URL}/like/${postId}`, {
        method: "PUT", 
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    //If request is succesful..
    //updates status to show post as been liked
    //add postID to the likes array and updates frontend
    if (response.ok) {
      
      setIsLiked(true);
      setLikes([...postLikes, postId]) 
    } else {
    //If request fails
      const errorData = await response.json();
      console.error('Unable to like post', errorData.msg)
    }
  } catch (error) {
    console.error('Error liking the post', error.message)
  }
};
  return (
    <button onClick={handleLikeClick} disabled={isLiked}>
        {isLiked ? 'Liked!' : 'Like'}
    </button>
  )
}

export default LikeButton