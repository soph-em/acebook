import { useState } from 'react';
import UploadWidget from './UploadWidget'

const NewPost = ({ onNewPost }) => {
  // State to hold the current value of the textarea
  const [postMessage, setPostMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (imageUrl) => {
    console.log('Cloudinary Result:', imageUrl);
  // Check if result.info.secure_url contains the image URL
    setImage(imageUrl);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    // Prevents the page from refreshing on form submit allowing us
    // to handle the submission process manually within the function.
    event.preventDefault();
    console.log(postMessage)
    console.log(image)
    // Check if postMessage is not   empty
    if (postMessage || image) {
      // Call the onNewPost function passed from the parent component with the message
      onNewPost(postMessage, image);

      // Reset the textarea to empty string after submission
      setPostMessage('');
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="new-post-form">
      <textarea
        value={postMessage} // linked to postMessage state
        onChange={(message) => setPostMessage(message.target.value)} // Update state on user input
        placeholder="Enter text here..."
      ></textarea>

      <br />
      <UploadWidget onImageUpload={handleImageUpload} />
      <button type="submit">Post</button>
    </form>
  );
};

export default NewPost;
