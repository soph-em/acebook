import sendEmail from "../../../api/middleware/sendingEmail";

// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);
  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    let data = await response.json();
    return data.token;
  } else if (response.status === 401) {
    let errorData = await response.json()
    if (errorData.message === 'Password incorrect') {
      throw new Error('Password is incorrect.')
    } else if (errorData.message === 'User not found'){
      throw new Error('User not found')
    }
  }else {
    throw new Error(
      `Received status ${response.status} when logging in. Expected 201`
    );
  }
};

export const signup = async (username, email, password) => {
  const payload = {
    username: username,
    email: email,
    password: password,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);
  if (response.status === 201) {
    sendEmail(email, username);
    return;
  } else if (response.status === 409) {
    let errorData = await response.json();
    if (errorData.message === 'Email already exists') {
      throw new Error('Email already exists. Please use a different email.');
    } else if (errorData.message === 'Username already exists') {
      throw new Error('Username already exists. Please use a different username.');
    } else {
      throw new Error('Unknown conflict. Please try again.');
    }
  } else if (response.status === 401) {
    throw new Error('Password does not meet requirements.')
  } else {
    throw new Error(`Received status ${response.status} when signing up. Expected 201 or 409`);
  }
  
};

