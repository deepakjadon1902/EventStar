import { site } from "../config/site";
export interface LegalSection {
  heading: string;
  text: string;
}
export interface LegalDocument {
  title: string;
  intro: string;
  draft?: boolean;
  sections: LegalSection[];
}
export const legalDocuments: Record<string, LegalDocument> = {
  disclaimer: {
    title: "Disclaimer & Trademark Notice",
    intro:
      "How to use our event information, and how we respect third-party names and marks.",
    sections: [
      {
        heading: "Information accuracy",
        text: 'Event information is compiled from publicly available sources and the organizers’ own websites and is provided "as is" for general information. Dates, locations, formats, and availability can change. Always confirm details with the official organizer before making travel or purchase decisions. We do not guarantee that information is complete, current, or error-free.',
      },
      {
        heading: "Third-party marks",
        text: "All third-party names, trademarks, and logos belong to their respective owners. Their use here is nominative and does not imply any affiliation, sponsorship, or endorsement.",
      },
      {
        heading: "External links",
        text: "Links lead to third-party websites that we do not control; we are not responsible for their content or practices.",
      },
      {
        heading: "No ticketing",
        text: "We do not sell tickets or act as an agent for any event organizer.",
      },
      {
        heading: "Corrections",
        text: `Organizers may request a correction or removal at ${site.email}; we aim to respond within 5 business days.`,
      },
    ],
  },
  "creator-terms": {
    title: "Creator Program Terms",
    intro:
      "The terms for taking part in our independent creator coverage program.",
    draft: true,
    sections: [
      {
        heading: "1. Nature of programme",
        text: "The programme connects independent creators with listed events. Participation is voluntary and does not create employment, agency, partnership, or joint-venture relationships.",
      },
      {
        heading: "2. No guarantee of access",
        text: "Press/creator credentials are granted solely by event organizers. We do not guarantee accreditation, travel support, or compensation.",
      },
      {
        heading: "3. Independence & ownership",
        text: "Creators retain ownership of their content and editorial independence. Creators grant us a limited, non-exclusive licence to link to or feature excerpts of their public work, only with their permission.",
      },
      {
        heading: "4. Disclosure",
        text: "Creators must disclose sponsorships, gifts, or compensation in line with applicable laws (e.g., FTC Endorsement Guides in the USA, ASA/CAP Code in the UK).",
      },
      {
        heading: "5. Conduct",
        text: "Creators must follow each event’s code of conduct, filming/photography rules, and embargo terms, and must not misrepresent affiliation with us or with any organizer.",
      },
      {
        heading: "6. Compensation",
        text: "Unless agreed in writing, participation is unpaid.",
      },
      {
        heading: "7. Termination",
        text: "We may decline or withdraw participation for breach of these terms.",
      },
      {
        heading: "8. Liability",
        text: "To the maximum extent permitted by law, we are not liable for indirect or consequential losses arising from participation. Nothing limits liability that cannot be excluded by law.",
      },
      { heading: "9. Governing law", text: site.governingLaw },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "What information this site handles and the choices available to you.",
    draft: true,
    sections: [
      {
        heading: "Data controller & contact",
        text: `The data controller is ${site.legalCompanyName}. For privacy requests or data protection contact information, contact ${site.email}. The controller’s address and any required DPO details must be added before public launch.`,
      },
      {
        heading: "What we collect",
        text: "When a live form endpoint is configured, creator applications collect name, email, country, public channel and portfolio links, creator type, optional audience range, selected events, application text, and consent confirmations. Contact messages collect name, email, topic, and message. Hosting and form providers may process basic technical request information. We do not use analytics in this version.",
      },
      {
        heading: "Demo forms",
        text: "Without a configured endpoint, forms run in clearly labelled demo mode. No submission is transmitted or saved. Application data is never placed in localStorage. Development builds may print a demo payload to the developer console; production builds do not log personal data.",
      },
      {
        heading: "Why we process information & legal bases",
        text: "Information submitted to live forms is used to review creator applications, respond to inquiries, maintain accurate listings, and manage program participation. Depending on the activity and applicable law, the legal basis is your consent, our legitimate interests in handling requests, or steps taken at your request before an agreement. We do not use application information for unrelated marketing.",
      },
      {
        heading: "Retention",
        text: `Application retention period: ${site.retention}. Contact-message retention and technical-log retention must be specified before live collection begins. Information should be deleted when it is no longer needed for the stated purpose, subject to applicable legal requirements.`,
      },
      {
        heading: "Sharing & processors",
        text: "When enabled, hosting and form providers process information needed to operate this service. The chosen form provider, hosting processor, and any relevant sub-processors must be identified before live collection begins. We do not sell personal data or share it for cross-context behavioral advertising. Information is not sent to event organizers automatically by this frontend.",
      },
      {
        heading: "International transfers & safeguards",
        text: "Providers may process information in countries outside your own. Before live collection begins, the controller must identify processing locations and any required transfer mechanisms, such as adequacy decisions, standard contractual clauses, or other safeguards required by applicable law.",
      },
      {
        heading: "Your rights",
        text: `Depending on your location, you may have rights to access, correct, erase, or receive a portable copy of your information; restrict or object to processing; and withdraw consent. UK and EU residents may complain to their supervisory authority. California residents may exercise applicable CCPA/CPRA rights, including correction, deletion, access, and non-discrimination. We do not sell or share personal data as described above. Where China’s PIPL applies, relevant access, correction, deletion, consent withdrawal, and explanation rights are respected. Send requests to ${site.email}.`,
      },
      {
        heading: "Cookies & analytics",
        text: "This version uses no cookies, tracking scripts, or third-party analytics. Fonts are self-hosted. If non-essential cookies or analytics are introduced, this policy and any required consent controls will be updated before they are activated.",
      },
      {
        heading: "Children",
        text: "This service is not directed to children under 16. Do not submit a creator application if you are under 16. Contact us if you believe a child has provided personal information.",
      },
      {
        heading: "Security",
        text: "Reasonable technical and organizational measures should protect information handled by live service providers. No internet transmission or storage method can be guaranteed completely secure. Never include sensitive documents, passwords, or payment details in these forms.",
      },
      {
        heading: "Changes & contact",
        text: `Changes will be reflected by the date on this page. Questions and privacy requests can be sent to ${site.email}.`,
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    intro: "The conditions for using this independent event directory.",
    draft: true,
    sections: [
      {
        heading: "Acceptance",
        text: `By using this site, you agree to these terms. The site is provided by ${site.legalCompanyName}. If you do not agree, please stop using it.`,
      },
      {
        heading: "Permitted use",
        text: "Use the directory to discover events, read public information, and contact us. Do not interfere with its operation, submit misleading information, impersonate another person, or use it unlawfully. You are responsible for confirming event details with organizers.",
      },
      {
        heading: "Intellectual property",
        text: "Our original site design and text belong to the relevant rights holders. Third-party event names, marks, and materials belong to their owners and are used for identification only. Listings do not grant rights to reproduce third-party materials or imply affiliation.",
      },
      {
        heading: "Third-party content & links",
        text: "Listed events and external websites are controlled by their respective organizers and operators. Their own terms, privacy notices, registration rules, and availability apply. We do not sell tickets, collect ticket payments, or act as an organizer’s agent.",
      },
      {
        heading: "Disclaimer of warranties",
        text: 'Information is supplied "as is" and "as available" for general information. To the extent permitted by law, we give no warranty that the directory is complete, current, uninterrupted, or error-free. Confirm dates, venues, formats, and access directly with the organizer.',
      },
      {
        heading: "Limitation of liability",
        text: "To the maximum extent permitted by law, we are not liable for indirect or consequential losses arising from use of the site or reliance on event information. Nothing in these terms excludes or limits liability or statutory rights that cannot lawfully be excluded or limited.",
      },
      {
        heading: "Indemnity",
        text: "To the extent permitted by applicable law, you are responsible for losses arising from your unlawful use of the site, infringement of another party’s rights, or material breach of these terms. This clause does not limit protections that apply to consumers by law.",
      },
      {
        heading: "Changes to the service & terms",
        text: "We may update listings, correct errors, change features, or revise these terms. The updated date appears on this page. Material changes affecting live services should be communicated as required by law.",
      },
      { heading: "Governing law", text: site.governingLaw },
      {
        heading: "Contact",
        text: `Questions about these terms can be sent to ${site.email}.`,
      },
    ],
  },
  accessibility: {
    title: "Accessibility Statement",
    intro: "We aim to make this calendar usable by as many people as possible.",
    sections: [
      {
        heading: "Our approach",
        text: "The site is designed toward WCAG 2.2 AA: semantic headings and landmarks, keyboard navigation, visible focus, labelled forms, text alongside status colors, and layouts that adapt to narrow screens.",
      },
      {
        heading: "Using the site",
        text: "Use the skip link to reach the main content. The mobile menu supports keyboard access and Escape to close. Event filters use native inputs and selects, and form errors are presented next to the relevant fields.",
      },
      {
        heading: "Motion & external content",
        text: "Reduced-motion preferences disable decorative transitions and animations. External organizer websites have their own accessibility practices, which we do not control.",
      },
      {
        heading: "Feedback",
        text: `If you encounter a barrier, contact ${site.email} with the page and a description of the problem. Formal accessibility conformance has not yet been independently audited.`,
      },
    ],
  },
  conduct: {
    title: "Creator Code of Conduct",
    intro: "Clear expectations for respectful, independent event coverage.",
    sections: [
      {
        heading: "Respect people",
        text: "Treat attendees, speakers, staff, and other creators respectfully. Harassment, discrimination, intimidation, and unwanted recording are not acceptable. Follow the organizer’s code of conduct.",
      },
      {
        heading: "Report accurately",
        text: "Distinguish reporting from opinion. Check facts, respect embargoes, correct mistakes, and do not misrepresent your identity, access, or affiliations.",
      },
      {
        heading: "Film & photograph responsibly",
        text: "Follow venue and event rules. Respect consent, restricted areas, privacy, and requests not to be recorded. Obtain permission where required.",
      },
      {
        heading: "Disclose relationships",
        text: "Clearly disclose sponsorships, gifts, paid relationships, and other material connections in line with applicable rules. Do not imply an official relationship with our program or an organizer that does not exist.",
      },
      {
        heading: "Raise concerns",
        text: `Report program concerns to ${site.email}. For immediate issues at a venue, follow the organizer’s reporting and emergency procedures. Participation may be declined or withdrawn for breaches of the program terms.`,
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "No tracking cookies. No analytics scripts. Self-hosted fonts.",
    sections: [
      {
        heading: "This version",
        text: "This frontend does not set cookies or use browser storage for personal information. Filters are represented in the page URL. Forms keep entered information only in the current page state until a submission or page navigation.",
      },
      {
        heading: "External websites",
        text: "Following an external link takes you to a third-party website. That website may use cookies or analytics under its own policies.",
      },
      {
        heading: "Future changes",
        text: "If non-essential cookies or analytics are added, any required consent choices will be offered with equal prominence before those technologies are activated. A manage-cookies control will be provided when relevant.",
      },
    ],
  },
};
