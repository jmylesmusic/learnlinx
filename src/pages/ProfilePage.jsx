import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { AuthContext } from "../context/auth.context.jsx";
const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const { userId } = useParams(); // Extract userId from the route parameters
  console.log(userId);
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isLoggedIn) return;
      const storedToken = localStorage.getItem("authToken");
      try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
          // Use userId from useParams
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`, // Using the auth token from context
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCurrentUser(data);
      } catch (e) {
        setError(`Failed to fetch user details: ${e.message}`);
        console.error(e);
      }
    };

    fetchUserDetails();
  }, [isLoggedIn]); // Include userId in the dependency array

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h1>Hello, {currentUser ? currentUser.firstName : "Loading..."}</h1>
    </div>
  );
};

export default ProfilePage;
