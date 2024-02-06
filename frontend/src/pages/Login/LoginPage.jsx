import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.message.includes("Password is incorrect.")) {
        setPasswordError("The password you have entered is incorrect.");
      } else if (err.message.includes("User not found")) {
        setEmailError("The email address you entered does not exist.");
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  return (
    <>
      <h2>Login</h2>
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
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {emailError && <p>{emailError}</p>}
        {passwordError && <p>{passwordError}</p>}
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
