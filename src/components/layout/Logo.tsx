import { Link } from "react-router-dom";
import { site } from "../../config/site";
export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} home`}
      className={`site-logo ${inverse ? "site-logo-inverse" : ""}`}
    >
      <svg aria-hidden="true" viewBox="0 0 40 40" width="37" height="37">
        <path
          d="M20 2 24.4 15.6 38 20 24.4 24.4 20 38 15.6 24.4 2 20 15.6 15.6Z"
          fill="currentColor"
        />
        <path
          d="m30 4 1.4 4.6L36 10l-4.6 1.4L30 16l-1.4-4.6L24 10l4.6-1.4Z"
          fill="currentColor"
          opacity=".45"
        />
      </svg>
      <span className="logo-name">
        NorthStar<span className="logo-period">.</span>
        <span className="logo-descriptor">TECH EVENTS</span>
      </span>
    </Link>
  );
}
