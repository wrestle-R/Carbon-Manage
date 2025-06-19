import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading', 'morphing', 'zooming'

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start morphing phase
          setTimeout(() => setPhase('morphing'), 200);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === 'morphing') {
      // After morphing animation, start zoom
      setTimeout(() => setPhase('zooming'), 800);
    } else if (phase === 'zooming') {
      // After zoom animation, trigger completion
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 600);
    }
  }, [phase, onComplete]);

  const progressWidth = (progress / 100) * 400; // 400px max width (increased from 300px)

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Counter in bottom-left */}
      <motion.div 
        className="absolute bottom-8 left-8 text-white text-8xl font-mono font-bold tracking-[0.3em] select-none"
        style={{
          fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {String(progress).padStart(2, '0')}
      </motion.div>

      {/* Progress Bar / C Shape Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div
              key="progress-bar"
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar Background */}
              <div className="w-[400px] h-[38px] bg-gray-800 rounded-full">
                {/* Progress Bar Fill */}
                <motion.div
                  className="h-full bg-white rounded-full"
                  style={{ width: progressWidth }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}

          {(phase === 'morphing' || phase === 'zooming') && (
            <motion.div
              key="c-shape"
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                scale: phase === 'zooming' ? 10 : 1
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                scale: { 
                  duration: phase === 'zooming' ? 0.6 : 0,
                  ease: "easeInOut"
                }
              }}
            >
              {/* C Shape - Top Part */}
              <motion.div
                className="absolute bg-white"
                initial={{ 
                  width: 8,
                  height: 8,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  width: 40,
                  height: 12,
                  x: -20,
                  y: -30
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              />
              
              {/* C Shape - Vertical Part */}
              <motion.div
                className="absolute bg-white"
                initial={{ 
                  width: 8,
                  height: 8,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  width: 12,
                  height: 60,
                  x: -26,
                  y: -30
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              />

              {/* C Shape - Bottom Part */}
              <motion.div
                className="absolute bg-white"
                initial={{ 
                  width: 8,
                  height: 8,
                  x: 392,
                  y: 0
                }}
                animate={{ 
                  width: 40,
                  height: 12,
                  x: -20,
                  y: 18
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Loader;