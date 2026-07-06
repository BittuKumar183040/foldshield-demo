
export const benchmarkLabel = {
  title: "A single mutation can abolish a protein's function while TM-score stays above 0.97",
  desc: "TM-score, RMSD, and LDDT are foundational tools. But they share a common blind spot: they measure coordinate overlap, not structural grammar. When geometry barely changes but function does — which is precisely the case in the most clinically important mutations — these tools return a false negative.",
}

export const meshes = [
  {
    "name": "1AKE",
    "mesh": "/mesh/1AKE.pdb",
    "statsCard": [
      { percentage: "0.894", component: "Pearson Correlation", rate: "With TM-score on curated benchmark" },
      { percentage: "0.998", component: "ROC-AUC", rate: "Fold discrimination on 50-pair benchmark"},
      { percentage: "10 of 12", component: "Killer Pairs Detected", rate: "High-difficulty cases where TM-score gives no signal"},
      { percentage: "0.841", component: "CATH-S20 AUC", rate: "Large-scale fold discrimination on nonredundant dataset"},
      ],
    "statsTable": {
      "Category": [<b key="KRAS">KRAS WT vs G12C</b>, "Interpretation", <b key="BRCA1">BRCA1 WT vs C61G</b>, "Interpretation"],
      "TM-Score": ['0.97 — "Nearly identical',  "No change detected", '0.93 — "Highly similar"',  "Structurally normal"],
      "RMSD":     ["< 1 Å — No signal",         "No change detected", "Small deviation",          "Structurally normal"],
      "FoldShield++": [
        "Topology window shift + entropy spike at P-loop", 
        "Switch-I dynamics altered — known drug target mechanism", 
        "Symbolic entropy spike + motif topology change at coordination site", 
        "Zinc coordination destroyed — E3 ligase activity abolished"
      ],
    },
  },
]











export type Meshes = typeof meshes;
export type Mesh = (typeof meshes)[number];
export type StatsCardItem = Mesh["statsCard"][number];
export type StatsTable = Mesh["statsTable"];