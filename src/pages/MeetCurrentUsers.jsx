import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const companies = [
  "Greenify Labs", "EcoStream", "CarbonEdge", "PlanetPulse", "SustainNet",
  "EnviroSync", "VoltHarvest", "BlueTerra AI", "Urban Roots", "AtmosGrid",
  "VerdantCore", "SolarNest", "ClimateCrew", "EcoMotion", "SmartEarth",
  "NetZeroTech", "GreenMatter", "RegenPath", "EarthLens", "CarbonNeutral Inc",
  "FutureLeaf", "Energix", "NatureChain", "ZeroShift", "GreenFleet AI",
  "BlueSensor", "CarbonIQ", "SunByte", "AirNest", "CleanPulse",
  "TerraFlow", "EcoVault", "GreenLogic", "WindCore", "HydroMax",
  "BioCycle", "CleanGrid", "EcoForge", "NatureSync", "GreenSpark",
  "ZeroCarbon", "EcoTech", "PurePath", "GreenWave", "ClimateCore"
];

const CompanyShowcase = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [showFlash, setShowFlash] = useState(false);

  const getCompanySet = (setIndex) => {
    const startIndex = (setIndex * 9) % companies.length;
    const set = [];
    for (let i = 0; i < 9; i++) {
      set.push(companies[(startIndex + i) % companies.length]);
    }
    return set;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFlash(true);
      setTimeout(() => {
        setCurrentSet(prev => prev + 1);
        setShowFlash(false);
      }, 200);
    }, 4000); // changed to 4 seconds
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(4px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        duration: 0.6
      }
    },
    exit: {
      y: -30,
      opacity: 0,
      scale: 0.9,
      filter: "blur(2px)",
      transition: {
        duration: 0.2
      }
    }
  };

  const flashVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 0.2,
        times: [0, 0.5, 1]
      }
    }
  };

  return (
    <div className="relative min-h-[60vh] pt-32 bg-black flex items-center justify-center p-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/20 via-black to-black" />
      
      {/* Flash effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
            variants={flashVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Trusted by{' '}
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            forward-thinking teams
          </span>
        </motion.h2>

        {/* Company Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSet}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {getCompanySet(currentSet).map((company, index) => (
                <motion.div
                  key={`${currentSet}-${index}`}
                  className="group"
                  variants={itemVariants}
                >
                  <div className="relative p-6 md:p-8 rounded-2xl border border-gray-800/50 bg-gray-900/20 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-800/30 cursor-pointer overflow-hidden">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-2xl" />
                    
                    {/* Company name */}
                    <div className="relative z-10">
                      <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-gray-100 transition-all duration-300 text-center group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                        {company}
                      </h3>
                    </div>

                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle indicators */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-600"
                animate={{
                  scale: currentSet % 5 === i ? 1.5 : 1,
                  opacity: currentSet % 5 === i ? 1 : 0.3
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyShowcase;
                  