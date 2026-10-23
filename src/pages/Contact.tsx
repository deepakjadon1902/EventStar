import { Mail, CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Seo from "../components/ui/Seo";
import ContactForm from "../components/ContactForm";
import { site } from "../config/site";
export default function Contact() {
  return (
    <>
      <Seo
        title="Contact us"
        description="Contact our team with a question, submit a technology event for review, request a correction, or ask about the creator program."
      />
      <div className="page-heading">
        <Container>
          <p className="eyebrow">Keep the conversation going</p>
          <h1 className="mt-4">
            Let’s connect<span className="text-brand-600">.</span>
          </h1>
          <p className="mt-5 max-w-lg text-ink-500">
            A question, a correction, or an event we should know about? We’d
            like to hear from you.
          </p>
        </Container>
      </div>
      <Container className="grid items-start gap-10 py-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-9 lg:col-span-4">
          <div>
            <Mail
              className="mb-4 text-brand-600"
              size={24}
              aria-hidden="true"
            />
            <h2 className="mb-2 text-lg">Drop us a line</h2>
            <a href={`mailto:${site.email}`} className="text-link break-all">
              {site.email}
            </a>
            <p className="text-xs text-ink-500">
              Placeholder address — configure before launch.
            </p>
            <p className="mt-4 text-sm text-ink-500">
              We aim to reply within 3 business days.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
            <CalendarPlus
              className="mb-4 text-brand-600"
              size={24}
              aria-hidden="true"
            />
            <h2 className="text-lg">Event organizer?</h2>
            <p className="mt-3 text-sm text-ink-500">
              Submit your event for review. Choose “Submit an event” and share
              the official link, dates, and location. Listings are reviewed for
              relevance and accuracy.
            </p>
          </div>
          <p className="text-xs leading-relaxed text-ink-500">
            Your message is handled according to our{" "}
            <Link className="text-brand-600 underline" to="/legal/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
