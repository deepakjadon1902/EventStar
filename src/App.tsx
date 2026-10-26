import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Skeleton from "./components/ui/Skeleton";
const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Creators = lazy(() => import("./pages/Creators"));
const CreatorApply = lazy(() => import("./pages/CreatorApply"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/legal/Legal"));
const PhotoCredits = lazy(() => import("./pages/PhotoCredits"));
const NotFound = lazy(() => import("./pages/NotFound"));
export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
  return (
    <>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-[60vh] outline-none"
      >
        <Suspense fallback={<Skeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/creators/apply" element={<CreatorApply />} />
            <Route path="/photo-credits" element={<PhotoCredits />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal/:document" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
