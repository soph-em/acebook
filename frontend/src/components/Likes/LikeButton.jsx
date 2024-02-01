import React, { useState } from 'react'

const LikeButton = () => {
    const [isLiked, setIsLiked] = useState(false); //Initially Post is Not Liked.

    const handleLikeClick = () => {
        console.log("Liked") // Do action - SetUserID
        setIsLiked(true);
    }
  return (
    <button onClick={handleLikeClick} disabled={isLiked}>
        {isLiked ? 'Liked!' : 'Like'}
    </button>
    //Toggle - isLiked is true, it will display 'Liked!
  )
}

export default LikeButton
