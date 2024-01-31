const Post = (props) => {
  // Format the timestamp
  const formattedDate = new Date(props.post.createdAt).toLocaleString('en-GB');

  // // Check if props.post.createdBy is defined before accessing its properties
  const username = props.post.createdBy?.username || 'Unknown';

  return (
    <article key={props.post._id}>
      <p>{props.post.message}</p>
      <p>Posted by: {props.post.createdBy}</p>
      <p>Posted on: {formattedDate}</p>
    </article>
  );
};

export default Post;
