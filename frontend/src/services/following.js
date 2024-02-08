// Define the base URL for the backend API using environment variables for configurability.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetches the list of users that a specific user is following. Requires the user's ID.
export const getFollowing = async (userId) => {
  const token = localStorage.getItem("token");
  // Configure the request options, including the HTTP method and headers for authorization and content type.
  const requestOptions = {
    method: "GET", // Use GET method to retrieve data.
    headers: {
      Authorization: `Bearer ${token}`, // Use bearer token for authorization.
      "Content-Type": "application/json", // Specify the content type as JSON.
    },
  };

  // Construct the URL to access the following list of a specific user.
  const url = `${BACKEND_URL}/users/${userId}/following`;

  // Execute the fetch request with the URL and requestOptions.
  const response = await fetch(url, requestOptions);

  // Check if the response is successful (status code 200), otherwise throw an error.
  if (response.status !== 200) {
    throw new Error("Unable to fetch following");
  }

  // Parse the response body as JSON and return the data.
  const data = await response.json();
  return data;
};
