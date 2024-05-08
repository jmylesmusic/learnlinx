import CurrentCourses from "../components/CurrentCourses";
import { useState, useEffect } from "react";
import UpcomingCourses from "../components/UpcomingCourses";
import SmallCalendarComponent from "../components/SmallCalendarComponent";
import EventTable from "../components/EventTable";
import { Container, SimpleGrid } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard Page</h1>
      <Container>
        <SimpleGrid
          cols={{ xs: 1, sm: 2 }} // 1 column on extra small screens, 2 columns from small breakpoint upwards
          spacing="lg" // Adjust spacing as needed
        >
          <div>
            <h3>Current courses</h3>
            <CurrentCourses />
            <br />
            <br />
            <h3>Upcoming courses:</h3>
            <UpcomingCourses />
          </div>
          <div>
            <SmallCalendarComponent />
            <EventTable />
          </div>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Dashboard;
