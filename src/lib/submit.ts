import { site } from "../config/site";
export const isDemoMode = !import.meta.env.VITE_FORM_ENDPOINT;
export type SubmissionResult = { mode: "demo" | "sent" };
export async function submitApplication(
  payload: Record<string, unknown>,
): Promise<SubmissionResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
  if (!endpoint) {
    await new Promise((resolve) => globalThis.setTimeout(resolve, 800));
    if (import.meta.env.DEV)
      console.info(`[${site.name} demo - not sent]`, payload);
    return { mode: "demo" };
  }
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(
        "Submission failed. Your details are still in the form. Please try again.",
      );
    return { mode: "sent" };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError")
      throw new Error("The request timed out. Please try again.");
    throw error;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
