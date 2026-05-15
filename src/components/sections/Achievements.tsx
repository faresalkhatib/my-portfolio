import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { Trophy, Zap, Shield, Search, Users, Clock } from "lucide-react";

type Achievement = {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
  color: string;
  glow: string;
  delay: number;
};

const achievements: Achievement[] = [
  {
    icon: Shield,
    value: "94%+",
    label: "Detection Accuracy",
    description:
      "Sentinel-AI correctly classifies SQL injection, XSS, and XXE attack patterns — hardened via adversarial testing suites.",
    color: "from-indigo-500 to-indigo-700",
    glow: "shadow-indigo-500/20",
    delay: 0,
  },
  {
    icon: Zap,
    value: "~35%",
    label: "API Response Improvement",
    description:
      "Engineered RESTful APIs with Express.js, cutting average response times through query optimization and caching strategies.",
    color: "from-emerald-500 to-emerald-700",
    glow: "shadow-emerald-500/20",
    delay: 0.1,
  },

  {
    icon: Search,
    value: "60%",
    label: "Search Time Reduction",
    description:
      "Built a full-text search and multi-parameter filtering system covering 5 content categories, drastically reducing user search time.",
    color: "from-cyan-500 to-cyan-700",
    glow: "shadow-cyan-500/20",
    delay: 0.3,
  },
  {
    icon: Clock,
    value: "<50ms",
    label: "Image Query Time",
    description:
      "KDTree-based approximate nearest-neighbor search over 5,000+ image embeddings — zero external database dependency.",
    color: "from-pink-500 to-pink-700",
    glow: "shadow-pink-500/20",
    delay: 0.4,
  },
  {
    icon: Trophy,
    value: "12+",
    label: "Screens Redesigned",
    description:
      "Redesigned platform UI across 12+ screens, improving user task completion rate and reducing reported UX friction by ~40%.",
    color: "from-amber-500 to-amber-700",
    glow: "shadow-amber-500/20",
    delay: 0.5,
  },
];

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievement.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: achievement.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`group relative bg-slate-900/50 border border-slate-800 hover:border-slate-700 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl ${achievement.glow}`}
    >
      {/* Subtle gradient top accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-px rounded-t-3xl bg-gradient-to-r ${achievement.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Icon */}
      <div
        className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${achievement.color} bg-opacity-10 mb-5`}
      >
        <Icon size={22} className="text-white" />
      </div>

      {/* Value */}
      <div
        className={`text-4xl font-black bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent mb-1`}
      >
        {achievement.value}
      </div>

      {/* Label */}
      <div className="text-white font-semibold text-sm mb-3">
        {achievement.label}
      </div>

      {/* Description */}
      <p className="text-slate-500 text-sm leading-relaxed">
        {achievement.description}
      </p>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-24 sm:py-32 relative max-w-7xl mx-auto"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      <SectionHeading
        title="Achievements"
        subtitle="Real numbers from real production systems — not estimates."
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((a) => (
          <AchievementCard key={a.label} achievement={a} />
        ))}
      </div>
    </section>
  );
}
