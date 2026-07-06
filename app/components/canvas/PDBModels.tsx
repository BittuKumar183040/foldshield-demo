"use client";

import { useEffect, useRef } from "react";
import * as $3Dmol from "3dmol";
import { Theme } from "../SlidingPillToggle";

interface PDBModelsProps {
  model: string;
  nomouse?: boolean;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

const PDBModels = ({
  model,
  nomouse = false,
  autoRotate = false,
  rotationSpeed = 1,
}: PDBModelsProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  const saved =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as Theme)
      : "light";

  const preventZoom = (e: WheelEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (!viewerRef.current) return;

    const container = viewerRef.current;

    container.addEventListener("wheel", preventZoom, {
      passive: false,
    });

    const viewer = $3Dmol.createViewer(container, {
      backgroundColor: saved === "dark" ? "black" : "white",
      nomouse,
    });

    fetch(model)
      .then((res) => res.text())
      .then((pdbData) => {
        viewer.addModel(pdbData, "pdb");
        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
        viewer.zoomTo();
        viewer.render();

        if (autoRotate) {
          viewer.spin("y", rotationSpeed);
        }
      });

    return () => {
      container.removeEventListener("wheel", preventZoom);
      viewer.spin(false);
      viewer.clear();
    };
  }, [model, nomouse, autoRotate, rotationSpeed, saved]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-3xl md:h-[600px]">
      <div ref={viewerRef} className="absolute inset-0" />
    </div>
  );
};

export default PDBModels;