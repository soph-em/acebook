import { useState, useEffect } from "react";
import { fetchComments, postComment } from "../../services/comments";
import { getUserIdFromToken } from "../../services/decodeToken";
import { Link } from "react-router-dom";

const Comments = ({ postId, token, allowComments }) => {
  // Initialize state variables using the useState hook
  const [comments, setComments] = useState([]); // Stores the fetched comments
  const [newComment, setNewComment] = useState(""); // Stores the value of the new comment input field
  const [newCommentAdded, setNewCommentAdded] = useState(null); // Triggers useEffect when a new comment is added

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
    <div>
      {/* Render comments */}
      {comments.map((comment) => (
        <div key={comment._id} style={{ fontSize: "smaller" }}>
          <strong className="text-blue-500">
            <Link to={`/profile/${comment.createdBy._id}`}>
              {comment.createdBy.username}:
            </Link>
          </strong>
          {comment.message}
        </div>
      ))}
      <br />

      {/* Render comment form if comments are allowed */}
      {allowComments && (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <div style={{ marginTop: "10px" }}></div> {/* Add a small gap */}
          <button
            type="submit"
            className="bg-blue-400 text-white py-1 px-4 rounded-md hover:bg-blue-700"
          >
            Add Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default Comments;
