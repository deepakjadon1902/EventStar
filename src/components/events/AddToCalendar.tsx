import { CalendarPlus } from "lucide-react";
import type { TechEvent } from "../../types/event";
import { buildIcs } from "../../lib/ics";
export default function AddToCalendar({ event }: { event: TechEvent }) {
  function download() {
    const blob = new Blob([buildIcs(event)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug}.ics`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <button onClick={download} className="button button-secondary">
      <CalendarPlus size={17} aria-hidden="true" />
      Add to calendar
    </button>
  );
}
