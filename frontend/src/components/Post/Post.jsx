import DeleteButton from "./DeleteButton";
import EditPostForm from "./EditPostForm";
import Comments from "../Comments/Comment";
import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";
import { useState } from "react";
import { getUser } from "../../services/users";
import DropdownMenu from "./DropDownMenu";
import { CommentButton } from "../Comments/CommentButton";

const Post = (props) => {
  const [likes, setLikes] = useState(props.post.likes);
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");
  const user = props.post.createdBy?.username;
  const token = props.token; // Token passed as a prop
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
      <div className="flex justify-between items-center">
        <div className="text-sm flex items-center">
          <img className="h-9 ml-2" src={pfp} alt="Profile" />
          <div className="ml-1">
            <p className="text-blue-500 text-left">{user}</p>
            <p className="text-xs text-gray-400">Posted on: {formattedDate}</p>
          </div>
        </div>
        <DropdownMenu
          option1={
            <DeleteButton
              postId={props.post._id}
              onDeletePost={props.onDeletePost}
            />
          }
          option2={
            <button onClick={() => setIsEditing(true)}>Edit Post</button>
          }
        />
      </div>
      <div className="space-y-4 mt-3">
        <p className="text-gray-800 text-lg text-left">{props.post.message}</p>
        {props.post.image && (
          <div className="w-full flex justify-center">
            <img
              src={props.post.image}
              alt={`Posted by ${user}`}
              className="max-w-full max-h-96 object-cover" // Ensures the image covers the area without losing its aspect ratio
            />
          </div>
        )}
      </div>

      {isEditing ? (
        <EditPostForm
          postId={props.post._id}
          initialMessage={props.post.message}
          onUpdate={handleUpdate}
        />
      ) : (
        <>
          <div className="text-left">
            <LikeCounter likes={likes} />
          </div>
          <div className="flex flex-col justify-center align-middle pt-2">
            <div className="flex flex-row">
              <div className="w-1/2">
                <LikeButton
                  postId={props.post._id}
                  postLikes={likes}
                  setLikes={setLikes}
                />
              </div>
              {/* comment button shows the comments and ability to leave a comment */}
              <div className="w-1/2">
                <CommentButton toggleComments={toggleComments} />
              </div>
            </div>
            {/* toggled by button above */}
            {showComments && (
              <div className="w=full">
                <Comments
                  postId={props.post._id}
                  token={token}
                  username={username}
                  allowComments={allowComments}
                />
              </div>
            )}
          </div>
          {/* <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <DeleteButton
              postId={props.post._id}
              onDeletePost={props.onDeletePost}
            />
          </div> */}
        </>
      )}
    </article>
    // </div>
  );
};
export default Post;
