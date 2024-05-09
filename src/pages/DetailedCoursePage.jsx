import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Text, Modal, Button, Group, Table, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditCourse from "../components/EditCourse";
const API_URL = import.meta.env.VITE_API_URL;
import { IconCheck } from "@tabler/icons-react";
import { courseContext } from "../context/course.context.jsx";
import { AuthContext } from "../context/auth.context";

import AddEvent from "../components/AddEvent";
import { notifications } from "@mantine/notifications";
import AllUsers from "../components/AllUsers";

const DetailedCoursePage = () => {
  const { course, setCourse } = useContext(courseContext);

  const { isTeacher } = useContext(AuthContext);

  const checkIcon = <IconCheck style={{ width: "20rem", height: "20rem" }} />;
  const navigate = useNavigate();
  //const [course, setCourse] = useState([]);
  const { courseId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const getCourse = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_URL}/api/courses/${courseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const course = await response.json();
      if (response.ok) {
        setCourse(course);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getCourse();
  }, []);

  const rows =
    course && course.studentList
      ? course.studentList.map((item) => (
          <Table.Tr key={item._id}>
            <Table.Td>
              <Group gap="sm">
                <Avatar size={40} src={item.profilePictureUrl} radius={40} />
                <div>
                  <Text fz="sm" fw={500}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text c="dimmed" fz="xs">
                    Name
                  </Text>
                </div>
              </Group>
            </Table.Td>
            <Table.Td>
              <Text fz="sm">{item.email}</Text>
              <Text fz="xs" c="dimmed">
                Email
              </Text>
            </Table.Td>
            <Table.Td>
              <Text fz="sm">{item.phoneNumber}</Text>
              <Text fz="xs" c="dimmed">
                Phone number
              </Text>
            </Table.Td>
          </Table.Tr>
        ))
      : [];

  const handleNavigateToVideoCall = () => {
    navigate(`/video-call/${courseId}`); // Assuming you have a route setup for this path
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Course" centered>
        <EditCourse
          course={course}
          close={close}
          save={() => {
            close();
            getCourse();
            notifications.show({
              icon: checkIcon,
              autoClose: 4000,
              message: "You succesfuly changed the course information",
            });
          }}
        />
      </Modal>
      <div>
        <h1>Course Detail Page</h1>
        {course ? (
          <>
            {course.coursePictureUrl && (
              <img
                src={course.coursePictureUrl}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                alt="Profile Picture"
              />
            )}

            <p>Course Name: {course.courseName}</p>
            <p>Start Date: {formatDate(course.startDate)}</p>
            <p>End Date: {formatDate(course.endDate)}</p>
            <p>Description: {course.description}</p>
            <a>Room Link: {course.zoomLink}</a>

            <p>
              Teacher: {course.teacher && course.teacher.firstName}{" "}
              {course.teacher && course.teacher.lastName}
            </p>

            {isTeacher && (
              <>
                <Button onClick={open}>Edit course</Button>
                <Button onClick={handleNavigateToVideoCall}>
                  Start Video Call
                </Button>
              </>
            )}
            <AllUsers course={course} />
            <h4>Students list:</h4>
            {rows && (
              <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="md">
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            )}

            <AddEvent courseId={courseId} />
          </>
        ) : (
          <p>Loading course details...</p> // Provide a loading state or message
        )}
      </div>
    </>
  );
};

export default DetailedCoursePage;
