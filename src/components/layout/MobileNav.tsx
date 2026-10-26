import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
const groups = [
  {
    name: "Browse",
    links: [
      ["Upcoming events", "/events"],
      ["Past events", "/events?view=past"],
      ["Explore by region", "/events#region-filters"],
    ],
  },
  {
    name: "For creators",
    links: [
      ["The program", "/creators"],
      ["Apply to cover", "/creators/apply"],
      ["Creator guidelines", "/legal/creator-terms"],
    ],
  },
  {
    name: "Company",
    links: [
      ["About us", "/about"],
      ["Contact", "/contact"],
    ],
  },
];
export default function MobileNav({
  dialogRef,
  onClose,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  onClose?: () => void;
}) {
  const previousOverflow = useRef("");
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const observer = new MutationObserver(() => {
      if (dialog.open) {
        previousOverflow.current = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      } else document.body.style.overflow = previousOverflow.current;
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      document.body.style.overflow = previousOverflow.current;
    };
  }, [dialogRef]);
  return (
    <dialog
      ref={dialogRef}
      id="mobile-navigation"
      onClose={onClose}
      aria-label="Navigation"
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-white p-0 backdrop:bg-ink-900/30"
    >
      <div className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <div onClick={() => dialogRef.current?.close()}>
            <Logo />
          </div>
          <button
            autoFocus
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-line"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close navigation menu"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav
          aria-label="Mobile navigation"
          className="mt-8 flex-1 space-y-6 overflow-y-auto"
        >
          {groups.map((group) => (
            <div key={group.name}>
              <p className="eyebrow mb-2">{group.name}</p>
              {group.links.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => dialogRef.current?.close()}
                  className="flex min-h-11 items-center py-2 text-lg font-medium text-ink-900"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <Link
          onClick={() => dialogRef.current?.close()}
          to="/creators/apply"
          className="button button-primary mt-6"
        >
          Become a creator
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </dialog>
  );
}
