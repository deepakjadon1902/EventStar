import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "../App";
const routes = [
  ["/", "Tech events, tracked"],
  ["/events", "Tech Events."],
  ["/events/github-universe-2026", "GitHub Universe"],
  ["/events/grace-hopper-celebration-2026", "Grace Hopper Celebration"],
  ["/events/ces-2026", "CES 2026"],
  ["/creators", "Cover tech events"],
  ["/creators/apply", "Your next story starts here."],
  ["/about", "Technology moves fast."],
  ["/contact", "Let’s connect."],
  ["/legal/terms", "Terms of Use"],
  ["/legal/privacy", "Privacy Policy"],
  ["/legal/disclaimer", "Disclaimer & Trademark Notice"],
  ["/legal/creator-terms", "Creator Program Terms"],
  ["/legal/accessibility", "Accessibility Statement"],
  ["/legal/conduct", "Creator Code of Conduct"],
  ["/legal/cookies", "Cookie Policy"],
  ["/missing", "You’ve wandered off the map."],
  ["/events/does-not-exist", "That event isn’t on the calendar."],
];
describe("route and landmark smoke checks", () => {
  it.each(routes)(
    "renders %s with one main heading and shared landmarks",
    async (path, heading) => {
      vi.spyOn(window, "scrollTo").mockImplementation(() => {});
      render(
        <HelmetProvider>
          <MemoryRouter
            initialEntries={[path]}
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <App />
          </MemoryRouter>
        </HelmetProvider>,
      );
      const h1 = await screen.findByRole(
        "heading",
        { level: 1 },
        { timeout: 10000 },
      );
      expect(h1.textContent).toContain(heading);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("main")).toBeTruthy();
      expect(screen.getByRole("banner")).toBeTruthy();
      expect(screen.getByRole("contentinfo")).toBeTruthy();
      expect(
        screen
          .getByRole("link", { name: "Skip to content" })
          .getAttribute("href"),
      ).toBe("#main-content");
    },
  );
});
