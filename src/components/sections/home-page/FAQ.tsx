"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQCategory = {
  name: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

const faqCategories: FAQCategory[] = [
  {
    name: "Common Questions",
    questions: [
      {
        question: "Which databases are currently supported?",
        answer: "Data Hive Studio currently supports MongoDB and PostgreSQL databases. We're actively working on expanding support for other database systems in future updates."
      },
      {
        question: "What operating systems can I run Data Hive Studio on?",
        answer: "Data Hive Studio is currently available for macOS and Windows operating systems. Each version is optimized for its respective platform to ensure the best possible performance."
      },
      {
        question: "Is Data Hive Studio available online?",
        answer: "Currently, Data Hive Studio is available as a downloadable desktop application only. We're focusing on providing a robust offline experience before considering online accessibility options."
      }
    ]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const accordionAnimation = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: "auto", 
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1]
      },
      opacity: {
        duration: 0.2,
        delay: 0.1
      }
    }
  }
};

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => 
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  return (
    <section className="relative overflow-hidden py-24">
      {/* Hexagon Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#24B459_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/80 to-white dark:from-gray-900/0 dark:via-gray-900/80 dark:to-gray-900" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Decorative Elements */}
          <div className="relative mb-6">
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24B459]/20 blur-[32px]" />
            <motion.div
              variants={fadeInUp}
              className="relative inline-flex items-center justify-center rounded-full border border-[#24B459]/20 bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 px-4 py-2"
            >
              <span className="bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-xs font-semibold text-transparent sm:text-sm md:text-base">
                FAQ & Support
              </span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.div
            variants={fadeInUp}
            className="relative mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Got{" "}
              <span className="relative inline-flex">
                <span className="absolute -inset-1 block rounded-lg bg-gradient-to-r from-[#24B459] to-[#63D68D] blur-lg opacity-20"></span>
                <span className="relative bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                  Questions?
                </span>
              </span>
            </h2>
          </motion.div>
        </motion.div>

        {/* FAQ Questions */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Decorative Side Elements */}
          <div className="absolute -left-24 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="h-48 w-48 rotate-45 bg-gradient-to-br from-[#24B459]/5 to-[#63D68D]/5 backdrop-blur-sm" />
          </div>
          <div className="absolute -right-24 top-1/3 hidden -translate-y-1/2 lg:block">
            <div className="h-32 w-32 rotate-45 bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 backdrop-blur-sm" />
          </div>

          {faqCategories[0].questions.map((faq, faqIndex) => (
            <motion.div
              key={faq.question}
              variants={fadeInUp}
              custom={faqIndex}
              transition={{ delay: faqIndex * 0.1 }}
              className="group relative mb-6"
            >
              {/* Question Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/50 dark:hover:bg-gray-800/60">
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="relative flex w-full items-center justify-between p-6 text-left"
                >
                  {/* Question Number */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 p-8 transition-transform duration-300 group-hover:scale-110" />
                  
                  <span className="relative text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openQuestions.includes(faq.question) ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="relative ml-4 shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-[#24B459]" />
                  </motion.div>
                </button>

                {/* Answer */}
                <motion.div
                  initial="hidden"
                  animate={openQuestions.includes(faq.question) ? "visible" : "hidden"}
                  variants={accordionAnimation}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-700/50 dark:bg-gray-800/30">
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 