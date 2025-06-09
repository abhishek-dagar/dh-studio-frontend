"use client";

import { motion } from "framer-motion";
import { Users, Target, Heart, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  {
    name: "Abhishek Dagar",
    role: "Founder & CEO",
    bio: "Full-stack developer passionate about creating tools that make database management accessible to everyone.",
    image: "/api/placeholder/150/150",
    linkedin: "https://www.linkedin.com/in/abhishek-dagar-a97375199/",
    github: "https://github.com/abhishek-dagar",
    twitter: "#",
    isPlaceholder: false,
  },
];

const values = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "We prioritize the security and privacy of your data above everything else.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Lightning-fast operations that don't compromise on reliability.",
  },
  {
    icon: Heart,
    title: "User-Centric",
    description: "Every feature is designed with the user experience in mind.",
  },
  {
    icon: Globe,
    title: "Open Source",
    description:
      "Building in the open, with transparency and community collaboration.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-[#191B1F]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#24B459]/5 via-transparent to-[#63D68D]/5 opacity-60" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#24B459]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#63D68D]/10 blur-3xl delay-1000" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="bg-hexagon-pattern-light dark:bg-hexagon-pattern-dark absolute inset-0" />
        
        {/* Glassmorphism Background Enhancements */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-[#24B459]/20 to-[#63D68D]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-[#63D68D]/15 to-[#24B459]/15 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#24B459]/10 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }} />
        
        {/* Animated Background SVG */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <svg width="100%" height="100%" className="opacity-5">
              <pattern
                id="download-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <motion.path
                  d="M20 0 L20 40 M0 20 L40 20"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#download-pattern)" />
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 pt-20">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-6 inline-flex items-center justify-center rounded-full border border-[#24B459]/30 bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 px-4 py-2 shadow-lg backdrop-blur-md"
          >
            <span className="bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-xs font-semibold text-transparent sm:text-sm md:text-base">
              About Data Hive Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            Building the Future of{" "}
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
            We're on a mission to democratize database management, making
            powerful tools accessible to developers, data analysts, and
            businesses of all sizes.
          </motion.p>
        </section>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Data Hive Studio was born from a simple frustration: existing
                  database management tools were either too complex for
                  beginners or too limited for professionals. As developers, we
                  found ourselves constantly switching between multiple tools to
                  accomplish basic database tasks.
                </p>
                <p>
                  We envisioned a single, powerful platform that could handle
                  everything from simple data viewing to complex schema design,
                  all wrapped in an intuitive interface that doesn't sacrifice
                  functionality for simplicity.
                </p>
                <p>
                  Today, Data Hive Studio serves thousands of users worldwide,
                  from indie developers building their first app to enterprise
                  teams managing critical data infrastructure.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#24B459]/20 to-[#63D68D]/20 p-8">
                  <div className="flex h-full w-full items-center justify-center rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-xl dark:border-gray-700/50 dark:bg-[#191B1F]/80">
                    <div className="text-center">
                      <div className="mb-4 text-6xl">🚀</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Innovation Driven
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Building tomorrow's tools today
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/90 p-10 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-[#24B459]/50 hover:shadow-2xl hover:shadow-[#24B459]/20 dark:border-gray-700/50 dark:bg-[#191B1F]/90"
            >
              {/* Background decorative elements */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#24B459]/5 to-[#63D68D]/5 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:from-[#24B459]/10 group-hover:to-[#63D68D]/10" />
              <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-br from-[#63D68D]/5 to-[#24B459]/5 blur-2xl transition-all duration-500 group-hover:scale-125" />
              
              <div className="relative">
                {/* Enhanced icon */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:from-[#24B459]/20 group-hover:to-[#63D68D]/20 group-hover:shadow-2xl">
                  <Target className="h-10 w-10 text-[#24B459] transition-all duration-300 group-hover:scale-110" />
                </div>
                
                {/* Enhanced text */}
                <h3 className="mb-6 text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#24B459] dark:text-white">
                  Our Mission
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  To democratize database management by providing powerful,
                  intuitive tools that enable anyone to work with data
                  efficiently, regardless of their technical background.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/90 p-10 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-[#24B459]/50 hover:shadow-2xl hover:shadow-[#24B459]/20 dark:border-gray-700/50 dark:bg-[#191B1F]/90"
            >
              {/* Background decorative elements */}
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#63D68D]/5 to-[#24B459]/5 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:from-[#63D68D]/10 group-hover:to-[#24B459]/10" />
              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br from-[#24B459]/5 to-[#63D68D]/5 blur-2xl transition-all duration-500 group-hover:scale-125" />
              
              <div className="relative">
                {/* Enhanced icon */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:from-[#24B459]/20 group-hover:to-[#63D68D]/20 group-hover:shadow-2xl">
                  <Users className="h-10 w-10 text-[#24B459] transition-all duration-300 group-hover:scale-110" />
                </div>
                
                {/* Enhanced text */}
                <h3 className="mb-6 text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#24B459] dark:text-white">
                  Our Vision
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  A world where data management is accessible to everyone, where
                  powerful database tools empower creativity and innovation across
                  all industries and skill levels.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              These core principles guide everything we do, from product
              development to customer support.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/90 p-8 backdrop-blur-xl shadow-lg transition-all duration-500 hover:border-[#24B459]/50 hover:shadow-xl hover:shadow-[#24B459]/10 dark:border-gray-700/50 dark:bg-[#191B1F]/90"
              >
                {/* Background decorative elements */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-[#24B459]/5 to-[#63D68D]/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:from-[#24B459]/10 group-hover:to-[#63D68D]/10" />
                
                <div className="relative">
                  {/* Enhanced icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:from-[#24B459]/20 group-hover:to-[#63D68D]/20 group-hover:shadow-xl">
                    <value.icon className="h-8 w-8 text-[#24B459] transition-all duration-300 group-hover:scale-110" />
                  </div>
                  
                  {/* Enhanced text */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#24B459] dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Meet Our Team
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              The passionate individuals behind Data Hive Studio, working to
              make database management better for everyone.
            </p>
          </motion.div>

          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative max-w-sm overflow-hidden rounded-3xl border border-gray-200/50 bg-white/90 p-8 backdrop-blur-xl shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-gray-700/50 dark:bg-[#191B1F]/90 ${
                  member.isPlaceholder
                    ? "opacity-60"
                    : "hover:border-[#24B459]/50 hover:shadow-[#24B459]/20"
                }`}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#24B459]/5 via-transparent to-[#63D68D]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Decorative elements */}
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 blur-xl transition-all duration-500 group-hover:scale-150" />
                <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#63D68D]/10 to-[#24B459]/10 blur-xl transition-all duration-500 group-hover:scale-125" />
                
                <div className="relative text-center">
                  {/* Enhanced avatar */}
                  <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#24B459]/20 to-[#63D68D]/20 p-1 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white/50 backdrop-blur-sm dark:bg-[#191B1F]/50">
                      {member.isPlaceholder ? (
                        <Users className="h-12 w-12 text-[#24B459]" />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#24B459] to-[#63D68D] shadow-inner">
                          <span className="text-3xl font-bold text-white">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced text */}
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#24B459] dark:text-white">
                    {member.name}
                  </h3>
                  <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 px-4 py-1.5 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-[#24B459]">
                      {member.role}
                    </p>
                  </div>
                  <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Enhanced social links */}
                  {!member.isPlaceholder && (
                    <div className="flex justify-center space-x-4">
                      <Link
                        target="_blank"
                        href={member.linkedin}
                        className="group/link flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600 transition-all duration-300 hover:scale-110 hover:from-blue-500/20 hover:to-blue-600/20 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="h-5 w-5 transition-transform duration-300 group-hover/link:scale-110"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                      <Link
                        target="_blank"
                        href={member.github}
                        className="group/link flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-700/10 to-gray-800/10 text-gray-700 transition-all duration-300 hover:scale-110 hover:from-gray-700/20 hover:to-gray-800/20 hover:shadow-lg hover:shadow-gray-700/25 dark:text-gray-300"
                      >
                        <span className="sr-only">GitHub</span>
                        <svg
                          className="h-5 w-5 transition-transform duration-300 group-hover/link:scale-110"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Join Us CTA */}
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
                Join Our Journey
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Want to be part of building the future of database management?
                We're always looking for passionate individuals to join our team.
              </p>
              <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
                <motion.a
                  href="mailto:careers@datahivestudio.com"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/btn rounded-xl bg-gradient-to-r from-[#24B459] to-[#63D68D] px-10 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#24B459]/30"
                >
                  <span className="relative z-10">View Open Positions</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1e9b4a] to-[#58c781] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                </motion.a>
                <motion.a
                  href="https://github.com/abhishek-dagar/data-hive-studio"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl border-2 border-gray-300 bg-white/80 px-10 py-4 font-semibold text-gray-900 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-[#24B459]/50 hover:bg-white hover:shadow-xl dark:border-gray-600 dark:bg-[#191B1F]/80 dark:text-white dark:hover:border-[#24B459]/50 dark:hover:bg-[#191B1F]"
                >
                  Contribute on GitHub
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
