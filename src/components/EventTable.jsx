import cx from "clsx";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { Table, ScrollArea, useMantineTheme } from "@mantine/core";
import classes from "../styles/TableScrollArea.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export function EventTable() {
  const { isLoggedIn } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useMantineTheme();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const eventsData = await response.json();
        setData(eventsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchEvents();
    }
  }, [isLoggedIn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const rows = data.map((event) => {
    const colorKey =
      event.color in theme.colors
        ? theme.colors[event.color][1]
        : theme.colors.red[1];
    return (
      <Table.Tr key={event._id}>
        <Table.Td style={{ backgroundColor: colorKey }}>
          {formatDate(event.date)}
        </Table.Td>
        <Table.Td style={{ backgroundColor: colorKey }}>
          {event.timeStart}
        </Table.Td>
        <Table.Td style={{ backgroundColor: colorKey }}>
          {event.eventTitle}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Start Time</Table.Th>
            <Table.Th>Course</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
export default EventTable;
