"use client";

import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Return a simpler version during SSR and initial render
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Data Hive Studio Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Data Hive
              </span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={false}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-[#1a1f2b]/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3"
          >
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Data Hive Studio Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Data Hive
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-[#24B459] dark:hover:text-[#24B459] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/download"
              className="text-gray-600 dark:text-gray-300 hover:text-[#24B459] dark:hover:text-[#24B459] transition-colors"
            >
              Download
            </Link>
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitch />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group px-6 py-2 bg-gradient-to-r from-[#24B459] to-[#63D68D] text-white rounded-lg font-medium 
                overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#24B459]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#63D68D] to-[#24B459] opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              <span className="relative">Get Started</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeSwitch />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-[#24B459] dark:hover:text-[#24B459]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#1a1f2b] border-t border-gray-100 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-gray-600 dark:text-gray-300 hover:text-[#24B459] dark:hover:text-[#24B459] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/download"
                className="block text-gray-600 dark:text-gray-300 hover:text-[#24B459] dark:hover:text-[#24B459] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download
              </Link>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#24B459] to-[#63D68D] text-white rounded-lg font-medium"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar; 