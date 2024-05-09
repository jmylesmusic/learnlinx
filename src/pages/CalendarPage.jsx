import LargeCalendarComponent from "../components/LargeCalendarComponent";
import EventTable from "../components/EventTable";
import { EventContext } from "../context/event.context";
const CalendarPage = () => {
  return (
    <div>
      <LargeCalendarComponent />
      <EventTable />
    </div>
  );
};

export default CalendarPage;
