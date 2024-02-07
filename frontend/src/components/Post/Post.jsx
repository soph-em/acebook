import DeleteButton from "./DeleteButton";
import EditPostForm from "./EditPostForm";
import Comments from "../Comments/Comment";
import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { getUser } from "../../services/users";

const Post = (props) => {
  const [likes, setLikes] = useState(props.post.likes);
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");
  const postUsername = props.post.createdBy.username;
  const userId = props.post.createdBy._id;
  const token = props.token; // Token passed as a prop
  const allowComments = props.allowComments;

  useEffect(() => {
    getUser().then((data) => {
      setUsername(data.username);
      setPfp(data.image);
    });
  }, []);

  const handleUpdate = (updatedPost) => {
    console.log("Post updated successfully");
    setIsEditing(false); // Switch back to view mode after updating
    props.onUpdatePost(updatedPost);
  };

  return (
    <article
      key={props.post._id}
      className="bg-slate-100 shadow-lg rounded-lg p-4 my-4 overflow-hidden"
    >
      <div className="space-y-4">
        <p className="text-gray-800 text-lg">{props.post.message}</p>
        {props.post.image && (
          <div className="w-full flex justify-center">
            <img
              src={props.post.image}
              alt={`Posted by ${postUsername}`}
              className="max-w-full max-h-96 object-cover"
            />
          </div>
        )}
        <div className="text-sm flex justify-center items-center">
          Posted by:{" "}
          <Link to={`/profile/${userId}`} className="text-blue-500">
            {postUsername}
          </Link>
          <img className="h-5 ml-2" src={pfp} alt="Profile" />
        </div>
        <div className="text-xs text-gray-400">Posted on: {formattedDate}</div>
      </div>

      {isEditing ? (
        <EditPostForm
          postId={props.post._id}
          initialMessage={props.post.message}
          onUpdate={handleUpdate}
        />
      ) : (
        <>
          <Comments
            postId={props.post._id}
            token={token}
            username={username}
            allowComments={allowComments}
          />
          <LikeButton
            postId={props.post._id}
            postLikes={likes}
            setLikes={setLikes}
          />
          <LikeCounter likes={likes} />
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <DeleteButton
              postId={props.post._id}
              onDeletePost={props.onDeletePost}
            />
          </div>
        </>
      )}
    </article>
  );
};

export default Post;
