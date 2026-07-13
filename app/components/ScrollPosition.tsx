'use client'

import { useEffect, useState, useCallback, useRef } from "react";

export function useScrollPosition(containerRef?: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = containerRef?.current;

    const scrollTop = el ? el.scrollTop : window.scrollY;
    const scrollHeight = el
      ? el.scrollHeight - el.clientHeight
      : document.documentElement.scrollHeight - window.innerHeight;

    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    setProgress(Math.min(100, Math.max(0, pct)));
  }, [containerRef]);

  useEffect(() => {
    const target: HTMLElement | Window = containerRef?.current ?? window;

    handleScroll();
    target.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      target.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerRef, handleScroll]);

  return progress;
}

interface ScrollProgressBarProps {
  /** Optional ref to a scrollable container. Defaults to the whole page. */
  containerRef?: React.RefObject<HTMLElement>;
  /** Bar thickness in pixels. Default 4. */
  height?: number;
  /** CSS color for the filled portion. */
  color?: string;
  /** CSS color for the track. Defaults to transparent. */
  trackColor?: string;
  /** z-index of the bar. Default 9999. */
  zIndex?: number;
  className?: string;
  /** Diameter in pixels of the hover indicator circle. Default 12. */
  handleSize?: number;
  /** Height in pixels of the invisible hit area around the thin bar, so it's easy to hover/click. Default 16. */
  hitAreaHeight?: number;
  /** Scroll behavior when clicking/dragging on the bar. Default "smooth". */
  scrollBehavior?: ScrollBehavior;
}

export function ScrollProgressBar({
  containerRef,
  height = 2,
  color = "#d89267",
  trackColor = "transparent",
  zIndex = 9999,
  className = "rounded-full",
  handleSize = 8,
  hitAreaHeight = 10,
  scrollBehavior = "smooth",
}: ScrollProgressBarProps) {
  const progress = useScrollPosition(containerRef);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentFromEvent = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(100, Math.max(0, (x / rect.width) * 100));
  }, []);

  const scrollToPercent = useCallback(
    (pct: number) => {
      const el = containerRef?.current;
      if (el) {
        const target = (el.scrollHeight - el.clientHeight) * (pct / 100);
        el.scrollTo({ top: target, behavior: scrollBehavior });
      } else {
        const target =
          (document.documentElement.scrollHeight - window.innerHeight) * (pct / 100);
        window.scrollTo({ top: target, behavior: scrollBehavior });
      }
    },
    [containerRef, scrollBehavior]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const pct = percentFromEvent(e.clientX);
      setHoverPercent(pct);
      if (isDragging) scrollToPercent(pct);
    },
    [percentFromEvent, isDragging, scrollToPercent]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverPercent(null);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      scrollToPercent(percentFromEvent(e.clientX));
    },
    [percentFromEvent, scrollToPercent]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleUp = () => setIsDragging(false);
    const handleMove = (e: MouseEvent) => scrollToPercent(percentFromEvent(e.clientX));

    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [isDragging, percentFromEvent, scrollToPercent]);

  const displayPercent = hoverPercent ?? progress;

  return (
    <div
      ref={trackRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      role="slider"
      tabIndex={0}
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress, click or drag to jump to a position"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: hitAreaHeight,
        zIndex,
        cursor: "pointer",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {/* Visual track + fill, flush against the very top edge */}
      <div
        className={className}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height,
          backgroundColor: trackColor,
          pointerEvents: "none",
        }}
      >
        <div
          className={className}
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: color,
            transition: isDragging ? "none" : "width 100ms ease-out",
          }}
        />
      </div>

      {/* Hover/drag handle: a half-circle hanging flush beneath the line */}
      {hoverPercent !== null && (
        <div
          style={{
            position: "absolute",
            left: `${displayPercent}%`,
            top: height-height/2,
            transform: "translateX(-50%)",
            width: handleSize,
            height: handleSize / 2,
            borderRadius: `0 0 ${handleSize / 2}px ${handleSize / 2}px`,
            backgroundColor: color,
            boxShadow: "0 1px 2px rgba(0,0,0,0.35)",
            pointerEvents: "none",
            transition: isDragging ? "none" : "left 60ms ease-out",
          }}
        />
      )}
    </div>
  );
}


export default ScrollProgressBar;