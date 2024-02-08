import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import { login } from "../../services/authentication";
import Navbar from "../Navbar/Navbar";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signup(username, email, password);
      console.log("logging in...");
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      alert("Signup successful.\nYou are now being logged in.");
      navigate("/");
      console.log("redirecting...");
      // navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.message.includes("Email already exists")) {
        setEmailError("Email already exists. Please use a different email.");
      } else if (err.message.includes("Username already exists")) {
        setUsernameError(
          "Username already exists. Please use a different username."
        );
      } else if (err.message.includes("Password does not meet requirements")) {
        setPasswordError("Password must be 8 characters or longer.");
      } else {
        setErrorMessage("An error occurred during signup. Please try again.");
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <Navbar />
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h2 className="mb-8 text-3xl text-center">Sign up for Acebook</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                placeholder="Username"
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="block border border-grey-light w-full p-3 rounded mb-4"
              />
              {usernameError && <p>{usernameError}</p>}
              <label htmlFor="email">Email:</label>
              <input
                placeholder="Email"
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="block border border-grey-light w-full p-3 rounded mb-4"
              />
              {emailError && <p>{emailError}</p>}
              <label htmlFor="password">Password:</label>
              <input
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="block border border-grey-light w-full p-3 rounded mb-4"
              />
              {passwordError && <p>{passwordError}</p>}
              <input
                role="submit-button"
                id="submit"
                type="submit"
                value="Submit"
                className="w-full text-center py-3 rounded bg-slate-700 text-white hover:bg-green-dark focus:outline-none my-1"
              />
              {errorMessage && <p>{errorMessage}</p>}
              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
