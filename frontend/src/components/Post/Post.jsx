import Comments from "../Comments/comment";

const Post = (props) => {
  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");
  const username = props.post.createdBy.username;
  const token = props.token; // Token passed as a prop
  const allowComments = props.allowComments;

  return (
    <article
      key={props.post._id}
      className="bg-white shadow-lg rounded-lg p-4 my-4"
    >
      <p className="text-gray-800 text-lg">{props.post.message}</p>
      <p className="text-sm">
        Posted by: <span className="text-blue-500">{username}</span>
      </p>
      <p className="text-xs text-gray-400">Posted on: {formattedDate}</p>
      <Comments
        postId={props.post._id}
        token={token}
        allowComments={allowComments}
      />
    </article>
  );
};

export default Post;
