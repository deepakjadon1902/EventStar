import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import EventSearch from "../components/home/EventSearch";
import Home from "../pages/Home";
import Events from "../pages/Events";
function Location() {
  const location = useLocation();
  return (
    <output data-testid="route">
      {location.pathname}
      {location.search}
    </output>
  );
}
function mount(page: React.ReactNode, route = "/") {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[route]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {page}
        <Location />
      </MemoryRouter>
    </HelmetProvider>,
  );
}
describe("event discovery interactions", () => {
  it("carries the homepage search and both selections into a shareable directory URL", async () => {
    const user = userEvent.setup();
    mount(<EventSearch />);
    await user.type(screen.getByLabelText("Event or city"), "GitHub");
    await user.selectOptions(screen.getByLabelText("Location"), "usa");
    await user.selectOptions(screen.getByLabelText("Interest"), "developer");
    await user.click(screen.getByRole("button", { name: /Find events/ }));
    const route = screen.getByTestId("route").textContent!;
    expect(route.startsWith("/events?")).toBe(true);
    const params = new URLSearchParams(route.split("?")[1]);
    expect(params.get("q")).toBe("GitHub");
    expect(params.get("region")).toBe("usa");
    expect(params.get("category")).toBe("developer");
  });
  it("filters the featured events by interest and restores the curated selection", async () => {
    const user = userEvent.setup();
    mount(<Home />);
    const featured = within(
      screen.getByRole("region", { name: "Featured events" }),
    );
    expect(
      featured.getByRole("link", { name: /GitHub Universe/ }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Fintech" }));
    expect(
      featured.queryByRole("link", { name: /GitHub Universe/ }),
    ).toBeNull();
    expect(featured.getByRole("link", { name: /Intuit Connect/ })).toBeTruthy();
    expect(
      screen
        .getByRole("button", { name: "Fintech" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    await user.click(screen.getByRole("button", { name: "All interests" }));
    expect(
      featured.getByRole("link", { name: /GitHub Universe/ }),
    ).toBeTruthy();
  });
  it("switches grid and list layouts without losing the active event filter", async () => {
    const user = userEvent.setup();
    mount(<Events />, "/events?q=GitHub");
    expect(
      screen.getByRole("img", { name: /keynote stage at GitHub Universe/ }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "List view" }));
    expect(
      screen.queryByRole("img", { name: /keynote stage at GitHub Universe/ }),
    ).toBeNull();
    expect(screen.getByRole("link", { name: /GitHub Universe/ })).toBeTruthy();
    expect(screen.getByTestId("route").textContent).toBe("/events?q=GitHub");
    expect(
      screen
        .getByRole("button", { name: "List view" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    await user.click(screen.getByRole("button", { name: "Grid view" }));
    expect(
      screen.getByRole("img", { name: /keynote stage at GitHub Universe/ }),
    ).toBeTruthy();
  });
});
