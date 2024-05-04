import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context.jsx";
import CustomDropzone from "../components/CustomDropzone.jsx";
const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isLoggedIn) return;
      const storedToken = localStorage.getItem("authToken");
      try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
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
  }, [isLoggedIn]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {currentUser && (
        <div className="profile-page">
          <h1>
            {currentUser.isTeacher ? "Teacher Profile" : "Student Profile"}
          </h1>
          <div>
            <h2>First Name: {currentUser.firstName}</h2>
            <h2>Last Name: {currentUser.lastName}</h2>
            <h2>Email Address: {currentUser.email}</h2>
            <h2>Phone Number: {currentUser.phoneNumber}</h2>{" "}
            <img
              src={currentUser.profilePictureUrl}
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              alt="Profile Picture"
            />
          </div>
          <CustomDropzone />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
