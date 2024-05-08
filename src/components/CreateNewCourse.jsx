import { Button, Group, TextInput, Textarea, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";

const CreateNewCourse = () => {
const [course, setCourse] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [coursePictureUrl, setCoursePictureUrl] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState();


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

  return (
    <>
      <h1>Create New Course Page</h1>
      <Box maw={340} mx="auto">
        <form onSubmit={form.onSubmit(async () => {
          const storedToken = localStorage.getItem("authToken");

          console.log(form.values);

          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/courses`,
              {
                method: "POST",

                headers: {
                  Authorization: `Bearer ${storedToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(form.values), 
              }
            );

            if (response.ok) {
              
                console.log(" OK "); 
            }
          } catch (error) {
            console.log(" Error by updating the course ", error);
          }
        })}>
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