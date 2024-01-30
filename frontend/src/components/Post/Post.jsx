import React from 'react';
const Post = (props) => {
  
  return(
      <article key={props.post._id}>{props.post.message}</article>

  );
};
export default Post;
