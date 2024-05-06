import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context.jsx";
import { Button, Modal } from "@mantine/core";
import CustomDropzone from "../components/CustomDropzone.jsx";
import { IconEdit, IconX, IconCheck } from "@tabler/icons-react"; // Import the necessary icons
const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [editingField, setEditingField] = useState(null); // State to track which field is being edited
  const [tempValue, setTempValue] = useState(""); // State to temporarily store edited value
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
  }, [isLoggedIn, userId]);

  const handleEditField = (fieldName) => {
    setEditingField(fieldName);
    setTempValue(currentUser[fieldName]);
  };

  const handleInputChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleRevertChanges = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleSaveChanges = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentUser,
          [editingField]: tempValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCurrentUser({
        ...currentUser,
        [editingField]: tempValue,
      });
      setEditingField(null);
      setTempValue("");
    } catch (error) {
      console.error("Error updating user:", error);
      setError(`Failed to update user: ${error.message}`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      // First confirmation
      setConfirmDelete(true);
    } else {
      // Second confirmation, proceed with deletion
      const storedToken = localStorage.getItem("authToken");
      try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        logOutUser();
      } catch (error) {
        console.error("Error deleting user:", error);
        setError(`Failed to delete user: ${error.message}`);
      } finally {
        setDeleteModalOpened(false);
        setConfirmDelete(false); // Reset confirmation state
      }
    }
  };

  return (
    <>
      {currentUser && (
        <div className="profile-page">
          <h1>
            {currentUser.isTeacher ? "Teacher Profile" : "Student Profile"}
          </h1>
          <div>
            <h2>
              First Name:{" "}
              {editingField === "firstName" ? (
                <>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                  />
                  <IconX strokeWidth={1} onClick={handleRevertChanges} />{" "}
                  <IconCheck strokeWidth={1} onClick={handleSaveChanges} />
                </>
              ) : (
                <span>
                  {currentUser.firstName}
                  <IconEdit
                    strokeWidth={0.5}
                    onClick={() => handleEditField("firstName")}
                  />
                </span>
              )}
            </h2>
            <h2>
              Last Name:{" "}
              {editingField === "lastName" ? (
                <>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                  />
                  <IconX strokeWidth={1} onClick={handleRevertChanges} />{" "}
                  <IconCheck strokeWidth={1} onClick={handleSaveChanges} />
                </>
              ) : (
                <span>
                  {currentUser.lastName}
                  <IconEdit
                    strokeWidth={0.5}
                    onClick={() => handleEditField("lastName")}
                  />
                </span>
              )}
            </h2>
            <h2>
              Email Address:{" "}
              {editingField === "email" ? (
                <>
                  <input
                    type="email"
                    value={tempValue}
                    onChange={handleInputChange}
                  />
                  <IconX strokeWidth={1} onClick={handleRevertChanges} />{" "}
                  <IconCheck strokeWidth={1} onClick={handleSaveChanges} />
                </>
              ) : (
                <span>
                  {currentUser.email}
                  <IconEdit
                    strokeWidth={0.5}
                    onClick={() => handleEditField("email")}
                  />
                </span>
              )}
            </h2>
            <h2>
              Phone Number:{" "}
              {editingField === "phoneNumber" ? (
                <>
                  <input
                    type="tel"
                    value={tempValue}
                    onChange={handleInputChange}
                  />
                  <IconX strokeWidth={1} onClick={handleRevertChanges} />{" "}
                  <IconCheck strokeWidth={1} onClick={handleSaveChanges} />
                </>
              ) : (
                <span>
                  {currentUser.phoneNumber}
                  <IconEdit
                    strokeWidth={0.5}
                    onClick={() => handleEditField("phoneNumber")}
                  />
                </span>
              )}
            </h2>{" "}
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
          <Button color="red" onClick={() => setDeleteModalOpened(true)}>
            Delete Account
          </Button>
          <Modal
            opened={deleteModalOpened}
            onClose={() => {
              setDeleteModalOpened(false);
              setConfirmDelete(false);
            }}
            title="Confirm Account Deletion"
          >
            <p>Are you sure you want to delete your account?</p>
            {confirmDelete ? (
              <p>Please confirm again to delete your account permanently.</p>
            ) : null}
            <Button color="red" onClick={handleDeleteAccount}>
              {confirmDelete ? "Confirm Delete" : "Delete Account"}
            </Button>
            <Button
              color="green"
              onClick={() => {
                setDeleteModalOpened(false);
                setConfirmDelete(false);
              }}
              style={{ marginLeft: "10px" }}
            >
              Keep my account
            </Button>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
