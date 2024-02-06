import Comments from "../Comments/Comment";
import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";
import { useState } from "react";
import { getUser } from "../../services/users";

import DeleteButton from "./DeleteButton";

const Post = (props) => {
  const [likes, setLikes] = useState(props.post.likes);
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState(null);

  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");
  const user = props.post.createdBy.username;
  const token = props.token; // Token passed as a prop
  const allowComments = props.allowComments;
  getUser().then((data) => {
    setUsername(data.username);
    setPfp(data.image);
  });
  console.log("Image URL:", props.post.image);

  return (
    <article
      key={props.post._id}
      className="bg-slate-100 shadow-lg rounded-lg p-4 my-4 overflow-hidden"
    >
      <div className="space-y-4">
        {" "}
        {/* Adds spacing between content elements */}
        <p className="text-gray-800 text-lg">{props.post.message}</p>
        {props.post.image && (
          <div className="w-full flex justify-center">
            {" "}
            {/* Centers the image */}
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
    </article>
  );
};
export default Post;
