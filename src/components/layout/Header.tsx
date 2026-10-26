import { useRef, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { navigation } from "../../config/nav";
export default function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <Container className="header-inner">
          <Logo />
          <nav aria-label="Main navigation" className="desktop-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Discover
            </NavLink>
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/creators/apply"
            className="button button-primary header-cta"
          >
            Become a creator <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            className="menu-toggle"
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => {
              menu.current?.showModal();
              setMenuOpen(true);
            }}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </Container>
      </header>
      <MobileNav dialogRef={menu} onClose={() => setMenuOpen(false)} />
    </>
  );
}
