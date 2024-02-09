// Define the base URL for the backend API from environment variables for better security and flexibility.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetches followers of a given user. Requires the user's ID.
export const getFollowers = async (userId) => {
  // Retrieve the authentication token stored in localStorage.
  const token = localStorage.getItem("token");
  // Set up request options including HTTP method, headers for authorization and content type.
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Use bearer token for authentication.
      "Content-Type": "application/json",
    },
  };

  // Construct the URL to get followers for a specific user.
  const url = `${BACKEND_URL}/users/${userId}/followers`;

  // Execute the fetch request with the constructed URL and requestOptions.
  const response = await fetch(url, requestOptions);

  // Check for successful response, otherwise throw an error.
  if (response.status !== 200) {
    throw new Error("Unable to fetch followers");
  }

  // Parse and return the response data as JSON.
  const data = await response.json();
  return data;
};

// Follows a specified user. Requires the ID of the user to follow.
export const followUser = async (userIdToFollow) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT", // Use PUT method for update actions.
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Construct URL for the follow action.
  const url = `${BACKEND_URL}/users/follow/${userIdToFollow}/`;
  const response = await fetch(url, requestOptions);

  // Check for successful response, otherwise throw an error.
  if (response.status !== 200) {
    throw new Error("Unable to follow user");
  }
  // Note: No data returned for follow action, so no response parsing is needed.
};

// Unfollows a specified user. Requires the ID of the user to unfollow.
export const unfollowUser = async (userIdToUnfollow) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT", // Similar to followUser, use PUT for the unfollow action.
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Construct URL for the unfollow action.
  const url = `${BACKEND_URL}/users/unfollow/${userIdToUnfollow}/`;
  const response = await fetch(url, requestOptions);

  // Check for successful response, otherwise throw an error.
  if (response.status !== 200) {
    throw new Error("Unable to unfollow user");
  }
  // Note: Similarly, no data returned for unfollow action.
};
