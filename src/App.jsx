import "./App.css";
import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUp,
  Navbar,
  Header,
  UsersList,
  Courses,
  Calendar,
  CustomDropzone,
  ProfilePage,
  IsPrivate,
} from "./pages";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Dashboard from "./pages/Dashboard";
import DetailedCoursePage from "./pages/DetailedCoursePage";
import MyCoursesPage from "./pages/MyCoursesPage";
import StudentsList from "./pages/StudentsList";

function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "md",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header />
        </AppShell.Header>

        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/courses" element={<MyCoursesPage />} />

            <Route
              path="/calendar"
              element={
                <IsPrivate>
                  <Calendar />
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
          </Routes>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
export default App;
