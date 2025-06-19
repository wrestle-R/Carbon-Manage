import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tab from '../components/Tab';
import StatisticsTab from '../components/StatisticsTab';
import EmissionsTab from '../components/EmissionsTab';
import AIRecommendationsTab from '../components/AIRecommendationsTab';
import SmartInventoryTab from '../components/SmartInventoryTab';

const TABS = [
  { id: 'statistics', label: 'Statistics', icon: '📊' },
  { id: 'emissions', label: 'Emissions Graph', icon: '📈' },
  { id: 'ai', label: 'AI Recommendations', icon: '💡' },
  { id: 'inventory', label: 'Smart Inventory', icon: '📦' }
];

const TAB_DURATION = 6000; // 6 seconds

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(0);
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, TAB_DURATION);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (TAB_DURATION / 100));
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setProgress(0);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <StatisticsTab />;
      case 1:
        return <EmissionsTab />;
      case 2:
        return <AIRecommendationsTab />;
      case 3:
        return <SmartInventoryTab />;
      default:
        return <StatisticsTab />;
    }
  };

  return (
    <section className="relative py-20 px-6 min-h-screen bg-black " >
      {/* Floating shapes/particles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s', transform: 'translate(-50%, -50%)'}}></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-400 to-black bg-clip-text text-transparent animate-gradient bg-300% drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-white via-gray-400 to-black bg-clip-text text-transparent animate-gradient bg-300%">Carbon Manage</span>?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our comprehensive platform empowers businesses to track, analyze, and reduce their carbon footprint 
            with intelligent insights and automated solutions.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-3 bg-white/5 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-2xl relative overflow-hidden" style={{boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)'}}>
            {/* Glowing border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/10 pointer-events-none animate-pulse-border"></div>
            {TABS.map((tab, index) => (
              <Tab
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={index === activeTab}
                progress={index === activeTab ? progress : 0}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 min-h-[600px] flex flex-col justify-center animate-fade-in-up">
                {renderTabContent()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style jsx>{`
        .bg-300% {
          background-size: 300% 300%;
        }
        .animate-gradient {
          animation: gradient 4s ease-in-out infinite;
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        @keyframes pulse-border {
          0%, 100% {
            border-color: rgba(255,255,255,0.1);
          }
          50% {
            border-color: rgba(255,255,255,0.3);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
          opacity: 0;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Features;
