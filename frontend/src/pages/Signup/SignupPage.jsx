import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/authentication';
import { login } from '../../services/authentication';

export const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signup(username, email, password);
      console.log('logging in...')
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      alert('Signup successful.\nYou are now being logged in.')
      navigate("/");
      console.log('redirecting...');
      // navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.message.includes('Email already exists')) {
        setEmailError('Email already exists. Please use a different email.');
      } else if (err.message.includes('Username already exists')) {
        setUsernameError('Username already exists. Please use a different username.');
      } else if (err.message.includes('Password does not meet requirements')){
        setPasswordError('Password must be 8 characters or longer.')
      }else {
        setErrorMessage('An error occurred during signup. Please try again.');
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError('');
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        {usernameError && <p>{usernameError}</p>}
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p>{emailError}</p>}
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p>{passwordError}</p>}
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
};