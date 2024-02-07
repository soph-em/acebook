import React, { useState } from "react";
import { updatePostById } from '../../services/posts'

const EditPostForm = ({postId, initialMessage, onUpdate}) =>{
    const [message, setMessage] = useState(initialMessage);

    const handleUpdatePost = async () => {
        try {
            const response = await updatePostById(postId, { message }, );
            // Extract createdAt and updatedAt from the response data
            const { createdAt, updatedAt } = response.post;
            // Pass updated post data to parent
            onUpdate({ _id: postId, message, createdAt, updatedAt });

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