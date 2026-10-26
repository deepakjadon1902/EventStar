import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Seo from "../components/ui/Seo";
type Credit = {
  file: string;
  credit: string;
  source: string;
  description: string;
};
export default function PhotoCredits() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    fetch("/images/credits.json")
      .then((r) => {
        if (!r.ok) throw new Error("Unable to load credits");
        return r.json();
      })
      .then((data: Credit[]) => {
        if (active) setCredits(data);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <>
      <Seo
        title="Photography credits"
        description="The real events, photographers, and locations behind the NorthStar photography."
      />
      <section className="page-heading">
        <Container>
          <p className="eyebrow">THE PEOPLE BEHIND THE PICTURES</p>
          <h1 className="mt-4">Real moments. With credit.</h1>
          <p className="mt-5 max-w-2xl text-sm text-ink-500">
            Our conference photographs show real events from previous editions.
            Destination images illustrate the region. Photography belongs to the
            credited owners; inclusion does not imply a partnership.
          </p>
        </Container>
      </section>
      <Container className="photo-credit-list">
        {error ? (
          <p>
            Photo credits are temporarily unavailable. Sources are also recorded
            in /images/credits.json.
          </p>
        ) : (
          credits.map((item) => (
            <article key={item.file} className="photo-credit-entry">
              <img
                src={`/images/${item.file}`}
                alt={item.description}
                loading="lazy"
                width="150"
                height="100"
              />
              <div>
                <h2>{item.credit}</h2>
                <p>{item.description}</p>
                <a
                  className="text-link"
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View original source ↗
                </a>
              </div>
            </article>
          ))
        )}
      </Container>
    </>
  );
}
