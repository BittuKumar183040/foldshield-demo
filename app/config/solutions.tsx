import { Solution } from "../components/HorizontalEntity";

export const SOLUTIONS: Solution[] = [
  {
    title: "Mutation Impact Detection",
    desc: "Identifies damaging variants by analyzing symbolic divergence and topological shifts—not just coordinate geometry. Detects subtle disruptions that TM-score cannot surface. Validated on BRCA1/2, KRAS, and TP53—the genes where geometry-only tools most frequently fail to explain pathogenicity.",
    images: ["/solutions/life1.webp"],
  },

  {
    title: "Fold Classification and Structural Separation",
    desc: "Classifies proteins using topological invariants and symbolic motifs, enabling clean separation of homologs from analogs. Achieved 0.841 AUC on CATH-S20 large-scale nonredundant benchmark. Supports large-scale annotation of predicted proteomes where geometry-based clustering saturates.",
    images: ["/solutions/life1.webp"],
  },

  {
    title: "Conformational State Detection",
    desc: "Detects the difference between active and inactive states, open and closed conformations, and regulatory-bound versus unbound structures—without molecular dynamics simulation. Validated on adenylate kinase open/closed, GLP-1R activation states, and SERCA with and without sarcolipin.",
    images: ["/solutions/life1.webp"],
  },

  {
    title: "Interpretable Signal Breakdown",
    desc: "Every FoldShield++ score decomposes into four readable signals: braid topology, motif entropy, local topology windows, and persistent homology. You can ask which region diverged, how much, and why—not just whether two structures are different. Designed to complement, not replace, existing scalar stability predictors.",
    images: ["/solutions/life1.webp"],
  },
];