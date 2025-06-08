import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Helper function to generate consistent random positions
const generatePositions = (count: number, seed = 1) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const x = ((seed * (i + 1) * 123) % 100);
    const y = ((seed * (i + 1) * 456) % 100);
    positions.push({ x, y });
  }
  return positions;
};

// Original Database Icon
// export const DatabaseIcon = () => {
//   const [isClient, setIsClient] = useState(false);
  
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const particlePositions = generatePositions(5);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="relative w-full h-full"
//     >
//       <div className="absolute inset-0 flex items-center justify-center">
//         {/* Database Stack */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="relative"
//         >
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               className="w-32 h-16 bg-gray-100 dark:bg-[#2a3444] rounded-lg border border-[#24B459]/20 relative"
//               style={{ marginTop: `-${i * 2}rem` }}
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: i * 0.2 }}
//             >
//               {isClient && (
//                 <motion.div
//                   className="absolute inset-0 bg-[#24B459]/5 rounded-lg"
//                   animate={{ opacity: [0.5, 0.2, 0.5] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 />
//               )}
              
//               <motion.div
//                 className="absolute -left-10 top-1/2 w-8 h-0.5 bg-[#24B459]/20"
//                 initial={{ scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ delay: i * 0.3 }}
//               />
//               <motion.div
//                 className="absolute -right-10 top-1/2 w-8 h-0.5 bg-[#24B459]/20"
//                 initial={{ scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ delay: i * 0.3 }}
//               />
//             </motion.div>
//           ))}

//           {/* Floating Particles */}
//           {isClient && particlePositions.map((pos, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-[#24B459]"
//               style={{
//                 left: `${pos.x}%`,
//                 top: `${pos.y}%`
//               }}
//               animate={{
//                 y: [0, -10, 0],
//                 opacity: [0.2, 1, 0.2],
//                 scale: [1, 1.5, 1]
//               }}
//               transition={{
//                 duration: 2,
//                 delay: i * 0.2,
//                 repeat: Infinity
//               }}
//             />
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

export const DatabaseIcon = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative w-full h-full"
  >
    {/* Main Container */}
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Database Stack */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative"
      >
        {/* Connection Lines */}
        <motion.div
          className="absolute -left-32 top-1/2 w-24 h-1 bg-gradient-to-r from-[#24B459] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        <motion.div
          className="absolute -right-32 top-1/2 w-24 h-1 bg-gradient-to-l from-[#24B459] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />

        {/* Database Cylinders */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
            className="relative mb-4 last:mb-0"
          >
            <div className="relative w-48 h-24 bg-[#2a3444] rounded-lg border border-[#24B459]/20 overflow-hidden">
              {/* Top Ellipse */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-[#24B459]/10 rounded-t-lg">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#24B459]/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Database Lines */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center space-y-2 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 bg-[#24B459]/20 rounded"
                    style={{ width: `${80 - i * 20}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(36, 180, 89, 0)',
                  '0 0 0 10px rgba(36, 180, 89, 0.1)',
                  '0 0 0 20px rgba(36, 180, 89, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: index * 0.3
              }}
            />
          </motion.div>
        ))}

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#24B459] rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Connection Dots */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-3 h-3 bg-[#24B459] rounded-full"
            style={{
              left: i === 0 ? '-40px' : i === 2 ? 'calc(100% + 40px)' : '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </motion.div>
    </div>
  </motion.div>
);

// Network Connectivity Illustration
export const NetworkIcon = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central Hub */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 bg-gray-100 dark:bg-[#2a3444] rounded-full border border-[#24B459]/20"
        >
          {isClient && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(36, 180, 89, 0)',
                  '0 0 0 20px rgba(36, 180, 89, 0.1)',
                  '0 0 0 40px rgba(36, 180, 89, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
          
          {isClient && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-[#24B459]"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/>
                <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/>
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Connection Nodes */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x = Math.cos(angle) * 150;
          const y = Math.sin(angle) * 150;
          
          return (
            <motion.div
              key={i}
              className="absolute w-16 h-16 bg-gray-100 dark:bg-[#2a3444] rounded-lg border border-[#24B459]/20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              {isClient && (
                <>
                  <motion.div
                    className="absolute inset-0 origin-center"
                    style={{
                      background: `linear-gradient(${angle * (180 / Math.PI)}deg, #24B459 0%, transparent 100%)`,
                      opacity: 0.2
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 * i, duration: 0.5 }}
                  />
                  
                  <motion.div
                    className="absolute w-2 h-2 bg-[#24B459] rounded-full"
                    animate={{
                      x: [0, x/2, 0],
                      y: [0, y/2, 0],
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 1, 0.2]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Code Editor Illustration
export const CodeEditorIcon = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const codeLineWidths = [...Array(8)].map((_, i) => ((i + 1) * 123) % 40 + 20);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-[500px] h-[300px] bg-gray-100 dark:bg-[#2a3444] rounded-lg border border-[#24B459]/20 overflow-hidden"
        >
          {/* Window Header */}
          <div className="h-8 bg-gray-200 dark:bg-[#1a1f2b] flex items-center px-4 space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"/>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"/>
            <div className="w-3 h-3 rounded-full bg-green-500/50"/>
          </div>

          {/* Code Lines */}
          <div className="p-4 space-y-2">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center space-x-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="w-8 text-[#24B459]/40 text-sm">{i + 1}</div>
                <motion.div
                  className="h-4 bg-[#24B459]/10 rounded"
                  style={{ width: `${codeLineWidths[i]}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 * i }}
                />
              </motion.div>
            ))}

            {/* Cursor */}
            {isClient && (
              <motion.div
                className="absolute w-2 h-4 bg-[#24B459]"
                style={{ left: '60px', top: '80px' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>

          {/* Floating Code Symbols */}
          {isClient && ['{', '}', '(', ')', '<', '>'].map((symbol, i) => {
            const pos = generatePositions(1, i + 1)[0];
            return (
              <motion.div
                key={i}
                className="absolute text-[#24B459]/30 text-xl"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {symbol}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Data Visualization Illustration
export const DataVizIcon = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const barHeights = [...Array(6)].map((_, i) => ((i + 1) * 456) % 130 + 20);
  const particlePositions = generatePositions(10);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-[500px] h-[300px] bg-gray-100 dark:bg-[#2a3444] rounded-lg border border-[#24B459]/20 p-8"
        >
          {/* Bar Chart */}
          <div className="absolute bottom-8 left-8 flex items-end space-x-4 h-[200px]">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 bg-[#24B459]/80 rounded-t"
                initial={{ height: 0 }}
                animate={{ height: `${barHeights[i]}px` }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {isClient && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-full bg-white dark:bg-white"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{
                      duration: 1,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Line Chart */}
          {isClient && (
            <motion.svg
              className="absolute top-8 right-8 w-[200px] h-[200px]"
              viewBox="0 0 100 100"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            >
              <motion.path
                d="M0,50 Q25,20 50,50 T100,50"
                fill="none"
                stroke="#24B459"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {[0, 25, 50, 75, 100].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={50 + Math.sin((x/100) * Math.PI) * 20}
                  r="2"
                  fill="#24B459"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </motion.svg>
          )}

          {/* Floating Data Points */}
          {isClient && particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#24B459]"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 1, 0.2]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}; 