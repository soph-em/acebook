import Comments from "../Comments/Comment";

const Post = (props) => {
  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");
  const username = props.post.createdBy.username;
  const token = props.token; // Token passed as a prop
  const allowComments = props.allowComments;

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
              alt={`Posted by ${username}`}
              className="max-w-full max-h-96 object-cover" // Ensures the image covers the area without losing its aspect ratio
            />
          </div>
        )}
        <div className="text-sm">
          Posted by: <span className="text-blue-500">{username}</span>
        </div>
        <div className="text-xs text-gray-400">Posted on: {formattedDate}</div>
      </div>
      <Comments
        postId={props.post._id}
        token={token}
        username={username}
        allowComments={allowComments}
      />
    </article>
  );
};
export default Post;
