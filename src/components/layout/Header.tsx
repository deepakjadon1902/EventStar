import { useRef } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { navigation } from "../../config/nav";
export default function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
        <Container className="flex h-20 items-center justify-between gap-6">
          <Logo />
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-11 items-center text-sm font-medium transition-colors hover:text-brand-600 ${isActive ? "text-brand-600" : "text-ink-700"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link
            className="button button-primary ml-auto hidden sm:inline-flex lg:ml-0"
            to="/creators/apply"
          >
            Become a creator
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-line lg:hidden"
            aria-label="Open navigation menu"
            onClick={() => menu.current?.showModal()}
          >
            <Menu aria-hidden="true" size={22} />
          </button>
        </Container>
      </header>
      <MobileNav dialogRef={menu} />
    </>
  );
}
