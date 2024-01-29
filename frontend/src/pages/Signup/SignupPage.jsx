import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.message.includes("Email already exists")) {
        setErrorMessage("Email already exists. Please use a different email.");
      } else {
        setErrorMessage("An error occurred during signup.");
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // reset the error message when user type again
    setErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
};
