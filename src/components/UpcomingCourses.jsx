import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Group,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { IconH3 } from "@tabler/icons-react";

const UpcomingCourses = () => {
  const [courses, setCourses] = useState([]);
  const getUpcomingCourses = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${API_URL}/api/courses//upcomming-courses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
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

  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };
  const theme = useMantineTheme();

  return (
    <div className="UpcomingCoursesListPage">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <Card key={course._id} withBorder radius="md" className="card">
            <Card.Section>
              <a {...linkProps}>
                <Image
                  src="https://i.imgur.com/Cij5vdL.png"
                  height={180}
                  width={150}
                />
              </a>
            </Card.Section>

            <Text className="title" fw={500} component="a" {...linkProps}>
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
        <h3>There is no current course to show!</h3>
      )}
    </div>
  );
};

export default UpcomingCourses;
