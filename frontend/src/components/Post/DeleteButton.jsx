import React from 'react';
import { deletePostById } from '../../services/posts'

const DeleteButton = ({ postId, onDeletePost }) => {
    const handleDelete = async () => {
      try {
        await deletePostById(postId);
        onDeletePost(postId);
        console.log("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error.message);
      }
    };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
