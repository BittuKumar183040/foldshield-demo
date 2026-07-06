import { ReactNode } from "react";

export interface ProblemExample {
  title: string;
  description: ReactNode;
}

export interface ProblemStatementContent {
  label: string;
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

  heading:
    "A single mutation can abolish a protein's function while TM-score stays above 0.97.",

  paragraphs: [
    <>
      TM-score, RMSD, and LDDT are foundational tools. But they share a common
      blind spot: they measure coordinate overlap, not structural grammar.
    </>,

    <>
      When geometry barely changes but function does—which is precisely the case
      in the most clinically important mutations—these tools return a false
      negative.
    </>,
  ],

  examples: [
    {
      title: "KRAS G12C",
      description: (
        <>
          TM-score &gt; 0.97, RMSD &lt; 1 Å. Switch-I dynamics altered. Drug
          target.
        </>
      ),
    },
    {
      title: "BRCA1 C61G",
      description: (
        <>
          TM-score ≈ 0.93. Zinc coordination destroyed. E3 ligase activity
          abolished.
        </>
      ),
    },
    {
      title: "SERCA + SLN",
      description: (
        <>TM-score barely moves. Regulatory function fundamentally shifted.</>
      ),
    },
  ],

  conclusion: {
    intro: "In each case,",
    muted: " geometry says nothing changed.",
    highlight: "Biology says everything changed.",
    ending:" FoldShield++ reads the structural grammar—not just the coordinates.",
  },
};
