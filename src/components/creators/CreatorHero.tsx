import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../layout/Container";
export default function CreatorHero() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <section className="creator-page-hero">
      <Container className="creator-hero-layout">
        <div className="creator-hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            THE NORTHSTAR CREATOR PROGRAM
          </p>
          <h1>
            Cover tech events.
            <br />
            <span className="heading-emphasis">Tell your kind of story.</span>
          </h1>
          <p>
            Get closer to the ideas, people, and moments that matter. Bring your
            perspective. Keep your independence. Make something worth sharing.
          </p>
          <form
            className="creator-start-form"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(
                `/creators/apply${email ? `?email=${encodeURIComponent(email)}` : ""}`,
              );
            }}
          >
            <label htmlFor="creator-email" className="sr-only">
              Email address to start your application
            </label>
            <input
              id="creator-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
            />
            <button type="submit" className="button button-primary">
              Start application <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </form>
          <p className="creator-form-note">
            Your work matters more than your follower count. Come as you are.
          </p>
        </div>
        <div className="creator-hero-image">
          <img
            src="/images/web-summit-community.png"
            alt="Creators sharing a moment at Web Summit Lisbon 2025"
            width="1024"
            height="684"
          />
          <span>WEB SUMMIT LISBON · 2025 EDITION</span>
        </div>
      </Container>
    </section>
  );
}
