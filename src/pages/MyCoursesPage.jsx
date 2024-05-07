import CurrentCourses from "../components/CurrentCourses";
import LastCourses from "../components/LastCourses";
const MyCoursesPage = () => {
  return (
    <>
      <h1>My Courses Page</h1>

      <h2>My Current Courses</h2>
      <CurrentCourses />

      <h2>My last Courses</h2>
      <LastCourses />
    </>
  );
};

export default MyCoursesPage;
