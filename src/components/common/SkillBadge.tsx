import { motion } from "framer-motion";

interface SkillBadgeProps {
  skill: string;
  index: number;
  category: string;
}

const categoryColors: Record<
  string,
  { bg: string; border: string; text: string; glow: string }
> = {
  Frontend: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-300",
    glow: "hover:shadow-blue-500/20",
  },
  Backend: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    glow: "hover:shadow-emerald-500/20",
  },
  "AI & Databases": {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-300",
    glow: "hover:shadow-purple-500/20",
  },
};

export default function SkillBadge({
  skill,
  index,
  category,
}: SkillBadgeProps) {
  const colors = categoryColors[category] || categoryColors["Frontend"];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "backOut" }}
      whileHover={{
        scale: 1.1,
        y: -2,
        transition: { duration: 0.2 },
      }}
      className={`inline-flex items-center px-4 py-2 rounded-xl ${colors.bg} ${colors.border} border ${colors.text} text-sm font-medium cursor-default transition-all duration-300 hover:shadow-lg ${colors.glow} hover:border-opacity-60`}
    >
      {skill}
    </motion.span>
  );
}
