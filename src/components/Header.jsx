import cx from "clsx";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { NavLink, useParams } from "react-router-dom";
import {
  Autocomplete,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconSearch,
} from "@tabler/icons-react";
import classes from "../styles/HeaderTabs.module.css";
import logo from "../images/learnlinx-logo.svg";
const API_URL = import.meta.env.VITE_API_URL;

const currentUser = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

export function Header() {
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (isLoggedIn) {
      const storedToken = localStorage.getItem("authToken");
      const requestOptions = {
        method: "GET", // Explicitly setting the method to GET
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json", // Assuming you use Bearer token authorization
        },
      };

      fetch(`${API_URL}/api/users/${user.data.userId}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setCurrentUser(data);
          console.log(data); // Updated to log the data once it's set
        })
        .catch((error) => console.error("Failed to load user data:", error));
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <NavLink to="/" className={classes.logoLink}>
            <img src={logo} alt="LearnLinx Logo" style={{ width: "100px" }} />
          </NavLink>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={[]}
          />
          {!isLoggedIn ? (
            <NavLink to="/signin">
              <Button>Log in</Button>
            </NavLink>
          ) : (
            currentUser && (
              <Menu
                width={260}
                position="bottom-end"
                transition="pop-top-right"
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.currentUser, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group gap={7}>
                      <Avatar
                        src={currentUser.profilePictureUrl}
                        alt={currentUser.firstName}
                        radius="xl"
                        size={20}
                      />
                      <Text weight={500} size="sm" mr={3}>
                        {currentUser.firstName} {currentUser.lastName}
                      </Text>
                      <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {/* <Menu.Item
                    icon={<IconHeart size={16} color={theme.colors.red[6]} />}
                  >
                    Liked posts
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconStar size={16} color={theme.colors.yellow[6]} />}
                  >
                    Saved posts
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <IconMessage size={16} color={theme.colors.blue[6]} />
                    }
                  >
                    Your comments
                  </Menu.Item> */}
                  {/* <Menu.Label>Settings</Menu.Label> */}
                  <NavLink to={`/profile/${user.data.userId}`}>
                    <Menu.Item icon={<IconSettings size={16} />}>
                      My Profile
                    </Menu.Item>
                  </NavLink>
                  <Menu.Item
                    onClick={logOutUser}
                    icon={<IconLogout size={16} />}
                  >
                    Logout
                  </Menu.Item>
                  {/* <Menu.Divider />
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item icon={<IconPlayerPause size={16} />}>
                    Pause subscription
                  </Menu.Item> */}
                  <Menu.Item color="red" icon={<IconTrash size={16} />}>
                    Delete account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )
          )}
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          {/* Tabs go here */}
        </Tabs>
      </Container>
    </div>
  );
}

export default Header;
