import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconCalendarClock,
  IconSchool,
  IconSettings,
  IconLayoutDashboard,
  IconFriends,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import { NavLink, Route, Router } from "react-router-dom"; // Import NavLink and Route
import classes from "../styles/NavbarSimpleColored.module.css";
import logo from "../images/learnlinx-logo-white.svg";

const data = [
  { link: "/main", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/courses", label: "Courses", icon: IconSchool },
  { link: "/calendar", label: "Calendar", icon: IconCalendarClock },
  { link: "/students", label: "Students", icon: IconFriends },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

export function Navbar() {
  const [active, setActive] = useState("Dashboard");

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      activeClassName={classes.active} // Add activeClassName for active link styling
      to={item.link} // Use NavLink instead of anchor tag
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      {/* Use Switch and Route for rendering components based on route */}
    </nav>
  );
}

export default Navbar;
