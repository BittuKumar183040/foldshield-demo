import Seperator from "./components/Seperator";
import CoreCapabilities from "./sections/CoreCapabilities";
import FAQSection from "./sections/FAQ";
import Footer from "./sections/Footer";
import HeroSection from "./sections/HeroSection";
import PlatformSlider from "./sections/Platform";
import Benchmarks from "./sections/Benchmarks";
import Navbar from "./sections/Navbar";
import WhoItsFor from "./sections/WhoItsFor";
import ProblemStatement from "./sections/ProblemStatement";

export default function Home() {
  return (<>
    <Navbar />
    <div className="flex flex-col flex-1 items-center justify-center bg-white dark:bg-black">
        <HeroSection />
      <PlatformSlider />
        <Seperator />
      <Benchmarks />
      <ProblemStatement />
      <Seperator />
      <CoreCapabilities />
      <Seperator />
        <WhoItsFor />
      <Seperator />
        <FAQSection />
      <Footer />
    </div>
  </>
  );
}
