const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DeleteButton = ({ postId }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`${BACKEND_URL}/${postId}`, requestOptions);

      if (response.status !== 200) {
        throw new Error("Unable to delete post");
      }

      const data = await response.json();
      console.log(data); // Or handle the successful deletion appropriately
      // Potentially refresh the data or redirect the user
    } catch (error) {
      console.error(error.message);
      // Handle error scenarios, such as showing an alert to the user
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
