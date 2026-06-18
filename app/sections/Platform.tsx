"use client";
import { Theme } from "../components/SlidingPillToggle";
import { ContainerScroll } from "../components/ui/container-scroll-animation";

const PlatformSlider = () => {
  const saved =
  typeof window !== "undefined"
    ? (localStorage.getItem("theme") as Theme)
    : "dark";
  const theme = !saved || saved === "dark" ? "dark" : "light";

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll titleComponent={<></>}>
        <img
          src={`/platform/platform-${theme}.png`}
          alt="hero"
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
