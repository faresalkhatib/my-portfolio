import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import SkillBadge from "../common/SkillBadge";
import { Code2, Server, Brain, Sparkles } from "lucide-react";

const skillGroups = [
  {
    category: "Frontend",
    icon: Code2,
    description:
      "Building responsive, interactive user interfaces with modern frameworks",
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "semantic UI",
      "Tailwind CSS",
      "Redux Toolkit",
      "SASS",
      "Next.js",
      "Framer Motion",
    ],
    color: "from-blue-500/30 to-cyan-500/30",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    accentColor: "bg-blue-500",
  },
  {
    category: "Backend",
    icon: Server,
    description: "Scalable server-side solutions and API development",
    skills: [
      "Node.js",
      "Express.js",
      "PHP",
      "Laravel",
      "Firebase",
      "REST APIs",
      "GraphQL",
      "ASP.NET",
    ],
    color: "from-emerald-500/30 to-teal-500/30",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    accentColor: "bg-emerald-500",
  },
  {
    category: "AI & Databases",
    icon: Brain,
    description: "Machine learning models and data architecture",
    skills: [
      "Python",
      "PyTorch",
      "Scikit-learn",
      "MySQL",
      "MsSql",
      "MongoDB",
      "Firestore",
      "Pandas",
    ],
    color: "from-purple-500/30 to-pink-500/30",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    accentColor: "bg-purple-500",
  },
];

// Skill proficiency bars (simulated data)
const proficiencyData: Record<string, number> = {
  "React.js": 95,
  TypeScript: 90,
  "Tailwind CSS": 92,
  "Node.js": 88,
  Python: 85,
  PyTorch: 80,
  MongoDB: 87,
  MySQL: 82,
};

function SkillBar({
  skill,
  proficiency,
  delay,
}: {
  skill: string;
  proficiency: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
          {skill}
        </span>
        <span className="text-xs text-slate-500 font-mono">{proficiency}%</span>
      </div>
      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 relative"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <SectionHeading
        title="Technical Arsenal"
        subtitle="Modern tools I use to build secure, scalable applications."
        align="center"
      />

      {/* Skill Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              delay: idx * 0.15,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br ${group.color} border ${group.borderColor} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10`}
          >
            {/* Hover glow effect */}
            <div
              className={`absolute -top-20 -right-20 w-40 h-40 ${group.accentColor}/20 rounded-full blur-3xl group-hover:opacity-100 opacity-60 transition-all duration-500`}
            />

            <div className="relative z-10">
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900/80 ${group.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <group.icon size={28} />
              </div>

              <h3 className="text-white font-bold text-xl mb-3">
                {group.category}
              </h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                {group.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    index={i}
                    category={group.category}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Proficiency Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-10">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-white font-bold text-lg">Proficiency Levels</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
          {Object.entries(proficiencyData).map(([skill, proficiency], i) => (
            <SkillBar
              key={skill}
              skill={skill}
              proficiency={proficiency}
              delay={i * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Tech Stack Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 overflow-hidden"
      >
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
            Technologies I Work With
          </span>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[
              ...skillGroups.flatMap((g) => g.skills),
              ...skillGroups.flatMap((g) => g.skills),
            ].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="text-slate-600 text-sm font-medium px-4 py-2 rounded-full border border-slate-800/50 hover:border-indigo-500/30 hover:text-slate-400 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
