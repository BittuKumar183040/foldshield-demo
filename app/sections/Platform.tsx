"use client";
import { ContainerScroll } from "../components/ui/container-scroll-animation";

const PlatformSlider = () => {

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll titleComponent={<></>}>
        <img
          src={`/platform/platform-light.png`}
          alt="Platform Preview"
          className="w-full h-auto block dark:hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 100%)",
          }}
        />
        <img
          src={`/platform/platform-dark.png`}
          alt="Platform Preview"
          className="w-full h-auto hidden dark:block"
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