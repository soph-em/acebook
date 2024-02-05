import DeleteButton from "./DeleteButton";

const Post = (props) => {
  // Format the timestamp
  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");

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
    </article>
  );
};

export default Post;
