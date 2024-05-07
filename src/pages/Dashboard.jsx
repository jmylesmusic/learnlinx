import CurrentCourses from "../components/CurrentCourses";
import { useState, useEffect } from "react";
import UpcomingCourses from "../components/UpcomingCourses";
// import DailyIframe from "@daily-co/daily-js";
// import BrowserUnsupported from "../components/BrowserUnsupported/BrowserUnsupported";
// import VideoCall from "../components/VideoCall/VideoCall";
import { DailyProvider, useCallObject } from "@daily-co/daily-react";
const API_URL = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  return (
    <>
      <h1>Dashboard Page</h1>
      <h3>Current courses</h3>
      <CurrentCourses />
      <br />
      {/* DailyIframe.supportedBrowser().supported ? <VideoCall /> :
      <BrowserUnsupported /> */}
      <br />
      <h3>Upcoming courses:</h3>
      <UpcomingCourses />
    </>
  );
};

export default Dashboard;
