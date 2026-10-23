import { Ban, RefreshCw, Radio } from "lucide-react";
import Badge from "../ui/Badge";
import type { TechEvent } from "../../types/event";
import { isHappening } from "../../lib/events";
import { useToday } from "../../hooks/useToday";
export default function EventBadges({ event }: { event: TechEvent }) {
  const today = useToday();
  return (
    <>
      {event.status === "cancelled" && (
        <Badge variant="danger">
          <Ban size={11} aria-hidden="true" />
          Cancelled
        </Badge>
      )}
      {event.status === "rescheduled" && (
        <Badge variant="warning">
          <RefreshCw size={11} aria-hidden="true" />
          New dates
        </Badge>
      )}
      {isHappening(event, today) && (
        <Badge variant="success">
          <Radio size={11} aria-hidden="true" />
          Happening now
        </Badge>
      )}
      {event.format !== "in-person" && (
        <Badge variant="blue">
          {event.format === "hybrid" ? "Hybrid" : "Virtual"}
        </Badge>
      )}
    </>
  );
}
