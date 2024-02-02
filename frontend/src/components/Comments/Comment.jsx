const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useEffect } from "react";

const Comments = ({ postId, token, allowComments, username }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // fetch data from mongodb
    fetch(`${BACKEND_URL}/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        // Check if the 'comments' array exists in the response
        if (data && data.comments) {
          setComments(data.comments);
        }
      })
      .catch((error) => console.error(error));
  }, [postId]);

  // Async function to handle comment submission. Prevents default form submission
  // and checks if the comment is not empty or just whitespace.
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: newComment }),
    };

    const response = await fetch(
      `${BACKEND_URL}/${postId}/comments`,
      requestOptions
    );
    const data = await response.json();

    if (response.ok) {
      // Manually add the username to the new comment object for immediate UI update
      const newCommentWithUsername = {
        ...data.comment,
        createdBy: { username: username },
      };
      console.log(newCommentWithUsername);
      setComments([...comments, newCommentWithUsername]); // Update the comments state
      setNewComment(""); // Reset the new comment input field
    } else {
      console.error("Failed to post comment");
    }
  };
  console.log("Username prop:", username);
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} style={{ fontSize: "smaller" }}>
          <strong className="text-blue-500">
            {comment.createdBy.username || "Unknown User"}:
          </strong>{" "}
          {comment.message}
        </div>
      ))}
      <br />
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
