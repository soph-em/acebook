// This code defines a React component called "Comments" that displays comments and allows users to add new comments.

import { useState, useEffect } from "react";
import { fetchComments, postComment } from "../../services/comments";
import { CommentButton } from "./CommentButton";

const Comments = ({ postId, token, allowComments }) => {
  // Initialize state variables using the useState hook
  const [comments, setComments] = useState([]); // Stores the fetched comments
  const [newComment, setNewComment] = useState(""); // Stores the value of the new comment input field
  const [newCommentAdded, setNewCommentAdded] = useState(null); // Triggers useEffect when a new comment is added
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };
  // Fetch comments from the server when the postId or newCommentAdded value changes
  useEffect(() => {
    fetchComments(postId).then(setComments);
  }, [postId, newCommentAdded]);

  // Handles the submission of a new comment
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    // If the new comment is empty or contains only whitespace, return without adding the comment
    if (!newComment.trim()) return;

    // Send a request to the server to post the new comment
    const comment = await postComment(postId, newComment, token);

    // If the comment was successfully posted, update the state variables
    if (comment) {
      setNewCommentAdded(comment); // Trigger useEffect to fetch updated comments
      setNewComment(""); // Clear the new comment input field
    }
  };

  return (
    <div className="pt-0">
      {/* Render comment form if comments are allowed */}
      {allowComments && (
        <>
          <CommentButton toggleComments={toggleComments} />
          {showComments && (
            <>
              <div>
                <form onSubmit={handleCommentSubmit}>
                  <button
                    type="submit"
                    // className="bg-blue-400 text-white py-1 px-4 rounded-md hover:bg-blue-700"
                  >
                    Comment
                  </button>
                </form>
              </div>
              <div className="pt-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                />
              </div>
              {/* Render comments */}
              {comments.map((comment) => (
                <div key={comment._id} style={{ fontSize: "smaller" }}>
                  <strong className="text-blue-500">
                    {comment.createdBy.username}:
                  </strong>
                  {comment.message}
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
