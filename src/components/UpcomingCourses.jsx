import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@mantine/carousel/styles.css";
const API_URL = import.meta.env.VITE_API_URL;

import {
  Card,
  Image,
  Text,
  Group,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { IconH3 } from "@tabler/icons-react";

const UpcomingCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getUpcomingCourses = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_URL}/api/courses//upcoming-courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const courses = await response.json();
      console.log("*****", courses);
      if (response.ok) setCourses(courses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpcomingCourses();
  }, []);

  const onClickCard = (courseId) => {
    navigate(`../courses/${courseId}`);
  };

  const theme = useMantineTheme();

  return (
    <div className="UpcomingCoursesListPage">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <Card
            key={course._id}
            withBorder
            radius="md"
            className="card"
            onClick={() => onClickCard(course._id)}
          >
            <Card.Section>
              <Image
                src="https://i.imgur.com/Cij5vdL.png"
                height={180}
                width={150}
              />
            </Card.Section>

            <Text className="title" fw={500}>
              {course.courseName}
            </Text>

            <Group justify="space-between" className="footer">
              <Center>
                <Text fz="sm" inline>
                  {course.studentList.length}
                  {course.studentList.length === 0 ||
                  course.studentList.length === 1
                    ? " student "
                    : " students "}
                  enrolled in this class
                </Text>
              </Center>
            </Group>
          </Card>
        ))
      ) : (
        <h3>There is no course to show!</h3>
      )}
    </div>
  );
};

export default UpcomingCourses;
