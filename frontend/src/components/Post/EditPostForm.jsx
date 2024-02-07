import React, { useState } from "react";
import { updatePostById } from "../../services/posts";

const EditPostForm = ({ postId, initialMessage, onUpdate }) => {
  const [message, setMessage] = useState(initialMessage);

  const handleUpdatePost = async () => {
    try {
      await updatePostById(postId, { message });
      // Pass updated post data to parent
      onUpdate({ _id: postId, message });
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };
  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={handleUpdatePost}>Save</button>
    </div>
  );
};

export default EditPostForm;
