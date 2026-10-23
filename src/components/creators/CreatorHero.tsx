import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PenLine } from "lucide-react";
import Container from "../layout/Container";
export default function CreatorHero() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <section className="hero-grid overflow-hidden bg-ink-900 py-16 md:py-20">
      <Container className="relative">
        <p className="eyebrow !text-[#A7C1FF]">The creator program</p>
        <h1 className="relative z-10 mt-6 max-w-3xl text-4xl leading-tight text-white md:text-[56px]">
          Cover tech events
          <br />
          with us<span className="text-[#8AAEFF]">.</span>
        </h1>
        <p className="relative z-10 mt-6 max-w-xl text-base text-slate-300">
          We invite creators to cover the events that shape technology. Bring
          your perspective, keep your independence, and tell a story worth
          following.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(
              `/creators/apply${email ? `?email=${encodeURIComponent(email)}` : ""}`,
            );
          }}
          className="relative z-10 mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
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
            className="min-w-0 flex-1"
          />
          <button type="submit" className="button button-primary">
            Start application
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>
        <p className="relative z-10 mt-4 text-xs text-slate-400">
          No follower-count gate. An active public channel is enough to apply.
        </p>
        <PenLine
          className="pointer-events-none absolute -right-10 top-6 hidden text-white/[.06] md:block"
          size={300}
          strokeWidth={0.5}
          aria-hidden="true"
        />
      </Container>
    </section>
  );
}
