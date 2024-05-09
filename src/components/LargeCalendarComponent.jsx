import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/auth.context";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"; // Import drag and drop styles
import "react-big-calendar/lib/css/react-big-calendar.css";
import { setHours, setMinutes } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL;
const localizer = momentLocalizer(moment);

// Wrap the Calendar with drag and drop functionality
const DraggableCalendar = withDragAndDrop(Calendar);

export function LargeCalendarComponent() {
  const { isLoggedIn } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const convertEventsForCalendar = useCallback((events) => {
    return events.map((event) => {
      const date = new Date(event.date);
      const [startHour, startMinute] = event.timeStart.split(":").map(Number);
      const [endHour, endMinute] = event.timeEnd.split(":").map(Number);

      const start = setMinutes(setHours(date, startHour), startMinute);
      const end = setMinutes(setHours(date, endHour), endMinute);

      return {
        id: event._id, // Ensure this is added
        title: event.eventTitle,
        start: start,
        end: end,
        allDay: false,
        resource: event,
      };
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
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

          if (!response.ok) throw new Error("Failed to fetch events");
          const eventsData = await response.json();
          setData(convertEventsForCalendar(eventsData));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }
  }, [isLoggedIn, setData]);
  const handleEventDrop = async ({ event, start, end }) => {
    const updatedEvent = {
      ...event.resource,
      date: start.toISOString().split("T")[0],
      timeStart: `${start.getHours()}:${start.getMinutes()}`,
      timeEnd: `${end.getHours()}:${end.getMinutes()}`,
    };

    const eventId = event.id; // Make sure you are using the corrected event id

    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        setData((prevData) =>
          prevData.map((e) => (e.id === eventId ? { ...e, start, end } : e))
        );
      } else {
        throw new Error("Failed to update the event");
      }
    } catch (error) {
      console.error("Error updating event", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DraggableCalendar
          localizer={localizer}
          events={data}
          startAccessor="start"
          endAccessor="end"
          onEventDrop={handleEventDrop}
          onEventResize={handleEventDrop}
          resizable
          style={{ height: 500 }}
        />
      )}
    </div>
  );
}

export default LargeCalendarComponent;
