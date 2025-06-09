"use client";

import { motion } from "framer-motion";
import {
    Database,
    Edit3,
    Code,
    Download,
    BarChart3,
    Layers,
    Shield,
    Zap, Search,
    Filter,
    Settings, Lock, Monitor,
    Palette, Eye
} from "lucide-react";

const mainFeatures = [
  {
    id: "visual-editor",
    icon: Edit3,
    title: "Visual Table Editor",
    description: "Intuitive interface for creating and editing database tables with visual controls",
    detailedDescription: "Our visual table editor provides an intuitive interface that makes database table management simple and efficient. Create, modify, and manage tables with easy-to-use visual controls and forms.",
    features: [
      "Visual table creation and editing",
      "Column type selection and configuration",
      "Primary key and constraint management",
      "Table structure visualization",
      "Form-based table editing"
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: "schema-designer",
    icon: Layers,
    title: "Schema Visualization",
    description: "View and understand your database structure with clear schema visualization",
    detailedDescription: "Explore your database architecture with comprehensive schema viewing tools. Understand table relationships, view constraints, and navigate complex database structures with ease.",
    features: [
      "Database schema overview",
      "Table relationship visualization",
      "Column details and data types",
      "Index and constraint viewing",
      "Cross-table navigation"
    ],
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/10 to-pink-500/10",
    iconColor:"text-purple-500"
  },
  {
    id: "query-editor",
    icon: Code,
    title: "SQL Query Editor",
    description: "Write and execute SQL queries with syntax highlighting and error detection",
    detailedDescription: "Execute SQL queries efficiently with our built-in query editor. Features syntax highlighting, error detection, and result visualization to help you work with your data effectively.",
    features: [
      "SQL syntax highlighting",
      "Query execution and results",
      "Error detection and highlighting",
      "Result set viewing and export",
      "Query history tracking"
    ],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-500/10 to-emerald-500/10",
    iconColor:"text-green-500"
  },
  {
    id: "data-export",
    icon: Download,
    title: "Data Export",
    description: "Export your database data in multiple formats with filtering capabilities",
    detailedDescription: "Export your data efficiently with support for popular formats. Apply filters to export specific data sets and choose from various output formats to meet your needs.",
    features: [
      "CSV, JSON, and SQL export formats",
      "Filtered data export options",
      "Custom export configurations",
      "Table and query result exports",
      "File download management"
    ],
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-500/10 to-red-500/10",
    iconColor: "text-orange-500"
  },
  {
    id: "data-visualization",
    icon: BarChart3,
    title: "Data Viewing & Analysis",
    description: "View and analyze your data with intuitive table browsing and filtering",
    detailedDescription: "Browse and analyze your database content with powerful viewing tools. Filter, sort, and examine your data efficiently with our intuitive data exploration interface.",
    features: [
      "Tabular data viewing interface",
      "Data filtering and sorting",
      "Pagination for large datasets",
      "Column-based data analysis",
      "Search and navigation tools"
    ],
    color: "from-indigo-500 to-purple-500",
    bgColor: "from-indigo-500/10 to-purple-500/10",
    iconColor:"text-indigo-500"
  },
  {
    id: "multi-database",
    icon: Database,
    title: "Multi-Database Support",
    description: "Connect and manage multiple databases from a single interface",
    detailedDescription: "Manage all your databases from one unified interface. Support for PostgreSQL and MongoDB with easy connection management and seamless switching between databases.",
    features: [
      "PostgreSQL and MongoDB support",
      "Multiple connection management",
      "Easy database switching",
      "Connection configuration storage",
      "Secure connection handling"
    ],
    color: "from-teal-500 to-green-500",
    bgColor: "from-teal-500/10 to-green-500/10",
    iconColor: "text-teal-500"
  }
];

const additionalFeatures = [
  {
    icon: Shield,
    title: "Secure Connections",
    description: "Secure database connections with encrypted communication"
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Optimized performance for efficient database operations"
  },
  {
    icon: Search,
    title: "Data Search",
    description: "Search capabilities across tables and data content"
  },
  {
    icon: Filter,
    title: "Data Filtering",
    description: "Filter and sort data to find exactly what you need"
  },
  {
    icon: Settings,
    title: "Connection Management",
    description: "Manage multiple database connections with ease"
  },
  {
    icon: Lock,
    title: "Local Data Control",
    description: "Complete control over your data with local desktop application"
  },
  {
    icon: Monitor,
    title: "Desktop Application",
    description: "Native desktop experience for Windows and macOS"
  },
  {
    icon: Palette,
    title: "Dark/Light Mode",
    description: "Choose between dark and light themes for comfortable viewing"
  },
  {
    icon: Eye,
    title: "Data Inspection",
    description: "Inspect and examine database structures and content"
  }
];

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-[#191B1F]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#24B459]/5 via-transparent to-[#63D68D]/5 opacity-60" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#24B459]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#63D68D]/10 blur-3xl delay-1000" />
      </div>

      <div className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <section className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-6 inline-flex items-center justify-center rounded-full border border-[#24B459]/30 bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 px-4 py-2 shadow-lg backdrop-blur-md"
            >
              <span className="bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-xs font-semibold text-transparent sm:text-sm md:text-base">
                ✨ Powerful Features
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-6xl lg:text-7xl"
            >
              Everything You Need for{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                  Database Management
                </span>
                <span className="absolute -inset-1 block rounded-lg bg-gradient-to-r from-[#24B459] to-[#63D68D] opacity-20 blur-lg"></span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400 md:text-xl"
            >
              Discover the essential tools that make Data Hive Studio
              a powerful and intuitive desktop database management application.
            </motion.p>
          </section>

          {/* Main Features Grid */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Core Features
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                Six essential features for effective database management
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/90 p-8 backdrop-blur-xl shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-gray-700/50 dark:bg-[#191B1F]/90"
                >
                  {/* Background decorative elements */}
                  <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${feature.bgColor} blur-3xl transition-all duration-500 group-hover:scale-150`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.bgColor} shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}>
                      <feature.icon className={`h-10 w-10 ${feature.iconColor} transition-all duration-300 group-hover:scale-110`} />
                    </div>

                    {/* Content */}
                    <h3 className={`mb-4 text-2xl font-bold transition-all duration-300 group-hover:bg-gradient-to-r ${feature.color} group-hover:bg-clip-text group-hover:text-transparent text-gray-900 dark:text-white`}>
                      {feature.title}
                    </h3>
                    
                    <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.detailedDescription}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <div className={`mr-3 h-2 w-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Additional Features */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Additional Capabilities
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                Additional capabilities that make database management easier
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group rounded-2xl border border-gray-200/50 bg-white/90 p-6 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-[#24B459]/50 hover:shadow-xl hover:shadow-[#24B459]/10 dark:border-gray-700/50 dark:bg-[#191B1F]/90"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 transition-all duration-300 group-hover:scale-110 group-hover:from-[#24B459]/20 group-hover:to-[#63D68D]/20">
                    <feature.icon className="h-6 w-6 text-[#24B459] transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#24B459] dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group text-center"
          >
            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-gradient-to-br from-[#24B459]/5 to-[#63D68D]/5 p-16 backdrop-blur-xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#24B459]/20 dark:border-gray-700/50 dark:from-[#24B459]/10 dark:to-[#63D68D]/10">
              {/* Background decorative elements */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 blur-3xl transition-all duration-500 group-hover:scale-150" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#63D68D]/10 to-[#24B459]/10 blur-2xl transition-all duration-500 group-hover:scale-125" />
              
              <div className="relative">
                <h2 className="mb-6 text-4xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#24B459] dark:text-white md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Download Data Hive Studio today and experience the future of database management.
                </p>
                <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
                  <motion.a
                    href="/download"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn rounded-xl bg-gradient-to-r from-[#24B459] to-[#63D68D] px-10 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#24B459]/30"
                  >
                    <span className="relative z-10">Download Now</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1e9b4a] to-[#58c781] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                  </motion.a>
                  <motion.a
                    href="/about"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl border-2 border-gray-300 bg-white/80 px-10 py-4 font-semibold text-gray-900 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-[#24B459]/50 hover:bg-white hover:shadow-xl dark:border-gray-600 dark:bg-[#191B1F]/80 dark:text-white dark:hover:border-[#24B459]/50 dark:hover:bg-[#191B1F]"
                  >
                    Learn More
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
} 