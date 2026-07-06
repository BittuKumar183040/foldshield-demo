"use client"
import { useEffect, useRef } from "react";
import * as $3Dmol from "3dmol";
import { Theme } from "../SlidingPillToggle";

const PDBModels = ({ model }: { model: string }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const saved = localStorage.getItem("theme") as Theme;

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
      backgroundColor: saved === "dark" ? "black" : "white"
    });

    fetch(model)
      .then((res) => res.text())
      .then((pdbData) => {
        viewer.addModel(pdbData, "pdb");
        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
        viewer.zoomTo();
        viewer.render();
      });

    return () => {
      container.removeEventListener("wheel", preventZoom);
      viewer.clear();
    };
  }, [model, saved]);

  return (
    <div className="relative w-full h-96 md:h-[600px] rounded-3xl overflow-hidden">
      <div ref={viewerRef} className="absolute inset-0" />
    </div>
  );
};

export default PDBModels;
