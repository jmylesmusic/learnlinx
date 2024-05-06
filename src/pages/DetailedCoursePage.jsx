import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Image, Text, useMantineTheme } from "@mantine/core";
const API_URL = import.meta.env.VITE_API_URL;

const DetailedCoursePage = () => {
  const [course, setCourse] = useState([]);
  const { courseId } = useParams();

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

  return (
    <div>
      <h1>Course Detail Page</h1>
      <p>Course ID: {courseId}</p>
      <p>course Name: {course.courseName}</p>
      <p>start Date: {formatDate(course.startDate)}</p>
      <p>end Date: {formatDate(course.endDate)}</p>
      <p>description: {course.description}</p>
      <a>zoomLink: {course.zoomLink}</a>
      
      <p>
        Teacher: { course.teacher && course.teacher.firstName} {course.teacher && course.teacher.lastName}
      </p>
      <h4>Students list:</h4>
      {course.studentList &&
        course.studentList.map((student, index) => (
          <Text key={index} size="sm">
            {student.firstName} {student.lastName}
          </Text>
        ))}
    </div>
  );
};

export default DetailedCoursePage;
