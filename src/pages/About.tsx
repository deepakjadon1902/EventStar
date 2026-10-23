import {
  CalendarDays,
  PenLine,
  Archive,
  ArrowRight,
  Compass,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Seo from "../components/ui/Seo";
import { site } from "../config/site";
const work = [
  {
    title: "Track",
    Icon: CalendarDays,
    text: "We bring upcoming technology events into one clear, filterable calendar, with direct links to the people organizing them.",
  },
  {
    title: "Connect",
    Icon: PenLine,
    text: "We invite independent creators to apply to cover events, and help them navigate requests for access.",
  },
  {
    title: "Archive",
    Icon: Archive,
    text: "We preserve past event listings so the dates, places, and context remain easy to find.",
  },
];
export default function About() {
  return (
    <>
      <Seo
        title="About us"
        description="Established in 2000, our team tracks technology events worldwide and connects independent creators with opportunities to cover them."
      />
      <section className="page-heading">
        <Container>
          <p className="eyebrow">Independent since {site.foundedYear}</p>
          <h1 className="mt-4 max-w-3xl">
            Technology moves fast.
            <br />
            We keep our bearings.
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-500">
            A clear view of where the industry gathers — and a place for the
            people who tell its stories.
          </p>
        </Container>
      </section>
      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Compass
              className="mb-5 text-brand-600"
              size={36}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2 className="text-2xl">A steady point of reference.</h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-ink-700 lg:col-span-8">
            <p>
              Established in {site.foundedYear}, {site.name} follows the
              conferences and gatherings that shape the technology industry. Our
              calendar spans the USA, UK and Europe, China and Hong Kong,
              Asia-Pacific, the Middle East, and beyond.
            </p>
            <p>
              Our mission is straightforward: make technology events easier to
              discover, and help independent creators bring thoughtful reporting
              to their audiences.
            </p>
            <p>
              We are an independent directory. Listed events belong to their
              organizers. We link to official information, respect each
              organizer’s role, and make the limits of our information clear.
            </p>
          </div>
        </Container>
      </section>
      <section className="section border-y border-line bg-surface">
        <Container>
          <p className="eyebrow">What we do</p>
          <h2 className="mb-8 mt-4">Follow. Connect. Remember.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {work.map(({ title, Icon, text }) => (
              <article className="panel p-7" key={title}>
                <Icon
                  className="mb-6 text-brand-600"
                  size={26}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-xl">{title}</h3>
                <p className="mt-4 text-sm text-ink-500">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <div className="section-heading">
            <h2 className="text-2xl">What guides us.</h2>
            <Link className="text-link" to="/contact">
              Get in touch
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Accuracy",
                text: "We use public sources, show verification dates, and welcome corrections. Confirming with the organizer is always the final step.",
              },
              {
                title: "Independence",
                text: "We keep listings factual and creator coverage independent. We don’t imply partnerships or endorsements.",
              },
              {
                title: "Respect",
                text: "We respect organizers’ rules, creators’ ownership, and readers’ privacy. There are no tracking cookies in this version.",
              },
            ].map((item) => (
              <div
                className="border-t-2 border-brand-600 pt-5"
                key={item.title}
              >
                <h3>{item.title}</h3>
                <p className="mt-3 text-sm text-ink-500">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
