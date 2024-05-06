import CurrentCourses from "../components/CurrentCourses";
import { useState, useEffect } from "react";
import UpcomingCourses from "../components/UpcomingCourses";
const API_URL = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  return (
    <>
      <h1>Dashboard Page</h1>
      <h3>Current courses</h3>
      <CurrentCourses />
      <br />
      <br />
      <h3>Upcoming courses:</h3>
      <UpcomingCourses/>
    </>
  );
};

export default Dashboard;
