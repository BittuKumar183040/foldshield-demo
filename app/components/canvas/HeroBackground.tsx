'use client'

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: string;
  op: number;
};

const STAR_COUNT = 180;
const MAX_SHIFT = 170;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: 0, y: 0 };
    let targetX = 0;
    let targetY = 0;

    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildStars();
    };

    const buildStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.04,
        hue: Math.random() > 0.8 ? "124,92,255" : "232,234,240",
        op: 0.15 + Math.random() * 0.55,
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.x = (star.x + star.vx + canvas.width) % canvas.width;
        star.y = (star.y + star.vy + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.hue},${star.op})`;
        ctx.fill();
      });
    };

    const layers = Array.from(document.querySelectorAll<HTMLElement>(".layer"));

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let frame = 0;

    const tick = () => {
      mouse.x += (targetX - mouse.x) * 0.055;
      mouse.y += (targetY - mouse.y) * 0.055;

      layers.forEach((layer) => {
        const speed = Number(layer.dataset.speed ?? 0);

        layer.style.transform = `translate(${
          mouse.x * speed * MAX_SHIFT
        }px, ${mouse.y * speed * MAX_SHIFT}px)`;
      });

      drawStars();

      frame = requestAnimationFrame(tick);
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 h-full w-full z-10" />
    </>
  );
}
