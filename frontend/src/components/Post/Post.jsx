import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";
import React, { useState } from 'react'



const Post = (props) => {
  const [likes, setLikes] = useState(props.post.likes); 
  // Format the timestamp
  const formattedDate = new Date(props.post.createdAt).toLocaleString('en-GB');
  console.log(props.post._id)
  return (
    <>
    <article key={props.post._id}>
      <p>{props.post.message}</p>
      <p>Posted on: {formattedDate}</p>
    </article>
    <LikeButton postId={props.post._id} postLikes={likes} setLikes={setLikes}/>
    <LikeCounter likes={likes}/>
    </>
  );
};

export default Post;
