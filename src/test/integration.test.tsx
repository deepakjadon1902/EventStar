import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Events from "../pages/Events";
import CreatorApply from "../pages/CreatorApply";
function Location() {
  const location = useLocation();
  return <output data-testid="location">{location.search}</output>;
}
function wrapper(page: React.ReactNode, path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {page}
        <Location />
      </MemoryRouter>
    </HelmetProvider>,
  );
}
describe("directory and application flows", () => {
  it("loads shareable filters, shows an empty state, and clears them", async () => {
    const user = userEvent.setup();
    wrapper(<Events />, "/events?region=china-hk&q=Github");
    expect(
      screen.getByRole("heading", { name: "No events match these filters." }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByTestId("location").textContent).toBe("");
    expect(screen.getByRole("link", { name: /GitHub Universe/ })).toBeTruthy();
    await user.selectOptions(screen.getByLabelText("Format"), "hybrid");
    expect(screen.getByTestId("location").textContent).toContain(
      "format=hybrid",
    );
  });
  it("switches to past events and updates the query string", async () => {
    const user = userEvent.setup();
    wrapper(<Events />, "/events");
    await user.click(screen.getByRole("tab", { name: /Past events/ }));
    expect(screen.getByTestId("location").textContent).toContain("view=past");
    expect(screen.getByRole("link", { name: /CES 2026/ })).toBeTruthy();
    expect(screen.queryByRole("link", { name: /Oracle AI World/ })).toBeNull();
  });
  it("prefills event and email, validates, then completes a demo application", async () => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const user = userEvent.setup();
    wrapper(
      <CreatorApply />,
      "/creators/apply?event=github-universe-2026&email=creator%40example.com",
    );
    expect(
      (screen.getByLabelText("Email address") as HTMLInputElement).value,
    ).toBe("creator@example.com");
    expect(
      (
        screen.getByRole("checkbox", {
          name: /GitHub Universe/,
        }) as HTMLInputElement
      ).checked,
    ).toBe(true);
    await user.click(
      screen.getByRole("button", { name: "Submit application" }),
    );
    expect(
      await screen.findByText("Enter at least 2 characters."),
    ).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByLabelText("Full name"));
    await user.paste("Test Creator");
    await user.selectOptions(screen.getByLabelText("Country"), "IN");
    await user.click(screen.getByLabelText("Writer"));
    await user.click(screen.getByLabelText("Channel or portfolio URL"));
    await user.paste("https://example.com/work");
    await user.click(
      screen.getByLabelText("Why would you like to cover these events?"),
    );
    await user.paste(
      "I report on developer tools and want to explain the practical impact of new AI workflows for my readers.",
    );
    await user.click(
      screen.getByRole("checkbox", { name: /I will clearly disclose/ }),
    );
    await user.click(
      screen.getByRole("checkbox", { name: /I agree to the Creator Terms/ }),
    );
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    await user.click(
      screen.getByRole("button", { name: "Submit application" }),
    );
    expect(
      await screen.findByText("Your demo application is complete."),
    ).toBeTruthy();
    expect(fetch).not.toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
  });
  it("keeps cancelled events out of the application choices", () => {
    wrapper(
      <CreatorApply />,
      "/creators/apply?event=grace-hopper-celebration-2026",
    );
    expect(screen.queryByRole("checkbox", { name: /Grace Hopper/ })).toBeNull();
    expect(screen.getByText(/Selected 0 events/)).toBeTruthy();
  });
  it("keeps a stable event title and metadata for the directory", async () => {
    wrapper(<Events />, "/events");
    await waitFor(() => expect(document.title).toBe("Tech Events | NorthStar"));
  });
});
