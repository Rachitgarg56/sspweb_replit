import { Event } from "../src/types";
import EventCard from "./EventCard";

interface EventListProps {
  events: Event[];
}

function EventList({ events }: EventListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
