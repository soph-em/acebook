const Post = (props) => {
  // Format the timestamp
  const formattedDate = new Date(props.post.createdAt).toLocaleString("en-GB");

  // Extract username from createdBy object
  const username = props.post.createdBy.username;

  return (
    <article key={props.post._id}>
      <p>{props.post.message}</p>
      <p>Posted by: {username}</p> 
      <p>Posted on: {formattedDate}</p>
    </article>
  );
};

export default Post;
