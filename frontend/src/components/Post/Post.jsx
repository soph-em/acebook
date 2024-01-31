const Post = (props) => {
  // Format the timestamp
  const formattedDate = new Date(props.post.createdAt).toLocaleString('en-GB');

  return (
    <article key={props.post._id}>
      <p>{props.post.message}</p>
      <p>Posted on: {formattedDate}</p>
      <button>Likes</button>
    </article>
  );
};

export default Post;
