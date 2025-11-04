import { CommunityEvent } from "../../lib/communityData"
import { EventCard } from "./EventCard"

interface EventsGridProps {
  events: CommunityEvent[]
  onEventRegister: (eventId: number) => void
}

export const EventsGrid = ({ events, onEventRegister }: EventsGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventCard
          key={event.id}
          event={event}
          onRegister={onEventRegister}
          index={index}
        />
      ))}
    </div>
  )
}