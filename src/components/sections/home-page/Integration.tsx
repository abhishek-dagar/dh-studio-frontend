"use client";

import { motion } from "framer-motion";

const operatingSystems = [
  {
    name: "Windows",
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M3 5.5L10.5 4.5V11H3V5.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 13H10.5V19.5L3 18.5V13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12.5 4L21 3V11H12.5V4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12.5 13H21V20L12.5 19V13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Full support for Windows 10 and 11"
  },
  {
    name: "macOS",
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M15.5 3.5C14.7 4.3 13.3 5 12 5C10.7 5 9.3 4.3 8.5 3.5C7.7 2.7 7 1.3 7 0" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    description: "Native support for Apple Silicon and Intel Macs"
  },
  {
    name: "Linux",
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M12 2C9.11111 2 7 4.11111 7 7V12C7 13.1046 6.10457 14 5 14C3.89543 14 3 14.8954 3 16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16C21 14.8954 20.1046 14 19 14C17.8954 14 17 13.1046 17 12V7C17 4.11111 14.8889 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 21C9 22.1046 9.89543 23 11 23H13C14.1046 23 15 22.1046 15 21V20H9V21Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="8" r="1" fill="currentColor"/>
        <circle cx="15" cy="8" r="1" fill="currentColor"/>
      </svg>
    ),
    description: "Compatible with major Linux distributions"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const WorkspaceIllustration = () => (
  <div className="w-full max-w-4xl mx-auto mb-16">
    <motion.svg
      viewBox="0 0 800 400"
      className="w-full h-auto"
      initial="hidden"
      animate="visible"
    >
      {/* Desk */}
      <motion.path
        d="M100 300 L700 300 L750 350 L50 350 Z"
        className="fill-gray-200 dark:fill-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Monitor Stand */}
      <motion.path
        d="M350 300 L450 300 L430 250 L370 250 Z"
        className="fill-gray-300 dark:fill-gray-600"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Monitor */}
      <motion.g
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <rect x="250" y="100" width="300" height="180" rx="10" className="fill-gray-800" />
        <rect x="260" y="110" width="280" height="160" className="fill-[#24B459]/10" />
        
        {/* Code Lines Animation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <rect x="280" y="130" width="120" height="6" rx="3" className="fill-[#24B459]/60" />
          <rect x="280" y="150" width="180" height="6" rx="3" className="fill-[#24B459]/40" />
          <rect x="280" y="170" width="140" height="6" rx="3" className="fill-[#24B459]/60" />
          <rect x="280" y="190" width="160" height="6" rx="3" className="fill-[#24B459]/40" />
          <rect x="280" y="210" width="130" height="6" rx="3" className="fill-[#24B459]/60" />
        </motion.g>

        {/* Cursor Blink */}
        <motion.rect
          x="280"
          y="230"
          width="8"
          height="12"
          className="fill-[#24B459]"
          animate={{
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.g>

      {/* Keyboard */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <rect x="330" y="280" width="140" height="40" rx="5" className="fill-gray-300 dark:fill-gray-600" />
        <rect x="335" y="285" width="130" height="30" rx="3" className="fill-gray-200 dark:fill-gray-500" />
      </motion.g>

      {/* Mouse */}
      <motion.path
        d="M500 290 L520 290 L520 310 L500 310 Z"
        className="fill-gray-300 dark:fill-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      {/* Person */}
      <motion.g
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        {/* Body */}
        <motion.g
          animate={{
            y: [-2, 2, -2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Torso */}
          <path 
            d="M360 270 C360 270 400 270 400 310 C400 330 390 350 390 350 C390 350 370 350 370 330 C370 310 360 270 360 270" 
            className="fill-[#24B459]"
          />
          
          {/* Neck */}
          <path 
            d="M375 240 C375 240 385 240 385 250 C385 260 375 260 375 250 C375 240 375 240 375 240" 
            className="fill-[#63D68D]"
          />

          {/* Head */}
          <g>
            {/* Face */}
            <circle cx="380" cy="225" r="25" className="fill-[#63D68D]" />
            
          </g>

          {/* Arms */}
          <motion.g
            animate={{
              rotate: [-1, 1, -1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Left Arm */}
            <path 
              d="M360 280 C360 280 330 290 320 310" 
              className="stroke-[#24B459] stroke-[12] round-full" 
              strokeLinecap="round"
            />
            {/* Right Arm */}
            <path 
              d="M400 280 C400 280 430 290 440 310" 
              className="stroke-[#24B459] stroke-[12] round-full" 
              strokeLinecap="round"
            />
          </motion.g>
        </motion.g>
        {/* Chair Back */}
        <path 
          d="M340 220 C340 220 380 220 420 220 C440 220 440 320 440 320 L320 320 C320 320 320 220 340 220" 
          className="fill-gray-600 dark:fill-gray-800"
        />
        
        {/* Chair Base */}
        <path 
          d="M350 380 C350 380 410 380 410 380 C410 380 430 350 430 350 L330 350 L350 380" 
          className="fill-gray-600 dark:fill-gray-800"
        />
      </motion.g>

      {/* Coffee Cup */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {/* Cup Body */}
        <path 
          d="M500 300 L515 300 L515 280 L500 280 Z" 
          className="fill-gray-300 dark:fill-gray-400" 
        />
        {/* Cup Handle */}
        <path 
          d="M515 295 C520 295 520 285 515 285" 
          className="fill-none stroke-gray-300 dark:stroke-gray-400"
          strokeWidth="2"
        />
        {/* Steam Animation */}
        <motion.path
          d="M505 275 C505 275 508 270 505 265 C502 260 505 255 505 255"
          className="stroke-gray-400 dark:stroke-gray-300"
          strokeWidth="2"
          fill="none"
          animate={{
            y: [-2, 2, -2],
            opacity: [0.2, 1, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.g>

      {/* Plants */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <rect x="150" y="260" width="20" height="40" className="fill-gray-300 dark:fill-gray-500" />
        <motion.g
          animate={{
            rotate: [-2, 2, -2],
            y: [-1, 1, -1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M160 260 C160 260 150 240 160 230 C170 220 150 210 150 210" className="stroke-[#24B459] stroke-2" fill="none" />
          <path d="M160 260 C160 260 170 240 160 230 C150 220 170 210 170 210" className="stroke-[#24B459] stroke-2" fill="none" />
        </motion.g>
      </motion.g>
    </motion.svg>
  </div>
);

export default function Integration() {
  return (
    <section className="relative overflow-hidden py-24">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Decorative Elements */}
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24B459]/20 blur-[32px]" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative inline-flex items-center justify-center rounded-full border border-[#24B459]/20 bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 px-4 py-2"
            >
              <span className="bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-xs font-semibold text-transparent sm:text-sm md:text-base">
                Cross-Platform Support
              </span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Run on{" "}
              <span className="relative inline-flex">
                <span className="absolute -inset-1 block rounded-lg bg-gradient-to-r from-[#24B459] to-[#63D68D] blur-lg opacity-20"></span>
                <span className="relative bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                  Any Platform
                </span>
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
          >
            Experience seamless database management across all major operating systems
          </motion.p>
        </div>

        {/* Workspace Illustration */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeInUp}
        >
          <WorkspaceIllustration />
        </motion.div>

        {/* OS Compatibility Cards */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {operatingSystems.map((os, index) => (
              <motion.div
                key={os.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 rounded-2xl transform -rotate-6 scale-105 transition-transform duration-300 group-hover:rotate-0" />
                <div className="relative bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                  <div className="flex flex-col items-center">
                    <div className="rounded-xl bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 p-4 mb-4">
                      <os.icon className="h-12 w-12 text-[#24B459]" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{os.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{os.description}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-[#24B459] to-[#63D68D] rounded-b-2xl transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 