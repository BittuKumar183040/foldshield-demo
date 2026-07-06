

export type MediaType = "image" | "video";

export interface WhoItsForItem {
  title: string;
  desc: string;
  hoveredContentURL: string;
  mediaType: MediaType;
}

export const WHO_ITS_FOR: WhoItsForItem[] = [
  {
    title: "Researchers",
    desc: "Interpretable per-signal scores, reproducible benchmarks, and honest AUC numbers on nonredundant datasets. Designed to hold up under peer review.",
    hoveredContentURL: "/solutions/life1.webp",
    mediaType: "image",
  },
  {
    title: "Biotech & Pharma",
    desc: "Mutation impact scoring on clinically relevant genes (BRCA1/2, KRAS, TP53) without molecular dynamics. Faster variant triage, earlier in the pipeline.",
    hoveredContentURL: "/solutions/life1.webp",
    mediaType: "image",
  },
  {
    title: "Platform Builders",
    desc: "Symbolic and topological encodings are discrete and compressible—designed for search and clustering at scale. Runs on top of AlphaFold and ESMFold outputs.",
    hoveredContentURL: "/solutions/life1.webp",
    mediaType: "image",
  },
];
