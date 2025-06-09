"use client";

import { motion } from "framer-motion";
import { Download, Monitor, Command, Terminal, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface DownloadOption {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
  downloadSize: string;
  version: string;
  disabled?: boolean;
  comingSoon?: boolean;
  downloadUrl?: string;
}

interface AnimatedCheckmarkProps {
  disabled?: boolean;
}

interface DownloadButtonProps {
  os: string;
  size: string;
  version: string;
  disabled?: boolean;
  downloadUrl?: string;
}

// Function to fetch file sizes using GitHub API
const fetchFileSizes = async (): Promise<{ windows: string; macOS: string }> => {
  try {
    // Use GitHub Releases API to get release information
    const response = await fetch('https://api.github.com/repos/abhishek-dagar/data-hive-studio/releases/tags/0.1.0-alpha');
    const releaseData = await response.json();
    
    let windowsSize = "68 MB";
    let macOSSize = "72 MB";
    
    if (releaseData.assets) {
      // Find the Windows EXE file
      const windowsAsset = releaseData.assets.find((asset: any) => 
        asset.name.includes('.exe') || asset.name.includes('Setup')
      );
      
      // Find the macOS DMG file
      const macOSAsset = releaseData.assets.find((asset: any) => 
        asset.name.includes('arm64.dmg') || asset.name.includes('.dmg')
      );
      
      if (windowsAsset && windowsAsset.size) {
        const sizeInMB = (windowsAsset.size / (1024 * 1024)).toFixed(1);
        windowsSize = `${sizeInMB} MB`;
      }
      
      if (macOSAsset && macOSAsset.size) {
        const sizeInMB = (macOSAsset.size / (1024 * 1024)).toFixed(1);
        macOSSize = `${sizeInMB} MB`;
      }
    }
    
    return { windows: windowsSize, macOS: macOSSize };
  } catch (error) {
    console.error('Error fetching file sizes from GitHub API:', error);
    return { windows: "68 MB", macOS: "72 MB" }; // fallback
  }
};

const getDownloadOptions = (windowsSize: string, macOSSize: string): DownloadOption[] => [
  {
    title: "Windows",
    description: "For Windows 10 and Windows 11",
    features: [
      "Windows 10 64-bit",
      "Windows 11 64-bit",
      "Auto-updates",
      "Windows-native UI",
    ],
    icon: Monitor,
    color: "#24B459",
    downloadSize: windowsSize,
    version: "0.1.0-alpha",
    downloadUrl: "https://github.com/abhishek-dagar/data-hive-studio/releases/download/0.1.0-alpha/Data.Hive.Studio.Setup.0.1.0-alpha.exe"
  },
  {
    title: "macOS",
    description: "For macOS 10.15 or later",
    features: [
      "Intel & Apple Silicon",
      "macOS 10.15+",
      "Native Apple UI",
      "Touch Bar support",
    ],
    icon: Command,
    color: "#63D68D",
    downloadSize: macOSSize,
    version: "0.1.0-alpha",
    downloadUrl: "https://github.com/abhishek-dagar/data-hive-studio/releases/download/0.1.0-alpha/Data.Hive.Studio-0.1.0-alpha-arm64.dmg"
  },
  {
    title: "Linux",
    description: "Ubuntu, Fedora & more",
    icon: Terminal,
    color: "#8891A2",
    features: [
      ".deb package (Ubuntu/Debian)",
      ".rpm package (Fedora/RHEL)",
      "AppImage available",
      "Auto-updates",
    ],
    downloadSize: "70MB",
    version: "1.0.0",
    disabled: true,
    comingSoon: true
  }
];

// Animated download button component
const DownloadButton: React.FC<DownloadButtonProps> = ({ os, size, version, disabled, downloadUrl }) => {
  const handleDownload = () => {
    if (downloadUrl && !disabled) {
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={handleDownload}
      className={`group relative w-full rounded-lg px-6 py-3 text-white shadow-lg transition-all backdrop-blur-sm ${
        disabled 
          ? 'bg-gray-400/80 dark:bg-gray-600/80 cursor-not-allowed opacity-50' 
          : 'bg-gradient-to-r from-[#24B459]/90 to-[#63D68D]/90 hover:shadow-xl hover:shadow-[#24B459]/30 hover:from-[#24B459] hover:to-[#63D68D]'
      }`}
      disabled={disabled}
    >
      <div className={`absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity ${
        disabled ? '' : 'group-hover:opacity-10'
      }`} />
      <div className="relative flex items-center justify-center gap-2">
        <Download className="h-5 w-5" />
        <span className="font-medium">
          Download for {os}
        </span>
      </div>
      <div className="mt-1 text-sm opacity-90">
        {size} • Version {version}
      </div>
    </motion.button>
  );
};

// Animated checkmark component
const AnimatedCheckmark: React.FC<AnimatedCheckmarkProps> = ({ disabled = false }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex-shrink-0 ${disabled ? 'text-gray-400 dark:text-gray-500' : 'text-green-500 dark:text-green-400'}`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.div>
  );
};

// OS-specific animated SVG components
const WindowsIllustration = () => (
  <motion.svg
    className="absolute right-0 top-0 w-32 h-32 opacity-5"
    viewBox="0 0 100 100"
    initial="hidden"
    animate="visible"
  >
    <motion.rect
      x="20"
      y="20"
      width="25"
      height="25"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2
      }}
    />
    <motion.rect
      x="55"
      y="20"
      width="25"
      height="25"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2
      }}
    />
    <motion.rect
      x="20"
      y="55"
      width="25"
      height="25"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.6,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2
      }}
    />
    <motion.rect
      x="55"
      y="55"
      width="25"
      height="25"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2
      }}
    />
  </motion.svg>
);

const MacOSIllustration = () => (
  <motion.svg
    className="absolute right-0 top-0 w-32 h-32 opacity-5"
    viewBox="0 0 100 100"
    initial="hidden"
    animate="visible"
  >
    <motion.path
      d="M50 20 C 70 20, 80 35, 80 50 C 80 65, 70 80, 50 80 C 30 80, 20 65, 20 50 C 20 35, 30 20, 50 20"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="15"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  </motion.svg>
);

const LinuxIllustration = () => (
  <motion.svg
    className="absolute right-0 top-0 w-32 h-32 opacity-3 blur-[1px]"
    viewBox="0 0 100 100"
    initial="hidden"
    animate="visible"
  >
    {[...Array(5)].map((_, i) => (
      <motion.line
        key={i}
        x1="20"
        y1={25 + i * 10}
        x2="80"
        y2={25 + i * 10}
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0.1 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{
          duration: 2,
          delay: i * 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    ))}
    <motion.circle
      cx="50"
      cy="70"
      r="10"
      fill="currentColor"
      initial={{ y: -20, opacity: 0.1 }}
      animate={{ y: 0, opacity: 0.3 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  </motion.svg>
);

const getIllustration = (title: string) => {
  switch (title) {
    case "Windows":
      return <WindowsIllustration />;
    case "macOS":
      return <MacOSIllustration />;
    case "Linux":
      return <LinuxIllustration />;
    default:
      return null;
  }
};

export default function DownloadPage() {
  const [windowsFileSize, setWindowsFileSize] = useState("68 MB");
  const [macOSFileSize, setMacOSFileSize] = useState("72 MB");
  const downloadOptions = getDownloadOptions(windowsFileSize, macOSFileSize);

  useEffect(() => {
    const loadFileSizes = async () => {
      const sizes = await fetchFileSizes();
      setWindowsFileSize(sizes.windows);
      setMacOSFileSize(sizes.macOS);
    };

    loadFileSizes();
  }, []);

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#191B1F]">
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
        {/* Header Section */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-6 inline-flex items-center justify-center rounded-full border border-[#24B459]/30 bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 backdrop-blur-md px-4 py-2 shadow-lg"
          >
            <span className="bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-xs font-semibold text-transparent sm:text-sm md:text-base">
              Download Now
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            Download{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                Data Hive Studio
              </span>
              <span className="absolute -inset-1 block rounded-lg bg-gradient-to-r from-[#24B459] to-[#63D68D] blur-lg opacity-20"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400"
          >
            Choose your operating system to download Data Hive Studio and start managing your databases with ease.
          </motion.p>
        </div>

        {/* Download Options Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {downloadOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`group relative rounded-2xl border bg-white/80 backdrop-blur-xl p-6 shadow-lg transition-all dark:bg-[#191B1F]/80 dark:backdrop-blur-xl border-gray-100/50 dark:border-gray-700/50 overflow-hidden hover:shadow-xl hover:shadow-[#24B459]/10 dark:hover:shadow-[#24B459]/20 ${
                option.disabled ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {getIllustration(option.title)}
              
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className={`rounded-lg p-2 ${
                      option.disabled ? 'opacity-50' : ''
                    }`}
                    style={{ backgroundColor: `${option.color}20` }}
                  >
                    <option.icon className="h-6 w-6" style={{ color: option.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-xl font-semibold ${
                        option.disabled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {option.title}
                      </h3>
                      {option.comingSoon && (
                        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      option.disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {option.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  {option.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <AnimatedCheckmark disabled={option.disabled} />
                      <span className={`${
                        option.disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <DownloadButton 
                  os={option.title} 
                  size={option.downloadSize} 
                  version={option.version}
                  disabled={option.disabled}
                  downloadUrl={option.downloadUrl}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 rounded-2xl border border-gray-100/50 bg-white/80 backdrop-blur-xl p-8 dark:border-gray-700/50 dark:bg-[#191B1F]/80 dark:backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            System Requirements
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Operating System",
                description: "Windows 10/11 (64-bit), macOS 10.15+, Major Linux distros",
              },
              {
                title: "Processor",
                description: "Intel Core i3/AMD Ryzen 3 or better",
              },
              {
                title: "Memory",
                description: "4 GB RAM minimum (8 GB recommended)",
              },
              {
                title: "Storage",
                description: "500 MB free space",
              },
            ].map((req) => (
              <div key={req.title}>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {req.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{req.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
