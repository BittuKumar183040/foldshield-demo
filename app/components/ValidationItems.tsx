"use client";

import {
  ShieldCheck,
  Dna,
  Crosshair,
  Share2,
  Activity,
} from "lucide-react";
import { motion } from "motion/react";

const validationItems = [
  {
    icon: ShieldCheck,
    text: "Structural similarity preserved",
  },
  {
    icon: Dna,
    text: "Mutation impact remains interpretable",
  },
  {
    icon: Crosshair,
    text: "Cross-family separation maintained",
  },
  {
    icon: Share2,
    text: "Symbolic topology remains stable",
  },
  {
    icon: Activity,
    text: "Folding behavior captured without MD simulation",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ValidationSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="mt-2 rounded-2xl border border-[#E8B9A3]/20 dark:bg-black/40 p-4 backdrop-blur-sm"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#D89267]"
      >
        What This Validates
      </motion.h3>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5"
      >
        {validationItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.text}
              variants={itemVariants}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className={`
                group relative flex items-center gap-4 rounded-xl p-3
                transition-all duration-300 hover:bg-[#E8B9A3]/10 hover:shadow-[0_0_30px_rgba(251,146,60,0.08)]
                ${
                  index !== validationItems.length - 1
                    ? "lg:border-r lg:border-orange-400/20 lg:pr-4"
                    : ""
                }
              `}
            >
              <div className="absolute inset-0 rounded-xl bg-orange-400/0 transition-all duration-300 group-hover:bg-[#E8B9A3]/10" />

              <motion.div>
                <Icon
                  size={52}
                  strokeWidth={1.2}
                  className="shrink-0 text-[#E8B9A3] transition-all duration-300 group-hover:text-[#E8B9A3]"
                />
              </motion.div>

              <p className="text-sm leading-relaxed dark:text-white/90 transition-colors duration-300">
                {item.text}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}