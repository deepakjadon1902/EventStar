import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Ticket,
  CalendarDays,
  Megaphone,
  Check,
} from "lucide-react";
import Seo from "../components/ui/Seo";
import Container from "../components/layout/Container";
import CreatorHero from "../components/creators/CreatorHero";
import BenefitCard from "../components/creators/BenefitCard";
import StepList from "../components/creators/StepList";
import PitchHelper from "../components/creators/PitchHelper";
import CreatorResources from "../components/creators/CreatorResources";
import { creatorFaq } from "../data/creator-faq";
import Faq from "../components/ui/Faq";
export default function Creators() {
  return (
    <>
      <Seo
        title="The creator program"
        description="Writers, video creators, podcasters, and photographers: apply to cover technology events with our program. Original work matters more than audience size."
      />
      <CreatorHero />
      <section className="section">
        <Container>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow">Your story, your voice</p>
            <h2 className="mt-4">Support for the work you do.</h2>
            <p className="mt-4 text-sm text-ink-500">
              For journalists, bloggers, video makers, podcasters,
              photographers, newsletter authors, and developer advocates.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <BenefitCard
              Icon={Ticket}
              title="Event access support"
              text="We help you request press or creator access from organizers. Access is never guaranteed — organizers make the decision."
            />
            <BenefitCard
              Icon={CalendarDays}
              title="Calendar & briefings"
              text="A curated list of upcoming events with key dates, official links, and a clear view of what’s happening next."
            />
            <BenefitCard
              Icon={Megaphone}
              title="A place for your perspective"
              text="Selected coverage may be featured or linked from our site, with your permission. You keep ownership of your work."
            />
          </div>
        </Container>
      </section>
      <section className="section border-y border-line bg-surface">
        <Container>
          <p className="eyebrow">From curiosity to coverage</p>
          <h2 className="mt-4">Here’s how it works.</h2>
          <StepList />
          <div className="mt-12 border-t border-line pt-7">
            <h3 className="font-sans text-sm">What we look for</h3>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
              {[
                "Original work",
                "Accurate reporting",
                "Professional conduct",
                "Clear sponsorship disclosures",
              ].map((text) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 text-xs text-ink-500"
                >
                  <Check
                    size={14}
                    className="text-brand-600"
                    aria-hidden="true"
                  />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <CreatorResources />
      <section className="section border-y border-line bg-surface">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Good work starts with good practice</p>
            <h2 className="mt-4 text-3xl">
              Independent.
              <br />
              Accurate. Respectful.
            </h2>
            <p className="mt-5 max-w-md text-sm text-ink-500">
              Follow each event’s filming rules, embargoes, and code of conduct.
              Be clear about your affiliations and disclose any sponsorships.
              Your editorial voice stays yours.
            </p>
            <Link className="text-link mt-5" to="/legal/creator-terms">
              Read the creator guidelines
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <PitchHelper />
        </Container>
      </section>
      <section id="creator-faq" className="section scroll-mt-24">
        <Container className="max-w-3xl">
          <p className="eyebrow">Before you apply</p>
          <h2 className="mb-8 mt-4">A few straight answers.</h2>
          <Faq items={creatorFaq} />
          <Link to="/legal/privacy" className="text-link mt-4 text-xs">
            Read our privacy policy
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Container>
      </section>
      <section className="bg-brand-50 py-12">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl">Bring your next story into focus.</h2>
            <p className="mt-3 text-sm text-ink-500">
              Choose an event. Share your work. Let’s take it from there.
            </p>
          </div>
          <Link to="/creators/apply" className="button button-primary">
            Apply now
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
