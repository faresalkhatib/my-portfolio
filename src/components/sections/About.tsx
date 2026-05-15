import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SectionHeading from "../common/SectionHeading";
import {
  GraduationCap,
  Briefcase,
  Target,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing function for smooth animation
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isInView, end, duration]);

  return { count, ref };
}

// Stat card component
function StatCard({
  icon: Icon,
  value,
  label,
  suffix = "",
  delay,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}) {
  const { count, ref } = useCounter(value, 2000);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-lg bg-indigo-500/15 text-indigo-400 group-hover:bg-indigo-500/25 transition-colors">
          <Icon size={22} />
        </div>
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
        <span ref={ref}>{count}</span>
        <span className="text-indigo-400">{suffix}</span>
      </div>
      <div className="text-sm text-slate-500">{label}</div>
    </motion.div>
  );
}

// Timeline item
function TimelineItem({
  icon: Icon,
  title,
  subtitle,
  description,
  date,
  isLast = false,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  isLast?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 sm:pl-12 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] sm:left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 to-transparent" />
      )}

      {/* Timeline dot */}
      <motion.div
        whileHover={{ scale: 1.3 }}
        className="absolute left-0 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center z-10"
      >
        <Icon size={14} className="text-indigo-400" />
      </motion.div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300 group">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h4 className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors">
            {title}
          </h4>
          <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-full">
            {date}
          </span>
        </div>
        <p className="text-indigo-400 text-sm font-medium mb-3">{subtitle}</p>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <SectionHeading
        title="Background"
        subtitle="A journey through code, creativity, and continuous growth."
        align="center"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20 max-w-5xl mx-auto">
        <StatCard
          icon={Zap}
          value={35}
          label="API Speed Improvement"
          suffix="%"
          delay={0}
        />
        <StatCard
          icon={TrendingUp}
          value={87}
          label="Client Satisfaction"
          suffix="%"
          delay={0.1}
        />
        <StatCard
          icon={Award}
          value={4}
          label="Featured Projects"
          suffix="+"
          delay={0.2}
        />
        <StatCard
          icon={Target}
          value={1.5}
          label="Years Experience"
          suffix="+"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-6xl mx-auto">
        {/* Left: Bio */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              I am a{" "}
              <span className="text-white font-semibold">
                Full-Stack Developer
              </span>{" "}
              based in{" "}
              <span className="text-indigo-400 font-semibold">
                Amman, Jordan
              </span>
              , With BSc in Computer Science From{" "}
              <span className="text-indigo-400 font-semibold">
                Mutah University
              </span>
              .
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              With professional experience at{" "}
              <span className="text-white font-medium underline decoration-indigo-500/50 underline-offset-4">
                UBTIC
              </span>
              , I build and ship full-stack production systems end-to-end — from
              RESTful API design and database optimization to payment
              integration and access control systems. I've integrated{" "}
              <span className="text-emerald-400 font-semibold">
                Stripe subscription billing
              </span>
              , built credit-based access control System , and most recently
              developed{" "}
              <span className="text-emerald-400 font-semibold">
                Sentinel-AI
              </span>{" "}
              — an ML-powered web attack detection system achieving{" "}
              <span className="text-emerald-400 font-semibold">
                94%+ detection accuracy
              </span>{" "}
              across SQL injection, XSS, and XXE attack patterns.
            </p>
          </div>

          {/* Core Focus Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 p-8 sm:p-10"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 text-8xl font-black text-slate-800/30 italic select-none">
              CS
            </div>

            <h4 className="text-white font-bold text-lg mb-6 relative z-10">
              Core Focus Areas
            </h4>
            <ul className="space-y-5 relative z-10">
              {[
                "Scalable MERN Stack Architectures",
                "AI-Driven Threat Detection",
                "UI/UX Redesign & Optimization",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="w-2.5 h-2.5 bg-indigo-500 rounded-full group-hover:bg-purple-400 transition-colors shrink-0"
                  />
                  <span className="text-slate-300 text-sm sm:text-base group-hover:text-white transition-colors">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Right: Timeline */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-10"
          >
            Experience & Education
          </motion.h3>

          <TimelineItem
            icon={Briefcase}
            title="Full-Stack Developer"
            subtitle="UBTIC"
            description="Shipped production features end-to-end — RESTful APIs, Stripe subscription billing, credit-based access control system, and full-text search across multiple content categories."
            date="june 2025 - Present"
            delay={0}
          />
          <TimelineItem
            icon={GraduationCap}
            title="BSc Computer Science"
            subtitle="Mut'ah University"
            description="Relevant coursework in Algorithms, Database Systems, Machine Learning, and Network Security. Grade: Very Good."
            date="2022 - 2025"
            isLast
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
