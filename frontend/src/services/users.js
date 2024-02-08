const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DEFAULT_PFP = "https://res.cloudinary.com/dzkvzncgr/image/upload/v1707228333/ph2p8wvxud1qbsqqfxqk.png"


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

    if (!data.image) {
    // If user has no profile picture, assign the default picture URL
    data.image = DEFAULT_PFP;
  }

  return data;
};

export const putUser = async (image) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  };
  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to put user");
  }

  if (response.status == 200) {
    console.log("200");
  }

  const data = await response.json();
  return data;
};
