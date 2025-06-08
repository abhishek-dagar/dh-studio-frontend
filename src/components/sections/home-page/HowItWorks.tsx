'use client';

import { motion, useInView } from 'framer-motion';
import { Link2, Database, TableProperties, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const steps = [
  {
    icon: Link2,
    title: 'Add Connection URL',
    description: 'Start by adding your database connection URL. We support PostgreSQL, MySQL, MongoDB, and more.',
    color: 'from-[#24B459] to-[#63D68D]'
  },
  {
    icon: Database,
    title: 'Connect & Verify',
    description: 'Test and establish a secure connection to your database with end-to-end encryption.',
    color: 'from-[#24B459] to-[#63D68D]'
  },
  {
    icon: TableProperties,
    title: 'Explore Schema',
    description: 'Browse your database structure, tables, and relationships in an intuitive interface.',
    color: 'from-[#24B459] to-[#63D68D]'
  },
  {
    icon: Sparkles,
    title: 'Query & Analyze',
    description: 'Write queries, create visualizations, and gain insights from your data in real-time.',
    color: 'from-[#24B459] to-[#63D68D]'
  }
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative overflow-hidden p-4 lg:py-12">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Dot Grid Pattern */}
        <div className="bg-gradient-circle-light dark:bg-gradient-circle-dark absolute inset-0" />

        {/* Animated Gradient Blobs */}
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

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mb-20 text-center">
          {/* Decorative Elements */}
          <div className="relative mb-6">
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24B459]/20 blur-[32px]" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative inline-flex items-center justify-center rounded-full border border-[#24B459]/20 bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 px-4 py-2"
            >
              <span className="bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-xs font-semibold text-transparent sm:text-sm md:text-base">
                How It Works
              </span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="relative mb-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Get Started with
              </span>
              <br className="hidden sm:block" />
              <span className="relative mt-2 inline-block sm:mt-0">
                <span className="relative z-10 bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                  Data Hive Studio
                </span>
                <svg
                  className="absolute -bottom-9 left-0 w-full"
                  viewBox="0 0 200 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M 0 10 Q 50 0 100 10 Q 150 20 200 10"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#24B459" />
                      <stop offset="100%" stopColor="#63D68D" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto max-w-[90%] text-base text-gray-400 sm:max-w-3xl sm:text-lg md:text-xl"
          >
            <span className="relative">
              Get started with Data Hive Studio in just a few simple steps,
              <br className="hidden md:block" /> designed to make database management effortless.
            </span>
          </motion.p>
        </div>

        {/* Timeline Steps */}
        <div className="max-w-6xl mx-auto relative min-h-[800px]">
          {/* Main horizontal line */}
          <div className="hidden lg:block absolute left-[10%] right-[10%] top-[400px] h-[2px] overflow-hidden">
            {/* Static base line */}
            <div className="absolute inset-0 bg-[#24B459] bg-opacity-20" />
            
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#24B459] to-transparent"
              initial={{ x: '-100%' }}
              animate={isInView ? {
                x: ['-100%', '100%'],
              } : { x: '-100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Glowing dots */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-[#24B459] shadow-[0_0_10px_#24B459]"
              initial={{ x: '-100%', scale: 1 }}
              animate={isInView ? {
                x: ['-100%', '100%'],
                scale: [1, 1.5, 1]
              } : { x: '-100%', scale: 1 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Steps Container */}
          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-x-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Card Container */}
                <div className={`
                  relative w-full
                  ${index % 2 === 0 
                    ? 'lg:translate-y-[50px]'
                    : 'lg:translate-y-[500px]'
                  }
                `}>
                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative group flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 h-full p-8 bg-gradient-to-br from-[#1e2533]/80 via-[#1e2533]/70 to-[#1e2533]/50 backdrop-blur-2xl rounded-2xl border border-gray-800/20 shadow-[0_8px_32px_rgb(0_0_0_/0.2)] group-hover:shadow-[0_16px_48px_rgb(36_180_89_/0.2)] transition-all duration-500">
                      {/* Animated Border Gradient */}
                      <div className="absolute inset-[1px] bg-gradient-to-br from-[#24B459]/0 via-[#24B459]/0 to-[#63D68D]/0 group-hover:from-[#24B459]/20 group-hover:via-[#24B459]/10 group-hover:to-[#63D68D]/20 rounded-2xl transition-all duration-500" />
                      
                      {/* Floating Dots Pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(#24B459_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />
                      
                      {/* Icon Container */}
                      <motion.div 
                        className="relative mb-6 inline-flex"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Icon Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#24B459] to-[#63D68D] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                        
                        {/* Icon Background */}
                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 p-3 text-[#24B459] shadow-lg group-hover:shadow-[0_8px_32px_rgb(36_180_89_/0.3)] transition-shadow duration-500">
                          <step.icon className="w-full h-full" strokeWidth={1.5} />
                        </div>
                      </motion.div>

                      {/* Content Container */}
                      <div className="relative space-y-3">
                        <motion.h3 
                          className="text-xl font-semibold text-white group-hover:bg-gradient-to-br group-hover:from-[#24B459] group-hover:to-[#63D68D] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {step.title}
                        </motion.h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Hover Indicator */}
                      <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-[#24B459]/0 to-[#63D68D]/0 group-hover:from-[#24B459]/20 group-hover:to-[#63D68D]/20 transition-all duration-500 flex items-center justify-center">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-gradient-to-br from-[#24B459] to-[#63D68D]"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Vertical line connecting to the horizontal line */}
                  <div className={`
                    hidden lg:block absolute left-1/2 w-[2px] bg-[#24B459] bg-opacity-20
                    ${index % 2 === 0 
                      ? 'top-full h-[150px]'
                      : 'bottom-full h-[150px]'
                    }
                  `} />
                </div>

                {/* Number Circle */}
                <div className="hidden lg:block absolute left-1/2 top-[400px] -translate-x-1/2 -translate-y-1/2 z-20">
                  {/* Outer glow */}
                  <div className="absolute -inset-4 rounded-full bg-[#24B459] bg-opacity-5" />
                  
                  {/* Middle ring */}
                  <motion.div
                    className="absolute -inset-3 rounded-full border-2 border-[#24B459] border-opacity-20"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />

                  {/* Number circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className="relative w-8 h-8 rounded-full bg-[#24B459] bg-opacity-20 flex items-center justify-center"
                  >
                    <span className="text-[#24B459] font-bold text-lg">
                      {index + 1}
                    </span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 