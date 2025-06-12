"use client";

import { motion } from "framer-motion";
import { HeroIllustrationManager } from "./HeroIllustrationManager";
import {
  SparklesIcon,
  DatabaseIcon,
  CodeIcon,
  ArrowRightIcon,
  ChartIcon,
} from "@/components/icons";
import Link from "next/link";

const FeatureTag = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-1.5 rounded-full bg-[#24B459]/10 px-3 py-1 text-sm font-medium text-[#24B459] dark:bg-[#24B459]/10 dark:text-[#24B459]"
  >
    <SparklesIcon className="h-4 w-4" />
    {children}
  </motion.div>
);

export const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-20 lg:py-0">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Dot Grid Pattern */}
        <div className="bg-gradient-circle-light dark:bg-gradient-circle-dark absolute inset-0" />

        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#24B459]/20 blur-3xl dark:bg-[#24B459]/10"
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
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#63D68D]/20 blur-3xl dark:bg-[#63D68D]/10"
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

        {/* Additional Animated Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-48 w-48 rounded-full bg-[#24B459]/15 blur-2xl dark:bg-[#24B459]/10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-[#63D68D]/15 blur-2xl dark:bg-[#63D68D]/10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-[#24B459]/30 dark:bg-[#24B459]/20"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Curved Lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.08] dark:opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 Q600,400 1200,0 T2400,0"
            fill="none"
            stroke="#24B459"
            strokeWidth="2"
          />
          <path
            d="M0,200 Q600,600 1200,200 T2400,200"
            fill="none"
            stroke="#63D68D"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-16 px-4 lg:flex-row">
        {/* Text Content */}
        <div className="mx-auto max-w-2xl flex-1 text-center lg:mx-0 lg:text-left">
          {/* Feature Tag */}
          <FeatureTag>Next-Gen Database Management</FeatureTag>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Simplify Your
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-[#24B459]"> Database</span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M 0 10 Q 50 0 100 10 Q 150 20 200 10"
                    stroke="#24B459"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
              <br />
              Management
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400"
          >
            Transform your database operations with our powerful yet intuitive
            platform. Design, query, and visualize your data with unmatched
            efficiency.
          </motion.p>

          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-4 lg:mx-0"
          >
            {[
              { icon: DatabaseIcon, text: "Visual Schema Designer" },
              { icon: CodeIcon, text: "Advanced Query Editor" },
              { icon: ChartIcon, text: "Real-time Analytics" },
              { icon: DatabaseIcon, text: "Multi-DB Support" },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <feature.icon className="h-5 w-5 text-[#24B459] transition-transform group-hover:scale-110" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            {/* Primary CTA - Try Demo */}
            <Link href="https://demo-dh.vercel.app/" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#24B459] to-[#63D68D] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#24B459]/25"
              >
                <div className="relative flex items-center gap-2">
                  <span>Try Demo</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 -skew-x-12 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </Link>

            {/* Secondary CTA */}
            <Link href={"/download"}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-xl border border-[#24B459]/30 bg-white/5 px-8 py-4 font-medium text-gray-900 backdrop-blur-sm transition-all duration-300 hover:border-[#24B459] hover:shadow-xl hover:shadow-[#24B459]/10 dark:bg-white/5 dark:text-white"
              >
                <div className="relative flex items-center gap-2">
                  <span className="bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                    Download
                  </span>
                  <svg
                    className="h-4 w-4 text-[#24B459] transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
                {/* Hover gradient border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#24B459] to-[#63D68D] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Illustration */}
        <div className="mx-auto w-full max-w-xl flex-1 lg:max-w-2xl">
          <div className="aspect-square">
            <HeroIllustrationManager
              autoRotate={true}
              defaultIllustration="database"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
