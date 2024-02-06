<<<<<<<<< Temporary merge branch 1
import DeleteButton from "./DeleteButton";
=========
import Comments from "../Comments/Comment";
import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";
import { useState } from "react";
import { getUser } from "../../services/users";
>>>>>>>>> Temporary merge branch 2

const Post = (props) => {
  const [likes, setLikes] = useState(props.post.likes);
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState(null);

  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");
<<<<<<<<< Temporary merge branch 1

  // Extract username from createdBy object
  const username = props.post.createdBy.username;

  // const handlePostDeleted = () => {
  //   props.onDelete(props.post._id);
  // };

  return (
    <article key={props.post._id}>
      <p>{props.post.message}</p>
      <p>Posted by: {username}</p>
      {props.post.image && (
        <img
          src={props.post.image}
          alt={`Posted by ${username}`}
          style={{ maxWidth: "100%", maxHeight: "400px" }} // Adjust the styling as needed
        />
      )}
      <p>Posted by: {username}</p> {/* Updated this line */}
      <p>Posted on: {formattedDate}</p>
      <DeleteButton postId={props.post._id} />
=========
  const user = props.post.createdBy.username;
  const token = props.token; // Token passed as a prop
  const allowComments = props.allowComments;
  getUser().then((data) => {
    setUsername(data.username);
    setPfp(data.image);
  });
  const allowComments = props.allowComments;
  const [isEditing, setIsEditing] = useState(false);

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

              alt={`Posted by ${user}`}
              className="max-w-full max-h-96 object-cover" // Ensures the image covers the area without losing its aspect ratio

            />
          </div>
        )}
        <div className="text-sm flex justify-center items-center">
          Posted by: <span className="text-blue-500">{user}</span>
          <img className="h-5 ml-2" src={pfp} alt="Profile" />
        </div>
        <div className="text-xs text-gray-400">Posted on: {formattedDate}</div>
      </div>
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
>>>>>>>>> Temporary merge branch 2
    </article>
  );
};
export default Post;
