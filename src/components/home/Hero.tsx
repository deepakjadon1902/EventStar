import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, MapPin, Globe2 } from "lucide-react";
import Container from "../layout/Container";
import { getUpcoming, formatDateRange } from "../../lib/events";
import { useToday } from "../../hooks/useToday";
import { summitPhoto, getEventPhoto } from "../../data/event-photos";
export default function Hero() {
  const upcoming = getUpcoming(useToday());
  const featured =
    upcoming.find((e) => e.slug === "web-summit-lisbon-2026") ||
    upcoming.find((e) => e.status !== "cancelled");
  const photo = featured ? getEventPhoto(featured) : summitPhoto;
  return (
    <section className="home-hero">
      <Container>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> INDEPENDENTLY CURATED. SINCE 2000.
            </p>
            <h1>
              Be where <br />
              what’s next
              <br />
              <span className="hero-emphasis">happens.</span>
            </h1>
            <p className="hero-intro">
              The rooms. The people. The ideas that move technology forward.
              Find your next event, anywhere in the world.
            </p>
            <div className="hero-actions">
              <Link to="/events" className="button button-primary">
                Explore events <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/creators" className="hero-creator-link">
                For creators <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-footnote">
              <Globe2 size={16} aria-hidden="true" />
              <span>A global perspective. A human connection.</span>
            </div>
          </div>
          {featured && (
            <Link to={`/events/${featured.slug}`} className="hero-feature">
              <img
                src={photo.src}
                alt={photo.alt}
                fetchPriority="high"
                width="1280"
                height="854"
              />
              <div className="hero-photo-shade" />
              <span className="feature-label">
                <span className="status-dot" /> THE NEXT BIG CONVERSATION
              </span>
              <span className="hero-image-credit">{photo.caption}</span>
              <div className="hero-feature-info">
                <p className="hero-feature-date">
                  {formatDateRange(featured.startDate, featured.endDate)}
                </p>
                <h2>{featured.name.replace(" (Lisbon)", "")}</h2>
                <p>
                  <MapPin size={15} aria-hidden="true" /> {featured.city},{" "}
                  {featured.country}
                </p>
              </div>
              <span className="round-arrow">
                <ArrowUpRight size={23} aria-hidden="true" />
              </span>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
