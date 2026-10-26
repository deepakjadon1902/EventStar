import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Container from "../components/layout/Container";
import Seo from "../components/ui/Seo";
import ApplyForm from "../components/creators/ApplyForm";
export default function CreatorApply() {
  return (
    <div className="application-page bg-surface pb-20">
      <Container className="max-w-4xl pt-8">
        <Seo
          title="Apply to cover an event"
          description="Apply to our creator program. Share your work, choose upcoming tech events, and tell us about the stories you want to cover."
          noindex
        />
        <Link to="/creators" className="text-link mb-7 text-xs">
          <ChevronLeft size={15} aria-hidden="true" />
          The creator program
        </Link>
        <p className="eyebrow">Bring your perspective</p>
        <h1 className="mt-4">Your next story starts here.</h1>
        <p className="mb-9 mt-5 max-w-xl text-sm text-ink-500">
          Tell us about your work and the events you’d like to cover. You don’t
          need a big audience — just an active public channel and a thoughtful
          approach.
        </p>
        <ApplyForm />
      </Container>
    </div>
  );
}
