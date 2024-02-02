const Logout = () => {
  const logoutHandle = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; //Returns HREF of Current Page.
  };
  return <button className="logout-btn" onClick={logoutHandle}>Logout</button>;
};

export default Logout;
