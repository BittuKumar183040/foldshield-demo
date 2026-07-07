"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Component } from "ngl";
import { Theme } from "../SlidingPillToggle";

interface PDBModelsProps {
  model: string;
  nomouse?: boolean;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export default function PDBModels({
  model,
  nomouse = false,
  autoRotate = false,
}: PDBModelsProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as Theme)
      : "light";

  const preventPageScroll = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };


  useEffect(() => {
    if (!viewerRef.current || !model) return;

    viewerRef.current.addEventListener("wheel", preventPageScroll, { passive: false });

    let disposed = false;
    setLoading(true);
    setError(null);

    viewerRef.current.innerHTML = "";

    const stage = new Stage(viewerRef.current, {
      backgroundColor: theme === "dark" ? "black" : "white",
    });

    stageRef.current = stage;

    stage.setParameters({
      quality: "high",
      sampleLevel: 2,
      cameraFov: 35,
      clipNear: 0
    });

    async function loadProtein() {
      try {
        
        const res = await fetch(model);
        if (!res.ok) throw new Error(`Unable to fetch PDB (${res.status})`);

        const pdbText = await res.text();

        if (pdbText.trim().startsWith("<")) {
          throw new Error(
            "Fetched file looks like HTML, not a PDB file — check the model URL/path."
          );
        }

        if (disposed) return;

        const blob = new Blob([pdbText], { type: "text/plain" });

        const component = await stage.loadFile(blob, {
          ext: "pdb",
          defaultRepresentation: false,
        }) as Component;

        if (disposed || !component) return;

        component.addRepresentation("cartoon", {colorScheme: "chainid",quality: "high",smoothSheet: true });
        component.addRepresentation("ball+stick", {sele: "hetero and not water",colorScheme: "element",multipleBond: true });
        component.addRepresentation("spacefill", {sele: "water",color: "red",scale: 0.25,opacity: 0.6 });

        component.autoView(0);
        stage.autoView(0);
        stage.mouseControls.remove("hoverPick")
        stage.viewer.requestRender();

        if (autoRotate) {
          stage.setSpin(true);
        }

        setLoading(false);
      } catch (e) {
        if (disposed) return;
        console.error("Failed loading PDB:", e);
        setError(e instanceof Error ? e.message : "Failed to load structure");
        setLoading(false);
      }
    }

    loadProtein();

    if (nomouse) {
      viewerRef.current.style.pointerEvents = "none";
      stage.mouseControls.clear();
    }

    const resizeObserver = new ResizeObserver(() => stage.handleResize());
    resizeObserver.observe(viewerRef.current);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      stage.setSpin(false);
      stage.dispose();
      viewerRef?.current?.removeEventListener("wheel", preventPageScroll, {
        capture: true,
      });
    };
  }, [model, autoRotate, nomouse, theme]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-3xl md:h-[600px]">
      <div ref={viewerRef} className="absolute inset-0" />

      {loading && !error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-400">Loading structure…</span>
        </div>
      )}

      {error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
}