import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MapPin, Mail, ChevronDown, Code2, Terminal, Cpu } from "lucide-react";
import GithubIcon from "../common/GithubIcon";
import LinkedinIcon from "../common/LinkedinIcon";

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return displayed;
}

// Floating icon component
function FloatingIcon({
  icon: Icon,
  delay,
  x,
  y,
  size = 24,
  color = "indigo",
}: {
  icon: React.ElementType;
  delay: number;
  x: string;
  y: string;
  size?: number;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.15, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "backOut" }}
      className={`absolute text-${color}-400`}
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      >
        <Icon size={size} />
      </motion.div>
    </motion.div>
  );
}

// Gradient text component
function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

// Social button with glow effect
function SocialButton({
  href,
  icon: Icon,
  label,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{
        scale: 1.15,
        y: -2,
        boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative p-3.5 bg-slate-900/80 border border-slate-700/50 rounded-2xl hover:border-indigo-500/50 transition-all duration-300"
      aria-label={label}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors relative z-10" />
    </motion.a>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const typewriterText = useTypewriter(
    "Full-Stack Developer specializing in high-performance web applications and AI-driven security solutions.",
    30,
    800,
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-16"
    >
      {/* Floating background icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingIcon icon={Code2} delay={1.2} x="85%" y="15%" size={32} />
        <FloatingIcon
          icon={Terminal}
          delay={1.5}
          x="10%"
          y="25%"
          size={28}
          color="purple"
        />
        <FloatingIcon
          icon={Cpu}
          delay={1.8}
          x="75%"
          y="70%"
          size={36}
          color="pink"
        />
        <FloatingIcon
          icon={Code2}
          delay={2.1}
          x="5%"
          y="75%"
          size={24}
          color="indigo"
        />
        <FloatingIcon
          icon={Terminal}
          delay={2.4}
          x="90%"
          y="50%"
          size={20}
          color="purple"
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-5xl mx-auto text-center px-4"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8 flex-wrap"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            <MapPin size={16} className="animate-bounce" />
            <span>Amman, Jordan</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </span>
        </motion.div>

        {/* Main heading with staggered animation */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.95]">
              <span className="block text-white">FARES</span>
              <span className="block">
                <GradientText>HOSAM</GradientText>
              </span>
              <span className="block text-slate-500">ALKHATIB</span>
            </h1>
          </motion.div>
        </div>

        {/* Typewriter description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 leading-relaxed min-h-[3.5rem]">
            {typewriterText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block w-0.5 h-6 bg-indigo-400 ml-1 align-middle"
            />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(99, 102, 241, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl overflow-hidden transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">View My Work</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-slate-700 text-slate-300 font-medium rounded-2xl hover:border-indigo-500/50 hover:text-white transition-all"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          <SocialButton
            href="https://linkedin.com/in/fares-hosam"
            icon={LinkedinIcon}
            label="LinkedIn"
            delay={1.5}
          />
          <SocialButton
            href="mailto:faresalk232@gmail.com"
            icon={Mail}
            label="Email"
            delay={1.6}
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Decorative gradient orb */}
      <div className="absolute -right-32 top-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -left-32 bottom-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
