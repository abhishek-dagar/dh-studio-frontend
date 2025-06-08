"use client";

import { motion } from "framer-motion";
import {
    Database,
    Terminal,
    Zap,
    History,
    Layout,
    Table
} from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    title: "Multi-DB Connectivity",
    description: "Connect and manage multiple databases from a single interface",
    icon: Database,
  },
  {
    title: "Advanced Query Interface",
    description: "Write and execute complex queries with ease",
    icon: Terminal,
  },
  {
    title: "Quick Operations",
    description: "Perform database operations with just a few clicks",
    icon: Zap,
  },
  {
    title: "Table Management",
    description: "Efficient table operations and structure management",
    icon: Table,
  },
  {
    title: "Query History",
    description: "Track and reuse your previous database queries",
    icon: History,
  },
  {
    title: "Clean Interface",
    description: "Modern and intuitive user interface design",
    icon: Layout,
  },
];

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, bounce: 0 },
      opacity: { duration: 0.01 }
    }
  }
};

export default function Benefits() {
  // Split benefits into inner and outer orbit groups
  const innerBenefits = benefits.slice(0, 2);
  const outerBenefits = benefits.slice(2, 5);

  return (
    <section className="relative overflow-hidden p-4 lg:py-12">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="bg-gradient-circle-light dark:bg-gradient-circle-dark absolute inset-0" />
        <motion.div
          className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#24B459]/20 blur-3xl dark:bg-[#24B459]/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#63D68D]/20 blur-3xl dark:bg-[#63D68D]/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 px-4 py-1.5"
            >
              <span className="relative flex h-3 w-3 mr-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#24B459] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#24B459]"></span>
              </span>
              <span className="text-sm font-medium text-[#24B459]">
                Powerful Features
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                Why Choose{" "}
                <span className="relative inline-flex">
                  <span className="absolute -inset-1 block rounded-lg bg-gradient-to-r from-[#24B459] to-[#63D68D] blur-lg opacity-20"></span>
                  <span className="relative bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                    Data Hive
                  </span>
                </span>
              </h2>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Experience unparalleled database management with our cutting-edge features
          </motion.p>
        </div>

        {/* Benefits Layout */}
        <div className="relative mx-auto aspect-square max-w-[800px]">
          {/* Orbit Paths */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Inner Orbit */}
            <div className="relative h-[300px] w-[300px] rounded-full border border-dashed border-[#24B459]/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#24B459]/5 to-[#63D68D]/5 blur-lg" />
            </div>
            {/* Outer Orbit */}
            <div className="absolute h-[500px] w-[500px] rounded-full border border-dashed border-[#63D68D]/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#63D68D]/5 to-[#24B459]/5 blur-lg" />
            </div>
          </div>

          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-30">
              <div className="relative h-32 w-32">
                {/* Logo Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#24B459]/20 to-[#63D68D]/20 blur-xl" />
                </div>
                {/* Logo Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Data Hive Logo"
                    width={64}
                    height={64}
                    className="relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>

                  {/* Inner Orbit Benefits */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {innerBenefits.map((benefit, index) => {
            const angle = index * (360 / innerBenefits.length);
            const radius = 150; // 300px diameter / 2
            const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
            
            return (
              <div
                key={benefit.title}
                className="absolute left-1/2 top-1/2 z-20"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <div className="group relative w-24 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/5 p-3 backdrop-blur-lg transition-all duration-300 hover:z-50 hover:scale-110 hover:bg-white/10 dark:bg-gray-800/5">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#24B459]/20 to-[#63D68D]/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <div className="inline-flex rounded-lg bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 p-2">
                      <benefit.icon className="h-5 w-5 text-[#24B459]" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#24B459] dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-2 rounded-lg shadow-lg pointer-events-none">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

                  {/* Outer Orbit Benefits */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {outerBenefits.map((benefit, index) => {
            const angle = index * (360 / outerBenefits.length);
            const radius = 250; // 500px diameter / 2
            const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
            
            return (
              <div
                key={benefit.title}
                className="absolute left-1/2 top-1/2 z-10"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <div className="group relative w-24 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/5 p-3 backdrop-blur-lg transition-all duration-300 hover:z-50 hover:scale-110 hover:bg-white/10 dark:bg-gray-800/5">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#24B459]/20 to-[#63D68D]/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <div className="inline-flex rounded-lg bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 p-2">
                      <benefit.icon className="h-5 w-5 text-[#24B459]" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#24B459] dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-2 rounded-lg shadow-lg pointer-events-none">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
        </div>
      </div>
    </section>
  );
}