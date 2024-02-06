const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUser = async (userId) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Determine the URL based on whether a userId is provided
  const url = userId
    ? `${BACKEND_URL}/users/${userId}` // if so, go to that user id's page
    : `${BACKEND_URL}/users/profile`; // if not, refer to logged in users page

  const response = await fetch(url, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch user");
  }

  const data = await response.json();
  return data;
};
