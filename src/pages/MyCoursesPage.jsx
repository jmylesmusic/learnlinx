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
      <h1>My Courses Page</h1>

      <h2>My Current Courses</h2>
      <CurrentCourses />

      <h2>My last Courses</h2>
      <LastCourses />
      <Button onClick={handleClick}>Add a new course</Button>
    </>
  );
};

export default MyCoursesPage;
