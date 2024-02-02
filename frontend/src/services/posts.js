// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(`${BACKEND_URL}/`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const createPost = async (message, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  };

  const response = await fetch(`${BACKEND_URL}`, requestOptions);

  if (!response.ok) {
    throw new Error("Unable to create post");
  }

  const data = await response.json();
  return data;
};
