import "./App.css";
import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUp,
  Navbar,
  Header,
  CalendarPage,
  ProfilePage,
  IsPrivate,
  IsPublic,
  Dashboard,
  DetailedCoursePage,
  MyCoursesPage,
  StudentsList,
  VideoCallPage,
  NotFound,
} from "./pages";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useContext } from "react";
import { AuthContext } from "./context/auth.context";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const { user } = useContext(AuthContext); // Assumes context provides user state

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={
          user
            ? {
                width: 200,
                breakpoint: "md",
                collapsed: { mobile: !opened },
              }
            : undefined
        } // Conditionally set navbar property
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header />
        </AppShell.Header>

        {user && (
          <AppShell.Navbar>
            <Navbar />
          </AppShell.Navbar>
        )}

        <AppShell.Main>
          <Routes>
            <Route
              path="/"
              element={
                <IsPublic>
                  <Home />
                </IsPublic>
              }
            />
            <Route
              path="/main"
              element={
                <IsPrivate>
                  <Dashboard />
                </IsPrivate>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/courses"
              element={
                <IsPrivate>
                  <MyCoursesPage />
                </IsPrivate>
              }
            />
            <Route
              path="/calendar"
              element={
                <IsPrivate>
                  <CalendarPage />
                </IsPrivate>
              }
            />
            <Route
              path="/students"
              element={
                <IsPrivate>
                  <StudentsList />
                </IsPrivate>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            />
            <Route
              path="/courses/:courseId"
              element={
                <IsPrivate>
                  <DetailedCoursePage />
                </IsPrivate>
              }
            />
            <Route
              path="/videocall"
              element={
                <IsPrivate>
                  <VideoCallPage />
                </IsPrivate>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
export default App;
