import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target } from 'lucide-react';

const StatisticsTab = () => {
  const [counters, setCounters] = useState({
    emissions: 0,
    energy: 0,
    improvement: 0
  });

  const targetValues = {
    emissions: 45672,
    energy: 125,
    improvement: 34
  };

  useEffect(() => {
    const animateCounter = (key, target) => {
      const duration = 1500;
      const steps = 30;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.floor(increment * step), target);
        
        setCounters(prev => ({
          ...prev,
          [key]: current
        }));

        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return timer;
    };

    const timers = [
      animateCounter('emissions', targetValues.emissions),
      setTimeout(() => animateCounter('energy', targetValues.energy), 200),
      setTimeout(() => animateCounter('improvement', targetValues.improvement), 400)
    ];

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      label: 'Total CO₂e Managed',
      value: counters.emissions.toLocaleString(),
      unit: 'tCO₂e',
      color: 'text-blue-400'
    },
    {
      icon: Zap,
      label: 'Energy Intensity',
      value: counters.energy,
      unit: 'kWh/m²',
      color: 'text-white'
    },
    {
      icon: Target,
      label: 'Improvement vs Base Year',
      value: counters.improvement,
      unit: '%',
      color: 'text-blue-300'
    }
  ];

  return (
    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          Real-Time{' '}
          <span className="text-blue-400">Carbon Impact</span>
        </h3>
        <p className="text-gray-300 text-lg">
          Track your environmental progress with comprehensive metrics
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center group hover:scale-105 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            
            <div className="mb-3">
              <span className="text-4xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-lg text-gray-400 ml-2">
                {stat.unit}
              </span>
            </div>
            
            <p className="text-gray-300 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { label: 'Emissions Reduction', progress: 78, color: 'from-blue-600 to-blue-400' },
          { label: 'Energy Efficiency', progress: 65, color: 'from-white to-gray-300' },
          { label: 'Target Achievement', progress: 89, color: 'from-blue-400 to-blue-300' }
        ].map((item, index) => (
          <div key={item.label} className="text-center">
            <div className="flex justify-between text-sm text-gray-300 mb-3">
              <span>{item.label}</span>
              <span className="text-white font-semibold">{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatisticsTab;
