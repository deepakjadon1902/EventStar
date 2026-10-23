import { describe, it, expect, vi } from "vitest";
import { submitApplication } from "./submit";
describe("submission adapter", () => {
  it("does not call a network endpoint in demo mode", async () => {
    vi.stubEnv("VITE_FORM_ENDPOINT", "");
    vi.spyOn(console, "info").mockImplementation(() => {});
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect(await submitApplication({ name: "Synthetic Test" })).toEqual({
      mode: "demo",
    });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("POSTs JSON to the configured endpoint", async () => {
    vi.stubEnv("VITE_FORM_ENDPOINT", "https://example.com/forms");
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);
    expect(await submitApplication({ kind: "contact" })).toEqual({
      mode: "sent",
    });
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/forms",
      expect.objectContaining({
        method: "POST",
        body: '{"kind":"contact"}',
        headers: { "Content-Type": "application/json" },
      }),
    );
  });
  it("surfaces a failed request so the form can offer retry", async () => {
    vi.stubEnv("VITE_FORM_ENDPOINT", "https://example.com/forms");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(submitApplication({})).rejects.toThrow("Please try again");
  });
});
