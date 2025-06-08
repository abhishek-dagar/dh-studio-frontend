import { motion } from "motion/react";

const features = [
  {
    title: "Visual Table Editor",
    description:
      "Edit your database tables with an intuitive UI. Add, modify, or delete records with simple clicks.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M15 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "Schema Designer",
    description:
      "Create and modify table structures with a powerful schema designer. Define relationships, constraints, and indexes visually.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3h18v18H3z" />
        <path d="M21 9H3" />
        <path d="M21 15H3" />
        <path d="M12 3v18" />
      </svg>
    ),
  },
  {
    title: "Advanced Query Editor",
    description:
      "Write and execute SQL queries with syntax highlighting, auto-completion, and query history tracking.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    title: "Data Export",
    description:
      "Export your data in multiple formats including CSV, JSON, and SQL. Schedule automated exports for backup.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    title: "Data Visualization",
    description:
      "Transform your data into insightful charts and graphs. Create interactive dashboards to monitor your data.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Multi-Database Support",
    description:
      "Connect and manage multiple databases including PostgreSQL, MongoDB, and more from a single interface.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C6.48 2 2 4.48 2 7.5v9C2 19.52 6.48 22 12 22s10-2.48 10-5.5v-9C22 4.48 17.52 2 12 2z" />
        <path d="M2 7.5C2 10.52 6.48 13 12 13s10-2.48 10-5.5" />
        <path d="M2 12c0 3.02 4.48 5.5 10 5.5s10-2.48 10-5.5" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const AnimatedBackground = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 opacity-10"
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
        >
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.rect
                key={i}
                x={i * 20}
                y="20"
                width="15"
                height="15"
                rx="2"
                fill="#24B459"
                initial={{ y: 20 }}
                animate={{ y: [20, 25, 20] }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
            {[...Array(5)].map((_, i) => (
              <motion.rect
                key={i}
                x={i * 20}
                y="45"
                width="15"
                height="15"
                rx="2"
                fill="#63D68D"
                initial={{ y: 45 }}
                animate={{ y: [45, 50, 45] }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.g>
        </motion.svg>
      );

    case 1:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 opacity-10"
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
        >
          <motion.g>
            {[...Array(3)].map((_, i) => (
              <g key={i}>
                <motion.circle
                  cx={30 + i * 20}
                  cy={30 + i * 20}
                  r="5"
                  fill="#24B459"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                />
                <motion.line
                  x1={35 + i * 20}
                  y1={35 + i * 20}
                  x2={50 + i * 20}
                  y2={50 + i * 20}
                  stroke="#63D68D"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                />
              </g>
            ))}
          </motion.g>
        </motion.svg>
      );

    case 2:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 opacity-10"
          viewBox="0 0 100 100"
        >
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1="10"
              y1={20 + i * 15}
              x2="90"
              y2={20 + i * 15}
              stroke="#24B459"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.svg>
      );

    case 3:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 opacity-10"
          viewBox="0 0 100 100"
        >
          {[...Array(3)].map((_, i) => (
            <motion.path
              key={i}
              d="M20 20 L60 20 L60 60 L20 60 Z"
              fill="none"
              stroke="#63D68D"
              strokeWidth="2"
              transform={`translate(${i * 10} ${i * 10})`}
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.svg>
      );

    case 4:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 opacity-10"
          viewBox="0 0 100 100"
        >
          <motion.path
            d="M10 90 L30 40 L50 60 L70 20 L90 50"
            fill="none"
            stroke="#24B459"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M10 80 L30 60 L50 70 L70 30 L90 40"
            fill="none"
            stroke="#63D68D"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          />
        </motion.svg>
      );

    case 5:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-full lg:w-full opacity-10"
          viewBox="0 0 200 100"
        >
          {[...Array(3)].map((_, i) => (
            <g key={i}>
              <motion.circle
                cx={50 + i * 50}
                cy="50"
                r="20"
                fill="none"
                stroke="#24B459"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.path
                d={`M${70 + i * 50} 50 L${80 + i * 50} 50`}
                stroke="#63D68D"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            </g>
          ))}
        </motion.svg>
      );

    default:
      return null;
  }
};

export default function Features() {
  return (
    <section className="relative overflow-hidden pb-4 lg:pb-8">
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

      <div className="container relative mx-auto px-4 py-16">
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
                Features & Capabilities
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
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                Powerful Features for Modern
              </span>
              <br className="hidden sm:block" />
              <span className="relative mt-2 inline-block sm:mt-0">
                <span className="relative z-10 bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                  Database Management
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
            className="relative mx-auto max-w-[90%] text-base text-gray-600 dark:text-gray-300 sm:max-w-3xl sm:text-lg md:text-xl"
          >
            <span className="relative">
              Everything you need to manage your databases efficiently and
              securely,
              <br className="hidden md:block" /> all in one powerful platform.
            </span>
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.slice(0, 6).map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100/50 bg-gradient-to-b from-gray-50/80 to-white/40 p-4 sm:p-6 lg:p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[#24B459]/30 dark:border-gray-700/50 dark:from-[#232936]/80 dark:to-[#1e2330]/40 ${
                index === 0
                  ? "sm:row-span-2"
                  : index === 5
                  ? "col-span-1 sm:col-span-2 lg:col-span-3"
                  : ""
              } min-h-[250px] sm:min-h-[300px]`}
            >
              {/* Animated Background SVG */}
              <AnimatedBackground index={index} />

              {/* Hover Effect Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#24B459]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/5" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col">
                {/* Icon Container */}
                <div className="relative mb-4 sm:mb-6">
                  {/* Icon Background */}
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-[#24B459]/20 to-[#63D68D]/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Icon Wrapper */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 text-[#24B459] transition-colors duration-300 group-hover:from-[#24B459]/20 group-hover:to-[#63D68D]/20"
                  >
                    <div className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7">{feature.icon}</div>
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-lg sm:text-xl font-semibold text-transparent transition-colors duration-300 group-hover:from-[#24B459] group-hover:to-[#63D68D] dark:from-white dark:to-gray-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute right-0 top-0 h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute right-0 top-0 h-full w-full rounded-tr-2xl bg-gradient-to-bl from-[#24B459]/10" />
              </div>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-[#24B459]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
