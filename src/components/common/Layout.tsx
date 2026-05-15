import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./NavBar";
import CustomCursor from "./CustomCursor.tsx";
import ScrollProgress from "./ScrollProgress.tsx";
import BackToTop from "./BackToTop.tsx";
import { useEffect, useRef } from "react";

// Animated background particles
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 240,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${p.hue}, 80%, 70%, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/40 selection:text-white overflow-x-hidden cursor-none md:cursor-auto">
      {/* Custom Cursor - hidden on mobile */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Multi-layer background */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,#0f0f23_40%,#020617_100%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(at 20% 20%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
              radial-gradient(at 80% 80%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(59, 130, 246, 0.08) 0px, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <ParticleBackground />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-24 sm:pt-32"
      >
        {children}
      </motion.main>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
