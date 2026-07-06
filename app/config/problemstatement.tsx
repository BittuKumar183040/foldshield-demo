import { ReactNode } from "react";

export interface ProblemExample {
  title: string;
  desc: string;
  outcome: string;
}

export interface ProblemStatementContent {
  label: string;
  meshUrl: string;
  heading: ReactNode;
  paragraphs: ReactNode[];
  examples: ProblemExample[];
  conclusion: {
    intro: ReactNode;
    muted: ReactNode;
    highlight: ReactNode;
    ending: ReactNode;
  };
}

export const problemStatement: ProblemStatementContent = {
  label: "Problem Statement",
  meshUrl: "/mesh/4H1W.pdb",
  heading:
    "A single mutation can abolish a protein's function while TM-score stays above 0.97.",

  paragraphs: [
    <>
      TM-score, RMSD, and LDDT are foundational tools. But they share a common
      blind spot: they measure coordinate overlap, not structural grammar. When
      geometry barely changes but function does—which is precisely the case in
      the most clinically important mutations—these tools return a false
      negative.
    </>,
  ],

  examples: [
    {
      title: "KRAS ‎ ‎ G12C",
      desc: "TM-score > 0.97, RMSD < 1 Å.",
      outcome: "Switch-I dynamics altered. Drug target.",
    },
    {
      title: "BRCA1 ‎ ‎ C61G",
      desc: "TM-score ≈ 0.93.",
      outcome: "Zinc coordination destroyed. E3 ligase activity abolished.",
    },
    {
      title: "SERCA + SLN",
      desc: "TM-score barely moves.",
      outcome: "Regulatory function fundamentally shifted.",
    },
  ],

  conclusion: {
    intro: "In each case,",
    muted: " geometry says nothing changed.",
    highlight: "Biology says everything changed.",
    ending:
      " FoldShield++ reads the structural grammar — not just the coordinates.",
  },
};
