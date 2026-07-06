"use client";

import { useEffect, useState } from "react";
import { Theme } from "../components/SlidingPillToggle";
import { ContainerScroll } from "../components/ui/container-scroll-animation";

const PlatformSlider = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "dark";

    setTheme(saved === "light" ? "light" : "dark");
    setMounted(true);
  }, []);


  if (!mounted) {
    return (
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll titleComponent={<></>}>
          <div className="w-full aspect-[16/9]" />
        </ContainerScroll>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll titleComponent={<></>}>
        <img
          src={`/platform/platform-${theme}.png`}
          alt="Platform Preview"
          className="w-full h-auto"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 100%)",
          }}
        />
      </ContainerScroll>
    </div>
  );
};

export default PlatformSlider;