import { useSearchParams } from "react-router-dom";
import type { EventFilters } from "../lib/events";
export function useEventFilters() {
  const [params, setParams] = useSearchParams();
  const filters: EventFilters = {
    view: params.get("view") === "past" ? "past" : "upcoming",
    q: params.get("q") || "",
    region: params.get("region") || "",
    category: params.get("category") || "",
    format: params.get("format") || "",
    creators: params.get("creators") === "true",
  };
  function update(key: keyof EventFilters, value: string | boolean) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value && !(key === "view" && value === "upcoming"))
          next.set(key, String(value));
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }
  function clear() {
    setParams(filters.view === "past" ? { view: "past" } : {});
  }
  return {
    filters,
    update,
    clear,
    activeCount: [
      filters.q,
      filters.region,
      filters.category,
      filters.format,
      filters.creators,
    ].filter(Boolean).length,
  };
}
