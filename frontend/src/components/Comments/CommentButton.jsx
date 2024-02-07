import { useState, useEffect } from "react";
import { fetchComments, postComment } from "../../services/comments";

export const CommentButton = ({
  postId,
  token,
  allowComments,
  toggleComments,
}) => {
  return (
    <>
      <div className="w-1/2 border-2 p-2 bg-white">
        <button onClick={toggleComments}>Show Comments</button>
      </div>
    </>
  );
};
