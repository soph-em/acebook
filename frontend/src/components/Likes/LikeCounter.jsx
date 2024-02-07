import React, { useState } from "react";

const LikeCounter = ({ likes }) => {
  return (
    <div className="flex text-sm pt-3">
      <p>Liked by {likes.length} people</p>
    </div>
  );
};

export default LikeCounter;
