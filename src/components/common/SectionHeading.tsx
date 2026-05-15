import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
}: Props) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 sm:mb-16 ${isCenter ? "text-center" : ""}`}
    >
      {/* Label bar */}
      <div
        className={`flex items-center gap-4 mb-4 ${isCenter ? "justify-center" : ""}`}
      >
        {/* Left line — always shown on left, extra line when centered */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shrink-0"
        />

        <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">
          {title}
        </span>

        {/* Right line — shown when centered for symmetry */}
        {isCenter && (
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shrink-0"
          />
        )}
      </div>

      {/* Main heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`text-slate-400 mt-4 max-w-xl text-base sm:text-lg leading-relaxed ${isCenter ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
