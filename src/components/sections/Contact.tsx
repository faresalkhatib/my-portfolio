import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { Mail, MapPin, ArrowUpRight, Phone, Send } from "lucide-react";
import LinkedinIcon from "../common/LinkedinIcon";
import { useState } from "react";

// ─── Social Link ──────────────────────────────────────────────────────────────
function SocialLink({
  href,
  icon: Icon,
  label,
  sublabel,
  color,
  iconColor,
  delay,
  copyValue,
}: {
  href?: string;
  icon: React.ElementType;
  label: string;
  sublabel: string;
  color: string;
  iconColor: string;
  delay: number;
  copyValue?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (copyValue) {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isExternal =
    href && (href.startsWith("http") || href.startsWith("https"));
  const Component = href && !copyValue ? motion.a : motion.button;

  return (
    <Component
      {...(href && !copyValue ? { href } : {})}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={handleClick}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="w-full group flex items-center justify-center gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300"
    >
      <div
        className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-all shrink-0`}
      >
        <Icon size={20} className={iconColor} />
      </div>

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <p className="text-white font-medium text-sm">
          {copied ? "Copied!" : label}
        </p>
        <p className="text-slate-500 text-xs truncate">{sublabel}</p>
      </div>

      <ArrowUpRight
        size={16}
        className="text-slate-600 group-hover:text-white transition-colors shrink-0 hidden sm:block"
      />
    </Component>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Contact() {
  const email = "faresalk232@gmail.com";
  const subject = encodeURIComponent("Opportunity / Project Inquiry");
  const body = encodeURIComponent(`Hi Fares,

I came across your portfolio and wanted to reach out regarding...

Name:
Company:
`);

  return (
    <section id="contact" className="py-24 sm:py-32 relative w-full">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      <SectionHeading
        title="Get In Touch"
        subtitle="Looking for new opportunities in Jordan and the GCC region. Open to remote roles too."
        align="center"
      />

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {/* Main Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Let&apos;s build something together.
            </h3>

            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10 text-sm sm:text-base">
              Whether you want to discuss a{" "}
              <span className="text-indigo-400 font-medium">
                full-stack role
              </span>
              , collaborate on a project, or ask about{" "}
              <span className="text-indigo-400 font-medium">Sentinel-AI</span>,
              feel free to reach out directly.
            </p>

            {/* Contact Links */}
            <div className="space-y-4 max-w-xl mx-auto mb-10 w-full">
              <SocialLink
                copyValue="faresalk232@gmail.com"
                icon={Mail}
                label="Copy Email"
                sublabel="faresalk232@gmail.com"
                color="bg-indigo-500/15"
                iconColor="text-indigo-400"
                delay={0.1}
              />

              <SocialLink
                copyValue="+962786125882"
                icon={Phone}
                label="Copy Phone"
                sublabel="+962 786 125 882"
                color="bg-emerald-500/15"
                iconColor="text-emerald-400"
                delay={0.2}
              />

              <SocialLink
                href="https://linkedin.com/in/fares-alkhatib-4497b1208"
                icon={LinkedinIcon}
                label="LinkedIn"
                sublabel="Connect professionally"
                color="bg-blue-500/15"
                iconColor="text-blue-400"
                delay={0.3}
              />
            </div>

            {/* Email CTA */}
            <motion.a
              href={`mailto:${email}?subject=${subject}&body=${body}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
            >
              <Send size={20} />
              <span>Send Email</span>
            </motion.a>
          </div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800"
          >
            <div className="p-3 rounded-xl bg-indigo-500/15 text-indigo-400 shrink-0">
              <MapPin size={20} />
            </div>

            <div className="text-center sm:text-left">
              <p className="text-white font-medium text-sm">Amman, Jordan</p>
              <p className="text-slate-500 text-xs">
                Open to remote & relocation
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-28 pt-10 border-t border-slate-800/50"
      >
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-slate-600 px-4 text-center">
          <p>© 2026 Fares Hosam Alkhatib. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with
            <span className="text-indigo-400">React</span>+
            <span className="text-cyan-400">TypeScript</span>+
            <span className="text-sky-400">Tailwind</span>
          </p>
        </div>
      </motion.footer>
    </section>
  );
}
