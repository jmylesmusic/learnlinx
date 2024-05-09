import { Button } from "@mantine/core";
import CurrentCourses from "../components/CurrentCourses";
import LastCourses from "../components/LastCourses";
import { useNavigate } from "react-router-dom";
const MyCoursesPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-new-course");
  };
  return (
    <>
      <h2>My Current Courses</h2>
      <CurrentCourses />

      <h2>All my Courses</h2>
      <LastCourses />
      
      <Button onClick={handleClick}>Add a new course</Button>
    </>
  );
};

export default MyCoursesPage;
