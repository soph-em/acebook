import React, { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LikeButton = ({postId, postLikes, setLikes}) => {
    const [isLiked, setIsLiked] = useState(false); //Initially Post is Not Liked.
    
    const handleLikeClick = async () => {
      //FETCH - put request
      // Example POST method implementation:
    // Default options are marked with *
    const response = await fetch(`${BACKEND_URL}/like/${postId}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    const data  = await response.json()
    setLikes([...postLikes, data.user_id])
    console.log(postLikes)
    
  }



        /*console.log("Liked") // Do action - SetUserID
        setIsLiked(true);
        console.log(props.postId)*/
  return (
    <button onClick={handleLikeClick} disabled={isLiked}>
        {isLiked ? 'Liked!' : 'Like'}
    </button>
    //Toggle - isLiked is true, it will display 'Liked!
  )
}

export default LikeButton


