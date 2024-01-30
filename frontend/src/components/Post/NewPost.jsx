import { useState } from 'react';

const NewPost = ({ onNewPost }) => {
  // State to hold the current value of the textarea
  const [postMessage, setPostMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    // Prevents the page from refreshing on form submit allowing us
    // to handle the submission process manually within the function.
    event.preventDefault();

    // Check if postMessage is not empty
    if (postMessage) {
      // Call the onNewPost function passed from the parent component with the message
      onNewPost(postMessage);

      // Reset the textarea to empty string after submission
      setPostMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postMessage} // linked to postMessage state
        onChange={(message) => setPostMessage(message.target.value)} // Update state on user input
        placeholder="Enter text here..."
      ></textarea>
      <button type="submit">Post</button>
    </form>
  );
};

export default NewPost;
