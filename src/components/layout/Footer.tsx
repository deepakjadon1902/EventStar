import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { site } from "../../config/site";
const columns = [
  {
    title: "FIND YOUR NEXT",
    links: [
      ["Upcoming events", "/events"],
      ["The archive", "/events?view=past"],
      ["Creator program", "/creators"],
      ["Become a creator", "/creators/apply"],
    ],
  },
  {
    title: "GET TO KNOW US",
    links: [
      ["Our story", "/about"],
      ["Get in touch", "/contact"],
      ["Photography credits", "/photo-credits"],
      ["Accessibility", "/legal/accessibility"],
    ],
  },
  {
    title: "THE IMPORTANT DETAILS",
    links: [
      ["Privacy policy", "/legal/privacy"],
      ["Terms of use", "/legal/terms"],
      ["Creator terms", "/legal/creator-terms"],
      ["Code of conduct", "/legal/conduct"],
      ["Disclaimer & trademarks", "/legal/disclaimer"],
    ],
  },
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top">
          <div className="footer-brand">
            <Logo inverse />
            <p>
              A little curiosity can take you a long way.
              <br />
              Find the events, people, and ideas worth following.
            </p>
            <p className="footer-since">
              INDEPENDENT. CONNECTED. SINCE {site.foundedYear}.
            </p>
          </div>
          {columns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h2>{column.title}</h2>
              <div>
                {column.links.map(([label, to]) => (
                  <Link key={to} to={to}>
                    {label}
                  </Link>
                ))}
              </div>
              {column.title === "FIND YOUR NEXT" && (
                <Link className="footer-submit" to="/contact?topic=event">
                  Submit an event <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-line">
            <span>
              © {new Date().getFullYear()} {site.shortName}. Made for the
              curious.
            </span>
            <span>A global calendar. An independent perspective.</span>
            <Link to="/legal/cookies">
              <span className="status-dot" />
              No tracking cookies
            </Link>
          </div>
          <p>
            All event names and trademarks belong to their respective owners.
            NorthStar is an independent directory and is not affiliated with the
            organizers listed. Conference photography may show previous
            editions.
          </p>
        </div>
      </Container>
    </footer>
  );
}
