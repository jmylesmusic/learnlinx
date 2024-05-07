import dayjs from "dayjs";
import { useState } from "react";
import { Calendar } from "@mantine/dates";
import "@mantine/dates/styles.css";

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelection = (date) => {
    // Convert the date object to a standardized format or compare date parts directly
    const clickedDate = dayjs(date).startOf("day");
    const isSelected =
      selectedDate && dayjs(selectedDate).isSame(clickedDate, "day");

    if (isSelected) {
      setSelectedDate(null); // If the selected date is clicked again, clear the selection
    } else {
      setSelectedDate(clickedDate.toDate()); // Store the date as a Date object
    }
  };

  return (
    <Calendar
      getDayProps={(date) => {
        const dayProps = {
          onClick: () => handleDateSelection(date),
          style: {
            // Check if this day is selected and apply a style or class conditionally
            backgroundColor:
              selectedDate &&
              dayjs(selectedDate).isSame(dayjs(date).startOf("day"), "day")
                ? "lightblue"
                : undefined,
          },
        };
        return dayProps;
      }}
    />
  );
}

export default CalendarComponent;
