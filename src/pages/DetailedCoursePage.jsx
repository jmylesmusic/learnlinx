import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Text, Modal, Button, Notification } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditCourse from "../components/EditCourse";
const API_URL = import.meta.env.VITE_API_URL;
import { IconCheck } from "@tabler/icons-react";
import { courseContext } from "../context/course.context.jsx";

import { notifications } from "@mantine/notifications";
import AllUsers from "../components/AllUsers";

const DetailedCoursePage = () => {
  const { course, setCourse, oldPictureURL } = useContext(courseContext);

  const checkIcon = <IconCheck style={{ width: "20rem", height: "20rem" }} />;
  const navigate = useNavigate();
  //const [course, setCourse] = useState([]);
  const { courseId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const getCourse = async () => {
    console.log("*************getCourse");
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
        console.log(course);
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

  const handleNavigateToVideoCall = () => {
    navigate(`/video-call/${courseId}`); // Assuming you have a route setup for this path
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Course" centered>
        <EditCourse
          course={course}
          close={() => {
            setCourse({ ...course, coursePictureUrl: oldPictureURL });

            close();
          }}
          save={() => {
            close();
            getCourse();
            notifications.show({
              icon: checkIcon,
              autoClose: 4000,
              message: "You succesfuly changed the course informations",
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
            <p>Course ID: {courseId}</p>
            <p>course Name: {course.courseName}</p>
            <p>start Date: {formatDate(course.startDate)}</p>
            <p>end Date: {formatDate(course.endDate)}</p>
            <p>description: {course.description}</p>
            <a>zoomLink: {course.zoomLink}</a>

            <p>
              Teacher: {course.teacher && course.teacher.firstName}{" "}
              {course.teacher && course.teacher.lastName}
            </p>
            <Button onClick={open}>Edit course</Button>

            <Button onClick={handleNavigateToVideoCall}>Join Video Call</Button>

            <AllUsers course={course} />
            <h4>Students list:</h4>
            {course.studentList &&
              course.studentList.map((student, index) => (
                <Text key={index} size="sm">
                  {student.firstName} {student.lastName}
                </Text>
              ))}
          </>
        ) : (
          <p>Loading course details...</p> // Provide a loading state or message
        )}
      </div>
    </>
  );
};

export default DetailedCoursePage;
