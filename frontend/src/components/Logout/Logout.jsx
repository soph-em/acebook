const Logout = () => {
  const logoutHandle = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };
  return <button onClick={logoutHandle}>Logout</button>;
};

export default Logout;
