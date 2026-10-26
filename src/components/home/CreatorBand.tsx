import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "../layout/Container";
export default function CreatorBand() {
  return (
    <section className="section creator-band-section">
      <Container>
        <div className="creator-band">
          <div className="creator-band-image">
            <img
              src="/images/web-summit-community.png"
              alt="Two attendees capturing a moment together at Web Summit Lisbon 2025"
              width="1024"
              height="684"
              loading="lazy"
            />
            <span className="creator-photo-caption">
              THE PEOPLE MAKE THE STORY. · WEB SUMMIT 2025
            </span>
          </div>
          <div className="creator-band-copy">
            <p className="eyebrow">FOR THE STORYTELLERS</p>
            <h2>
              You bring the voice.
              <br />
              <span className="heading-emphasis">We’ll help open doors.</span>
            </h2>
            <p>
              Writers. Filmmakers. Podcasters. Photographers. Get closer to the
              conversations and tell the stories only you can tell.
            </p>
            <div className="creator-band-checks">
              <span>
                <Check size={15} aria-hidden="true" />
                Independent voice
              </span>
              <span>
                <Check size={15} aria-hidden="true" />
                No follower-count gate
              </span>
            </div>
            <Link to="/creators" className="button button-primary">
              Meet the creator program{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <p className="creator-access-note">
              We support your application. Organizers decide access.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
