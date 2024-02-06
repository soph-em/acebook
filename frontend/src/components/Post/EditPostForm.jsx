import React, { useState } from "react";
import { updatePostById } from '../../services/posts'

const EditPostForm = ({postId, initialMessage, onUpdate}) =>{
    const [message, setMessage] = useState(initialMessage);

    const handleUpdatePost = async () => {
        try {
            await updatePostById(postId, { message });
            onUpdate();

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
            <button onClick={handleUpdatePost}>Update Post</button>
        </div>
        );
    };

export default EditPostForm;