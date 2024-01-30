const Logout = () => {
  const logoutHandle = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; //Returns HREF of Current Page.
  };
  return <button onClick={logoutHandle}>Logout</button>;
};

export default Logout;
