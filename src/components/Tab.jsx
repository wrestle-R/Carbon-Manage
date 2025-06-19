import React from 'react';
import { motion } from 'framer-motion';

const Tab = ({ label, icon, isActive, progress, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-xl font-medium transition-all duration-300
        ${isActive 
          ? 'text-white bg-blue-600 shadow-lg' 
          : 'text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white'
        }
      `}
    >
      {/* Progress Bar */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      )}
      
      {/* Content */}
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-sm">
          {label}
        </span>
      </div>
    </button>
  );
};

export default Tab;
