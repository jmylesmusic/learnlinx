import { Button, Group, TextInput, Textarea, Box, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useNavigate } from "react-router-dom";

const CreateNewCourse = () => {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [coursePictureUrl, setCoursePictureUrl] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    initialValues: {
      courseName: "",
      coursePictureUrl: "",
      startDate: new Date(),
      endDate: new Date(),
      coursePictureUrl: "",
      studentList: [],
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    const storedToken = localStorage.getItem("authToken");
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/courses`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        navigate(`../courses`);
      } else {
        const data = await response.json();
        setErrorMessage(
          data.message || "Failed to create course due to unknown error"
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the course.");
      console.error("Error by creating the course:", error);
    }
  };

  return (
    <>
      <h1>Create New Course Page</h1>
      <Box maw={340} mx="auto">
        {errorMessage && (
          <Text color="red" align="center" size="sm" mb="lg">
            {errorMessage}
          </Text>
        )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Course name"
            placeholder="Course name"
            key={form.key("courseName")}
            {...form.getInputProps("courseName")}
          />
          <DateInput
            label="Start date"
            placeholder="Start date"
            key={form.key("startDate")}
            {...form.getInputProps("startDate")}
          />
          <DateInput
            label="End date"
            placeholder="End date"
            key={form.key("endDate")}
            {...form.getInputProps("endDate")}
          />

          <Textarea
            label="Description"
            placeholder="Course description"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Save the Course</Button>
          </Group>
        </form>
      </Box>
    </>
  );
};

export default CreateNewCourse;
