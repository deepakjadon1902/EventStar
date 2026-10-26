import { mkdir, stat, writeFile } from "node:fs/promises";
const images = [
  [
    "web-summit.jpg",
    "https://websummit.com/wp-media/2024/11/54133374805_c24a6cbeb2_o-scaled.jpg",
    "Web Summit / Sportsfile",
    "https://websummit.com/",
    "Web Summit, Lisbon. Photography from a previous edition.",
  ],
  [
    "web-summit-community.png",
    "https://websummit.com/wp-media/2026/03/two-attendees-posing-for-selfie-at-web-summit-lisbon-2025-1024x684.png",
    "Web Summit / Sportsfile",
    "https://websummit.com/",
    "Attendees at Web Summit Lisbon 2025.",
  ],
  [
    "oracle-photo.webp",
    "https://www.oracle.com/a/evt/img/sc44-oaiw26-home-mosaic-01.webp",
    "Oracle",
    "https://www.oracle.com/ai-world/",
    "Conversations at Oracle AI World, from a previous edition.",
  ],
  [
    "github.jpg",
    "https://end3r.com/blog/media/universe25-keynote.jpg",
    "Andrzej Mazur / End3r",
    "https://end3r.com/blog/github-universe-2025",
    "GitHub Universe 2025 keynote.",
  ],
  [
    "kubecon.avif",
    "https://events.linuxfoundation.org/wp-content/uploads/2025/07/home-KCCNC_EU_250402_Keynotes_DK_085.jpg",
    "The Linux Foundation / CNCF",
    "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/",
    "KubeCon + CloudNativeCon Europe 2025 keynote. The source serves the image as AVIF.",
  ],
  [
    "aws.png",
    "https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/events/approved/reinvent26/savethedate/video_thumb.6a32095eb5bc1c7a2cb4009af661afecae1c7f7f.png",
    "Amazon Web Services",
    "https://reinvent.awsevents.com/",
    "AWS re:Invent venue photography from the official website.",
  ],
  [
    "aws-community.png",
    "https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/events/approved/reinvent26/home/IMG_builders.53ed32db9acd057bbc51bbfe0a17e3ee58a764ec.png",
    "Amazon Web Services",
    "https://reinvent.awsevents.com/",
    "Attendees learning at AWS re:Invent.",
  ],
  [
    "san-francisco.jpg",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=80",
    "Unsplash",
    "https://unsplash.com/",
    "San Francisco, California. Destination photography.",
  ],
  [
    "london.jpg",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
    "Unsplash",
    "https://unsplash.com/",
    "London, United Kingdom. Destination photography.",
  ],
  [
    "singapore.jpg",
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
    "Unsplash",
    "https://unsplash.com/",
    "Singapore. Destination photography.",
  ],
  [
    "dubai.jpg",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    "Unsplash",
    "https://unsplash.com/",
    "Dubai, United Arab Emirates. Destination photography.",
  ],
];
await mkdir("public/images", { recursive: true });
for (const [file, url] of images) {
  if (!process.argv.includes("--force")) {
    try {
      if ((await stat(`public/images/${file}`)).size > 1000) continue;
    } catch {}
  }
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!r.ok || !r.headers.get("content-type")?.startsWith("image/"))
        throw new Error(`${file}: HTTP ${r.status}`);
      await writeFile(
        `public/images/${file}`,
        new Uint8Array(await r.arrayBuffer()),
      );
      console.log(`Downloaded ${file}`);
      break;
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
}
await writeFile(
  "public/images/credits.json",
  JSON.stringify(
    images.map(([file, url, credit, source, description]) => ({
      file,
      url,
      credit,
      source,
      description,
    })),
    null,
    2,
  ),
);
console.log(`Prepared ${images.length} images and photography credits.`);
