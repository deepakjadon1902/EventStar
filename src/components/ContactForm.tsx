import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { contactSchema } from "../lib/validation";
import type { ContactValues } from "../lib/validation";
import { submitApplication } from "../lib/submit";
import FormField from "./ui/FormField";
import ContactSuccess from "./ContactSuccess";
import DemoBanner from "./creators/DemoBanner";
export default function ContactForm() {
  const [params] = useSearchParams();
  const [error, setError] = useState("");
  const [sent, setSent] = useState<"demo" | "sent" | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: params.get("topic") === "event" ? "event" : "general",
      message: "",
      website: "",
    },
  });
  async function submit(values: ContactValues) {
    setError("");
    try {
      const result = await submitApplication({ ...values, kind: "contact" });
      setSent(result.mode);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send. Please try again.",
      );
    }
  }
  if (sent) return <ContactSuccess mode={sent} />;
  return (
    <>
      <DemoBanner />
      <form
        onSubmit={handleSubmit(submit)}
        noValidate
        className="panel space-y-5 p-6 md:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="contact-name"
            label="Name"
            error={errors.name?.message}
          >
            <input
              id="contact-name"
              autoComplete="name"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby="contact-name-feedback"
            />
          </FormField>
          <FormField
            id="contact-email"
            label="Email"
            error={errors.email?.message}
          >
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby="contact-email-feedback"
            />
          </FormField>
        </div>
        <FormField
          id="contact-topic"
          label="What can we help with?"
          error={errors.topic?.message}
        >
          <select id="contact-topic" {...register("topic")}>
            <option value="general">General inquiry</option>
            <option value="event">Submit an event</option>
            <option value="correction">Correct a listing</option>
            <option value="creators">Creator program</option>
            <option value="privacy">Privacy request</option>
          </select>
        </FormField>
        <FormField
          id="contact-message"
          label="Message"
          error={errors.message?.message}
          hint="For an event submission, include its name, dates, location, and official website."
        >
          <textarea
            id="contact-message"
            rows={6}
            maxLength={2000}
            {...register("message")}
            aria-invalid={!!errors.message}
            aria-describedby="contact-message-feedback"
          />
        </FormField>
        <div hidden aria-hidden="true">
          <label htmlFor="contact-website">Leave empty</label>
          <input
            id="contact-website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        {error && (
          <p role="alert" className="field-error">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="button button-primary"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                className="animate-spin"
                size={17}
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              {error ? "Try again" : "Send message"}
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </>
  );
}
