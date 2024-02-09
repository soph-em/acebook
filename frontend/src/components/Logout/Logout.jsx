const Logout = () => {
  const logoutHandle = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    // Refresh the page to ensure all user data is cleared from memory
    window.location.href = "/";
  };

  return (
    <button
      data-testid="test-profile"
      className="logout-btn"
      onClick={logoutHandle}
    >
      Logout
    </button>
  );
};

export default Logout;
