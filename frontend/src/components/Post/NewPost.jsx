import { useState } from "react";
import UploadWidget from "./UploadWidget";

const NewPost = ({ onNewPost }) => {
  // State to hold the current value of the textarea
  const [postMessage, setPostMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (imageUrl) => {
    console.log("Cloudinary Result:", imageUrl);
    // Check if result.info.secure_url contains the image URL
    setImage(imageUrl);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    // Prevents the page from refreshing on form submit allowing us
    // to handle the submission process manually within the function.
    event.preventDefault();

    // Check if postMessage or image is not empty
    if (postMessage || image) {
      // Call the onNewPost function passed from the parent component with the message or image
      onNewPost(postMessage, image);

      // Reset the textarea to empty string after submission
      setPostMessage("");
      setImage(null);
    }
  };

  return (
    <div className="block border border-grey-light w-full p-3 rounded mb-4">
      <form onSubmit={handleSubmit} data-testid="new-post-form">
        {/* Display the selected image, if available */}
        {image && (
          <img
            src={image}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        )}
        <textarea
          value={postMessage}
          onChange={(message) => setPostMessage(message.target.value)}
          placeholder="Enter text here..."
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>

        <br />
        <div className="flex flex-row justify-center space-x-2">
          <UploadWidget onImageUpload={handleImageUpload} />
          <button
            className="bg-blue-400 text-white py-1 px-4 rounded-md hover:bg-blue-700"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
