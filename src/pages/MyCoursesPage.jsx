import { Button, Title } from "@mantine/core";
import CurrentCourses from "../components/CurrentCourses";
import LastCourses from "../components/LastCourses";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const MyCoursesPage = () => {
  const navigate = useNavigate();
  const { isTeacher } = useContext(AuthContext);

  console.log(isTeacher);
  const handleClick = () => {
    navigate("/create-new-course");
  };
  return (
    <>
      <Title bg={"red"} c={"white"} order={2} my={"30px"}>
        My Current Courses
      </Title>

      <CurrentCourses />

      <Title bg={"red"} c={"white"} order={2} my={"50px"}>
        All my Courses
      </Title>

      <LastCourses />
      {isTeacher && <Button onClick={handleClick}>Add a new course</Button>}
    </>
  );
};

export default MyCoursesPage;
