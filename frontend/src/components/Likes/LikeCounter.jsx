import React, { useState } from 'react'


const LikeCounter = ({likes}) => {
  return (
    <div>
      <p>{likes.length}</p>
      
    </div>
  )
}

export default LikeCounter 
