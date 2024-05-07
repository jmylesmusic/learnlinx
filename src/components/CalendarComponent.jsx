import dayjs from "dayjs";
import { useState } from "react";
import { Calendar } from "@mantine/dates";
import { Indicator, Container, Text, Title } from "@mantine/core";
import "@mantine/dates/styles.css";

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample events data
  const events = {
    "2024-05-15": {
      title: "Meeting with team",
      description: "Weekly sync with the team at office.",
      time: "18:00",
    },
    "2024-05-20": {
      title: "Doctor Appointment",
      description: "Annual health check-up at Dr. Smith’s Clinic.",
      time: "18:00",
    },
    "2024-05-22": {
      title: "Conference",
      description: "Tech conference about modern web technologies.",
      time: "18:00",
    },
  };

  const handleDateSelection = (date) => {
    const clickedDate = dayjs(date).startOf("day").toDate();
    setSelectedDate(clickedDate);
  };

  const renderEventDetails = () => {
    const dateString = dayjs(selectedDate).format("YYYY-MM-DD");
    const event = events[dateString];
    if (event) {
      return (
        <Container>
          <Title order={4}>{dayjs(selectedDate).format("MMMM D, YYYY")}</Title>
          <Text size="lg" weight={500}>
            {event.time} - {event.title}
          </Text>
          <Text size="sm">{event.description}</Text>
        </Container>
      );
    }
    return (
      <Container>
        <Title order={4}>{dayjs(selectedDate).format("MMMM D, YYYY")}</Title>
        <Text size="lg" weight={500}>
          No events
        </Text>
      </Container>
    );
  };

  return (
    <>
      <Calendar
        dayStyle={(date) => ({
          backgroundColor:
            selectedDate &&
            dayjs(selectedDate).isSame(dayjs(date).startOf("day"), "day")
              ? "lightblue"
              : undefined,
        })}
        renderDay={(date) => {
          const dateString = dayjs(date).format("YYYY-MM-DD");
          const event = events[dateString];
          if (event) {
            return (
              <Indicator size={6} color="red">
                {dayjs(date).date()}
              </Indicator>
            );
          }
          return dayjs(date).date();
        }}
        getDayProps={(date) => ({
          onClick: () => handleDateSelection(date),
        })}
      />
      {selectedDate && renderEventDetails()}
    </>
  );
}

export default CalendarComponent;
