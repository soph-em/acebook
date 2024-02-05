const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetches comments for a given postId
export const fetchComments = (postId) => {
  // Sends a GET request to the backend URL with the postId appended to the path
  return (
    fetch(`${BACKEND_URL}/${postId}/comments`)
      // Converts the response to JSON
      .then((res) => res.json())
      // Extracts the "comments" array from the data or returns an empty array if it doesn't exist
      .then((data) => data.comments || [])
      // Catches any errors that occur during the request and returns an empty array
      .catch((err) => {
        console.error(err);
        return [];
      })
  );
};

// Posts a comment for a given postId
export const postComment = async (postId, newComment, token) => {
  // Creates an object with the request options for the POST request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message: newComment }),
  };

  // Sends a POST request to the backend URL with the postId appended to the path and the request options
  const response = await fetch(
    `${BACKEND_URL}/${postId}/comments`,
    requestOptions
  );

  // Converts the response to JSON
  const data = await response.json();

  // If the response is successful, returns the "comment" from the data
  // Otherwise, logs an error message and returns null
  if (response.ok) {
    return data.comment;
  } else {
    console.error("Failed to post comment");
    return null;
  }
};
