import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getUpcoming } from "../../lib/events";
import { useToday } from "../../hooks/useToday";
import Container from "../layout/Container";
const regions = [
  {
    id: "usa",
    label: "USA",
    description: "From the Valley to the world.",
    image: "san-francisco.jpg",
    alt: "The Golden Gate Bridge in San Francisco",
  },
  {
    id: "uk-europe",
    label: "UK & Europe",
    description: "Old cities. New perspectives.",
    image: "london.jpg",
    alt: "London skyline and the River Thames",
  },
  {
    id: "asia-pacific",
    label: "Asia-Pacific",
    description: "Meet the next wave.",
    image: "singapore.jpg",
    alt: "The Singapore skyline across Marina Bay",
  },
  {
    id: "middle-east-africa",
    label: "Middle East & Africa",
    description: "A world of possibility.",
    image: "dubai.jpg",
    alt: "The Dubai skyline",
  },
];
export default function RegionTiles() {
  const upcoming = getUpcoming(useToday());
  return (
    <section className="section regions-section">
      <Container>
        <div className="section-heading">
          <div>
            <p className="eyebrow">GOOD IDEAS TRAVEL</p>
            <h2>Your next event. Your corner of the world.</h2>
          </div>
          <Link className="text-link" to="/events">
            All destinations <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="region-grid">
          {regions.map((region) => (
            <Link
              to={`/events?region=${region.id}`}
              key={region.id}
              className="region-card"
            >
              <img
                src={`/images/${region.image}`}
                alt={region.alt}
                loading="lazy"
                width="450"
                height="500"
              />
              <div className="region-shade" />
              <span className="region-count">
                {upcoming.filter((e) => e.region === region.id).length} upcoming
                events
              </span>
              <div className="region-content">
                <h3>{region.label}</h3>
                <p>{region.description}</p>
              </div>
              <span className="region-arrow">
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
