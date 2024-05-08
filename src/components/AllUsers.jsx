import { Autocomplete, Avatar, Button, Group, Text } from "@mantine/core";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const AllUsers = () => {
  const [userOptions, setUserOptions] = useState([]);

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
          users.map((user) => user.firstName + " " + user.lastName)
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Autocomplete
        data={userOptions}
        renderOption={renderAutocompleteOption}
        maxDropdownHeight={300}
        label="Add a new Student"
        placeholder="choose a Student"
        onChange={(value) => console.log(value)}
      />
      <Button>Add to the list</Button>
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
          const user = users.filter(
            (user) => user.firstName + " " + user.lastName === option.value
          )[0];
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
        <Text size="sm">{option.value}</Text>
        <Text size="xs" opacity={0.5}>
          {userItem.email}
        </Text>
      </div>
    </Group>
  );
};
export default AllUsers;
