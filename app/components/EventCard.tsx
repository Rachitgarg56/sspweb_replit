import { Event } from "../src/types";
import { formatDate } from "../.././utils/formatters"; // Ensure the correct import path

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <img
        src={event.images[0]}
        alt={event.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <p className="text-sm text-gray-500">{formatDate(event.date)}</p> {/* ✅ Format date correctly */}
        <p className="mt-2">{event.description}</p>
        <a
          href={`/events/${event.id}`} // ✅ Ensure `event` has `id`
          className="text-orange-500 hover:underline mt-2 inline-block"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default EventCard;
