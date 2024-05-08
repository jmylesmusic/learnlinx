import { Autocomplete, Avatar, Button, Group, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { StudentsList } from "../pages";
const API_URL = import.meta.env.VITE_API_URL;

const AllUsers = ({ course }) => {
  const [userOptions, setUserOptions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const storedToken = localStorage.getItem("authToken");

  const getAllUsers = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_URL}/api/users/all-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const users = await response.json();

      if (response.ok)
        setUserOptions(() =>
          users.map((user) => ({
            label: user.firstName + " " + user.lastName,
            value: user._id,
          }))
        );

      setAllUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const onDropDownChange = (selectedValue) => {
    setSelectedUser(selectedValue);
    console.log(selectedValue);
  };

  const handleAddToStudentList = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/courses/${course._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentsList: selectedUser }),
        }
      );

      if (response.ok) {
        console.log("OK")
        console.log(response);
      } else {
        console.error("Failed to add user to student list");
      }
    } catch (error) {
      console.error("Error while adding user to student list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Autocomplete
        data={userOptions}
        renderOption={renderAutocompleteOption}
        maxDropdownHeight={300}
        label="Add a new Student"
        placeholder="choose a Student"
        onOptionSubmit={(value) => onDropDownChange(value)}
      />
      <Button onClick={handleAddToStudentList} disabled={isLoading}>
        {isLoading ? "Adding..." : "Add to the list"}
      </Button>
    </>
  );
};

const renderAutocompleteOption = ({ option }) => {
  const [userItem, setUserItem] = useState({});

  const getAllUsers = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_URL}/api/users/all-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const users = await response.json();

      if (response.ok)
        setUserItem(() => {
          const user = users.filter((user) => user._id === option.value)[0];
          return { email: user.email, image: user.profilePictureUrl };
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Group gap="sm">
      <Avatar src={userItem.image} size={36} radius="xl" />
      <div>
        <Text size="sm">{option.label}</Text>
        <Text size="xs" opacity={0.5}>
          {userItem.email}
        </Text>
      </div>
    </Group>
  );
};
export default AllUsers;