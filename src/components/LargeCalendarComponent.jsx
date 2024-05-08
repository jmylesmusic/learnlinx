import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/auth.context";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { setHours, setMinutes } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL;
const localizer = momentLocalizer(moment);

export function LargeCalendarComponent() {
  const { isLoggedIn } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Correct placement of useCallback
  const convertEventsForCalendar = useCallback((events) => {
    return events.map((event) => {
      const date = new Date(event.date);
      const [startHour, startMinute] = event.timeStart.split(":").map(Number);
      const [endHour, endMinute] = event.timeEnd.split(":").map(Number);

      const start = setMinutes(setHours(date, startHour), startMinute);
      const end = setMinutes(setHours(date, endHour), endMinute);

      return {
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
          setData(eventsData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }
  }, [isLoggedIn]);

  return (
    <div style={{ height: 500 }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <Calendar
          localizer={localizer}
          events={convertEventsForCalendar(data)}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      )}
    </div>
  );
}

export default LargeCalendarComponent;
