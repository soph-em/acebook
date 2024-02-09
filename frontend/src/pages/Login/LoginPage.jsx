import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authentication";
import Navbar from "../Navbar/Navbar";

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
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <Navbar />
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h2 className="mb-8 text-3xl text-center">Login to Acebook</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="block border border-grey-light w-full p-3 rounded mb-4"
              />
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="block border border-grey-light w-full p-3 rounded mb-4"
              />
              <div className="max-w-48 text-center pb-2 pl-5">
                {emailError && (
                  <p className="max-w-44 text-center">{emailError}</p>
                )}
                {passwordError && (
                  <p className="max-w-44 text-center">{passwordError}</p>
                )}
              </div>
              <input
                role="submit-button"
                id="submit"
                type="submit"
                value="Submit"
                className="w-full text-center py-3 rounded bg-slate-700 text-white hover:bg-green-dark focus:outline-none my-1"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
