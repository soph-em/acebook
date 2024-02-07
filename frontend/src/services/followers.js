const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getFollowers = async (userId) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const url = `${BACKEND_URL}/users/${userId}/followers`;

  const response = await fetch(url, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch followers");
  }

  const data = await response.json();
  return data;
};

export const followUser = async (userIdToFollow) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const url = `${BACKEND_URL}/users/follow/${userIdToFollow}/`;
  const response = await fetch(url, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to follow user");
  }
};

export const unfollowUser = async (userIdToUnfollow) => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const url = `${BACKEND_URL}/users/unfollow/${userIdToUnfollow}/`;
  const response = await fetch(url, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to unfollow user");
  }
};
