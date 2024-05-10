import { useContext, useState, useEffect } from "react";
import { Modal, Button, Input } from "@mantine/core";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context.jsx";

const EditProfileModal = ({ modalOpened, setModalOpened, currentUser }) => {
  const [tempUser, setTempUser] = useState(currentUser);
  const { setCurrentUser, storeFirstName, storeLastName, isLoggedIn } =
    useContext(AuthContext);
  const { userId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [error, setError] = useState(null);

  const handleInputChange = (e, field) => {
    setTempUser({ ...tempUser, [field]: e.target.value });
  };

  const handleSaveChanges = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT", // Assuming the API uses PUT to update user details
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempUser), // Send the updated user object
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setCurrentUser(updatedUser);
      storeFirstName(updatedUser.firstName);
      storeLastName(updatedUser.lastName);
      setModalOpened(false);
    } catch (e) {
      setError(`Failed to save changes: ${e.message}`);
      console.error(e);
    }
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      title="Edit Profile"
    >
      <Input
        label="First Name"
        value={tempUser.firstName}
        onChange={(e) => handleInputChange(e, "firstName")}
      />
      <Input
        label="Last Name"
        value={tempUser.lastName}
        onChange={(e) => handleInputChange(e, "lastName")}
      />
      <Input
        label="Email"
        value={tempUser.email}
        onChange={(e) => handleInputChange(e, "email")}
      />
      <Input
        label="Phone Number"
        value={tempUser.phoneNumber}
        onChange={(e) => handleInputChange(e, "phoneNumber")}
      />
      <Button color="green" onClick={handleSaveChanges}>
        Save Changes
      </Button>
      <Button
        color="red"
        onClick={() => setModalOpened(false)}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </Button>
    </Modal>
  );
};

export default EditProfileModal;
