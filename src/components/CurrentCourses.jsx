import { useState, useEffect } from "react";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { HoverCard, Badge, Container } from "@mantine/core";

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

const CurrentCourses = () => {
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_URL}/api/courses/current-courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const courses = await response.json();
      if (response.ok) setCourses(courses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };
  const theme = useMantineTheme();

  return (
    <Carousel
      withIndicators
      height={300}
      slideSize="33.333333%"
      slideGap="xl"
      loop
      align="start"
      slidesToScroll={3}
    >
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <Carousel.Slide key={course._id}>
            <Card withBorder radius="md" className="card">
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

              <Container className="footer" gap="xs">
                <HoverCard width={280} shadow="md">
                  <HoverCard.Target>
                    <Badge variant="light" color="gray" size="xs" radius="md">
                      <Text fz="xs" span>
                        {" "}
                        {course.studentList.length}
                        {course.studentList.length === 0 ||
                        course.studentList.length === 1
                          ? " student "
                          : " students "}
                      </Text>
                    </Badge>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    {console.log(course)}
                    {course.studentList.map((student, index) => (
                      <Text key={index} size="sm">
                        {student.firstName} {student.lastName}
                      </Text>
                    ))}
                  </HoverCard.Dropdown>
                </HoverCard>

                <Text span> enrolled in this class</Text>
              </Container>
            </Card>
          </Carousel.Slide>
        ))
      ) : (
        <h3>There is no current course to show!</h3>
      )}
    </Carousel>
  );
};

export default CurrentCourses;
