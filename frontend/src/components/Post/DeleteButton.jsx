import { deletePost } from "../../../../api/controllers/posts";


const DeleteButton = ({ postId }) => {
    const handleDelete = async () => {
        // try {
        console.log("PostId:", `${postId}`);
        // const response = await fetch(`/posts/${postId}`, {
        //     method: "DELETE",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        // });

    //     if (response.ok) {
            // onDelete(); 
    //     } else {
    //         console.error("Error deleting post:", response.statusText);
    //     }
    //     } catch (error) {
    //     console.error("Error deleting post:", error.message);
        }
    

    return (
        <button onClick={deletePost(postId)}>
        Delete
        </button>
    );
};

export default DeleteButton;