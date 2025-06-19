import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Leaf, Zap, Target, ChevronRight } from 'lucide-react';

const AIRecommendationsTab = () => {
  const [activeCard, setActiveCard] = useState(0);

  const recommendations = [
    {
      id: 1,
      title: 'Switch to Renewable Energy',
      description: 'Transition to solar panels and wind energy sources to reduce grid dependency by 40%',
      impact: '2,400 tCO₂e saved annually',
      icon: Zap,
      color: 'text-blue-400'
    },
    {
      id: 2,
      title: 'Carbon Offset Portfolio',
      description: 'Invest in verified forest restoration and direct air capture projects',
      impact: '1,200 tCO₂e offset potential',
      icon: Leaf,
      color: 'text-white'
    },
    {
      id: 3,
      title: 'Energy Efficiency Upgrades',
      description: 'Smart HVAC systems and LED lighting can improve building efficiency',
      impact: '35% energy reduction',
      icon: Target,
      color: 'text-blue-300'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % recommendations.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-600 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">
          AI-Powered{' '}
          <span className="text-blue-400">Sustainability Insights</span>
        </h3>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Our intelligent algorithms analyze your operations to suggest personalized 
          carbon reduction strategies and optimization opportunities
        </p>
      </motion.div>

      {/* Recommendation Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: activeCard === index ? 1.05 : 1
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`
              p-6 rounded-xl cursor-pointer transition-all duration-300 border
              ${activeCard === index 
                ? 'bg-gray-800 border-blue-500 shadow-lg' 
                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }
            `}
            onClick={() => setActiveCard(index)}
          >
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <rec.icon className={`w-6 h-6 ${rec.color}`} />
            </div>
            
            <h4 className="text-lg font-bold text-white mb-3">
              {rec.title}
            </h4>
            
            <p className="text-gray-300 text-sm mb-4">
              {rec.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-400 bg-blue-600/20 px-3 py-1 rounded-full">
                {rec.impact}
              </span>
              <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                activeCard === index ? 'text-blue-400 translate-x-1' : 'text-gray-500'
              }`} />
            </div>

            {activeCard === index && (
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-xl"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* AI Processing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <Brain className="w-8 h-8 text-blue-400" />
            <motion.div
              className="absolute -inset-2 border border-blue-400/50 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">AI Analysis in Progress</h4>
            <p className="text-gray-400">Processing 1,247 data points...</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-center">
          {[
            { label: 'Energy Patterns Analyzed', value: '98%' },
            { label: 'Optimization Opportunities', value: '23' },
            { label: 'Projected Savings', value: '$47K' }
          ].map((stat, index) => (
            <div key={stat.label} className="bg-gray-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AIRecommendationsTab;
