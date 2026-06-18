export const meshes = [
  {
    "name": "1AKE",
    "mesh": "/mesh/1AKE.pdb",
    "statsCard": [
      { percentage: "100", component: "Ubiquitin", rate: "TM ≈ 0.9" },
      { percentage: "100", component: "BRCA1 / BRCA2", rate: "Stable Symbolic Seperation"},
      { percentage: "100", component: "KRAS", rate: "Mutation-sensitive validation"},
      { percentage: "100", component: "Cross-Family", rate: "High structural discrimination"},
      ],
    "statsTable": {
      "Category": ["Highly Similar", "Moderate", "Dissimilar"],
      "TM-Score": ["≈ 0.9+", "Moderate-High", "0.2 - 0.3"],
      "Behavioral": ["0.5 - 0.7", "Moderate", "0.1 - 0.3"],
      "Symbolic Topology": ["1.0", "Stable", "≈ 0.1"],
    },
  },
  {
    "name": "1CRN",
    "mesh": "/mesh/1CRN.pdb",
    "statsCard": [
      { percentage: "95", component: "Ubiquitin", rate: "TM ≈ 0.68" },
      { percentage: "75", component: "BRCA1 / BRCA2", rate: "Stable Symbolic Seperation"},
      { percentage: "86", component: "KRAS", rate: "Mutation-sensitive validation"},
      { percentage: "97", component: "Cross-Family", rate: "High structural discrimination"},
      ],
    "statsTable": {
      "Category": ["Highly Similar", "Moderate", "Dissimilar"],
      "TM-Score": ["≈ 0.8+", "Moderate-High", "0.1 - 0.25"],
      "Behavioral": ["0.2 - 0.5", "Moderate", "0.2 - 0.6"],
      "Symbolic Topology": ["2.0", "Stable", "≈ 0.02"],
    },
  },
  {
    "name": "1QLP",
    "mesh": "/mesh/1QLP.pdb",
    "statsCard": [
      { percentage: "95", component: "Ubiquitin", rate: "TM ≈ 0.68" },
      { percentage: "75", component: "BRCA1 / BRCA2", rate: "Stable Symbolic Seperation"},
      { percentage: "86", component: "KRAS", rate: "Mutation-sensitive validation"},
      { percentage: "97", component: "Cross-Family", rate: "High structural discrimination"},
      ],
    "statsTable": {
      "Category": ["Highly Similar", "Moderate", "Dissimilar"],
      "TM-Score": ["≈ 0.8+", "Moderate-High", "0.1 - 0.25"],
      "Behavioral": ["0.2 - 0.5", "Moderate", "0.2 - 0.6"],
      "Symbolic Topology": ["2.0", "Stable", "≈ 0.02"],
    },
  },
]











export type Meshes = typeof meshes;
export type Mesh = (typeof meshes)[number];
export type StatsCardItem = Mesh["statsCard"][number];
export type StatsTable = Mesh["statsTable"];