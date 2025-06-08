import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DatabaseIcon, NetworkIcon, CodeEditorIcon, DataVizIcon } from './HeroIllustrations';

const ILLUSTRATIONS = [
  { key: 'database', Component: DatabaseIcon },
  { key: 'network', Component: NetworkIcon },
  { key: 'codeEditor', Component: CodeEditorIcon },
  { key: 'dataViz', Component: DataVizIcon },
] as const;

interface Props {
  autoRotate?: boolean;
  rotationInterval?: number;
  defaultIllustration?: (typeof ILLUSTRATIONS)[number]['key'];
  onIllustrationChange?: (key: (typeof ILLUSTRATIONS)[number]['key']) => void;
}

export const HeroIllustrationManager: React.FC<Props> = ({
  autoRotate = true,
  rotationInterval = 5000, // 5 seconds
  defaultIllustration = 'database',
  onIllustrationChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return ILLUSTRATIONS.findIndex(ill => ill.key === defaultIllustration) || 0;
  });

  useEffect(() => {
    if (!autoRotate) return;

    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % ILLUSTRATIONS.length;
        onIllustrationChange?.(ILLUSTRATIONS[nextIndex].key);
        return nextIndex;
      });
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [autoRotate, rotationInterval, onIllustrationChange]);

  const CurrentIllustration = ILLUSTRATIONS[currentIndex].Component;

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <CurrentIllustration />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 