// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUser = async () => {
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(`${BACKEND_URL}/users/profile`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch user");
  }

  const data = await response.json();
  return data;
};
