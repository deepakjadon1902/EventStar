import { format, parseISO } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import Container from "../../components/layout/Container";
import Seo from "../../components/ui/Seo";
import { legalDocuments } from "../../data/legal";
import { site } from "../../config/site";
import NotFound from "../NotFound";
export default function Legal() {
  const { document } = useParams();
  const page = legalDocuments[document || ""];
  if (!page) return <NotFound />;
  return (
    <Container className="legal-page max-w-4xl py-10 md:py-16">
      <Seo title={page.title} description={page.intro} />
      <Link to="/" className="text-link mb-7 text-xs">
        <ArrowLeft size={14} aria-hidden="true" />
        Back to home
      </Link>
      <p className="eyebrow">The details, clearly stated</p>
      <h1 className="mt-4 leading-tight">{page.title}</h1>
      <p className="mt-5 max-w-prose text-ink-500">{page.intro}</p>
      <p className="mb-8 mt-4 text-xs text-ink-500">
        Last updated:{" "}
        <time dateTime={site.legalUpdated}>
          {format(parseISO(site.legalUpdated), "MMMM d, yyyy")}
        </time>
      </p>
      {page.draft && (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-5 text-sm">
          <FileText
            className="mt-0.5 shrink-0 text-brand-600"
            size={18}
            aria-hidden="true"
          />
          <p>
            Draft template. Legal entity, governing law, retention, and provider
            details must be completed and reviewed by qualified counsel before
            public launch.
          </p>
        </div>
      )}
      <article className="prose-content">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p className="whitespace-pre-line break-words">{section.text}</p>
          </section>
        ))}
      </article>
      <div className="mt-12 border-t border-line pt-6">
        <Link to="/contact" className="text-link">
          Questions? Contact us
        </Link>
      </div>
    </Container>
  );
}
