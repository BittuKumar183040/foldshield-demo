"use client";

import { useEffect, useState } from "react";

const FADE_MS = 500;

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let raf: number;
    let finished = false;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = 90 * (1 - Math.exp(-elapsed / 1800));
      setProgress((prev) => (finished ? prev : Math.max(prev, eased)));
      if (!finished) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setProgress(100);

      setTimeout(() => setFadingOut(true), 250);
      setTimeout(() => setMounted(false), 250 + FADE_MS);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!mounted) return null;

  const shown = Math.round(progress);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${shown} percent`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.12)",
          borderTopColor: "#d89267",
          animation: "loader-spin 0.9s linear infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 2,
          width: `${progress}%`,
          background: "#d89267",
          transition: "width 120ms linear",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 20,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: 13,
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.65)",
        }}
      >
        {shown.toString().padStart(2, "0")}%
      </div>

      <style jsx>{`
        @keyframes loader-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
