/* eslint-disable @next/next/no-img-element */
"use client";

import { Menu as MenuIcon, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

import Menu from "../components/Menu";
import Button from "../components/Button";
import BrandLogo from "../components/BrandLogo";
import { menuItems } from "../config/navbar";
import Link from "next/link";
import SlidingPillToggle from "../components/SlidingPillToggle";

const Navbar = ({ onlyLogo = false }: { onlyLogo?: boolean }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mobileRef.current) return;

    const el = mobileRef.current;

    if (mobileOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) setMobileOpen(false);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!mobileOpen) return;
      if (!navContainerRef.current) return;

      if (!navContainerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const moveIndicator = (el: HTMLDivElement | null) => {
    if (!el || !indicatorRef.current) return;

    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement!.getBoundingClientRect();

    gsap.to(indicatorRef.current, {
      x: rect.left - parentRect.left,
      width: rect.width - 6,
      opacity: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    if (!indicatorRef.current) return;

    if (pathname === "/") {
      gsap.to(indicatorRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.2,
      });
      return;
    }

    const el = itemRefs.current[pathname];
    moveIndicator(el);
  }, [pathname]);

  const handleMouseLeave = () => {
    if (!indicatorRef.current) return;

    if (pathname === "/") {
      gsap.to(indicatorRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.2,
      });
      return;
    }

    const el = itemRefs.current[pathname];
    moveIndicator(el);
  };

  return (
    <nav
      ref={navContainerRef}
      className="fixed h-14 px-2.5 md:px-2.5 lg:px-25 backdrop-blur-sm flex gap-2 items-center z-50 w-full"
    >
      <BrandLogo />
      {!onlyLogo && (
        <>
          <div className="hidden md:flex flex-1 justify-center">
            <div
              ref={navRef}
              onMouseLeave={handleMouseLeave}
              className="relative flex gap-2 h-10 items-center p-1 bg-white/10 rounded-lg overflow-hidden"
            >
              <div
                ref={indicatorRef}
                className="absolute h-9/12 overflow-hidden rounded-lg bg-white/20 "
                style={{ width: 0, opacity: 0 }}
              >
                {/* <img
                  src="button.gif"
                  alt="Button"
                  className="w-full h-full grayscale-100 opacity-30"
                /> */}
              </div>

              {menuItems.map((item, index) => (
                <Menu
                  key={index}
                  {...item}
                  register={(el, href) => {
                    if (href) itemRefs.current[href] = el;
                  }}
                  onHover={(el) => moveIndicator(el)}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <Link href="/enquiry">
              <Button label="Explore" onClick={() => {}} />
            </Link>
          </div>

          <div className="md:hidden ml-auto dark:text-white">
            <button onClick={() => setMobileOpen((prev) => !prev)}>
              {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

          <div
            ref={mobileRef}
            className="absolute top-full left-0 w-full bg-white dark:bg-black backdrop-blur-sm shadow-md rounded-lg md:hidden overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col gap-4 p-4">
              {menuItems.map((item, index) => (
                <Menu key={index} {...item} />
              ))}
              <div className=" flex gap-2 justify-between items-center">
                <Link href="/enquiry">
                  <Button label="Explore" />
                </Link>
                <SlidingPillToggle />
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
