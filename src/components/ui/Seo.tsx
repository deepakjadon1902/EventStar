import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { site } from "../../config/site";
export default function Seo({
  title,
  description,
  jsonLd,
  noindex = false,
}: {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}) {
  const { pathname } = useLocation();
  const pageTitle = `${title} | ${site.shortName}`;
  const url = `${site.url}${pathname}`;
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        property="og:type"
        content={jsonLd?.["@type"] === "Event" ? "event" : "website"}
      />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={site.name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      )}
    </Helmet>
  );
}
