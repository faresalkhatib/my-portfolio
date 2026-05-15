import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeading from "../common/SectionHeading";
import {
  ExternalLink,
  ArrowUpRight,
  Shield,
  Eye,
  Database,
  Home,
} from "lucide-react";
import GithubIcon from "../common/GithubIcon";

const projectList = [
  {
    title: "Sentinel-AI",
    type: "AI Security",
    desc: "A supervised ML framework detecting web attacks. Replaced static regex with Neural Networks to generalize across multi-layered payloads.",
    metrics: "94%+ Detection Accuracy",
    tags: ["Python", "Neural Networks", "Scikit-learn"],
    icon: Shield,
    color: "from-red-500/30 to-orange-500/30",
    borderColor: "border-red-500/30",
    iconColor: "text-red-400",
    accentColor: "bg-red-500",
    features: [
      "Real-time threat detection",
      "Neural Network classification",
      "Multi-layer payload analysis",
    ],
  },
  {
    title: "Visual Image Search",
    type: "Computer Vision",
    desc: "ML similarity pipeline using EfficientNet for feature extraction on 5,000+ images with approximate nearest-neighbor search.",
    metrics: "Sub-50ms Query Time",
    tags: ["PyTorch", "KDTree", "NumPy"],
    icon: Eye,
    color: "from-blue-500/30 to-indigo-500/30",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    accentColor: "bg-blue-500",
    features: [
      "EfficientNet feature extraction",
      "Approximate NN search",
      "5K+ image dataset",
    ],
  },
  {
    title: "Dorm Rental Platform",
    type: "Full-Stack",
    desc: "Multi-role platform serving landlords and students with real-time booking and isolated dashboards.",
    metrics: "3 User Roles",
    tags: ["PHP", "MySQL", "Bootstrap"],
    icon: Home,
    color: "from-emerald-500/30 to-teal-500/30",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    accentColor: "bg-emerald-500",
    features: [
      "Real-time booking system",
      "Role-based access control",
      "Isolated dashboards",
    ],
  },
  {
    title: "Data Pipeline Engine",
    type: "Backend",
    desc: "High-performance ETL pipeline processing millions of records with real-time analytics and automated reporting.",
    metrics: "1M+ Records/Day",
    tags: ["Node.js", "MongoDB", "Redis"],
    icon: Database,
    color: "from-purple-500/30 to-pink-500/30",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    accentColor: "bg-purple-500",
    features: [
      "Real-time processing",
      "Automated reporting",
      "Redis caching layer",
    ],
  },
];

// 3D Tilt Card Component
function TiltCard({
  project,
  index,
}: {
  project: (typeof projectList)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const Icon = project.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -80, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full"
    >
      <div
        className={`relative h-full p-8 sm:p-10 rounded-3xl bg-gradient-to-br ${project.color} border ${project.borderColor} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background glow on hover */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 ${project.accentColor}/20 rounded-full blur-3xl transition-all duration-500 group-hover:opacity-100 opacity-60`}
        />

        {/* Project Image Placeholder */}
        <div className="relative mb-8 rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800 aspect-video group-hover:border-slate-700 transition-colors">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`p-4 rounded-2xl bg-slate-800/80 ${project.iconColor} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon size={40} />
            </div>
          </div>
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-950/60 flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <ExternalLink size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <GithubIcon size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <span
            className={`text-xs font-bold uppercase tracking-widest ${project.iconColor}`}
          >
            {project.type}
          </span>
          <span
            className={`text-[10px] ${project.accentColor}/20 ${project.iconColor} px-3 py-1.5 rounded-full border ${project.borderColor} font-semibold`}
          >
            {project.metrics}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {project.desc}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {project.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 text-xs text-slate-500"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${project.accentColor}`}
              />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-slate-500 font-semibold px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowUpRight className={`w-5 h-5 ${project.iconColor}`} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <SectionHeading
        title="Featured Work"
        subtitle="Bringing AI and Full-Stack development together."
        align="center"
      />

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto"
        style={{ perspective: "1000px" }}
      >
        {projectList.map((project, i) => (
          <TiltCard key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* View All Projects CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center"
      >
        <motion.a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 border border-slate-700 text-slate-300 font-medium rounded-2xl hover:border-indigo-500/50 hover:text-white transition-all group"
        >
          <GithubIcon size={20} />
          <span>View All Projects</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="group-hover:text-indigo-400"
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
