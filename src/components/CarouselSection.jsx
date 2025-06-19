import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from './Carousel';

const CarouselSection = ({ title, products, onAddToCart, onViewDetails, side }) => {
  const [isHovered, setIsHovered] = useState(false);

  const sideClasses = side === 'left' 
    ? 'bg-black border-r border-gray-800' 
    : 'bg-black';

  return (
    <motion.div
      className={`w-1/2 h-full flex flex-col items-center justify-center ${sideClasses} cursor-pointer relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Title - Always visible */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ 
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.9 : 1,
          y: isHovered ? -30 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-light text-center text-white mb-6 tracking-wide">
          {title}
        </h2>
        <div className="w-24 h-px bg-white"></div>
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHovered ? 0 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 text-sm mt-8 font-light tracking-wider uppercase"
        >
          Hover to explore
        </motion.p>
      </motion.div>

      {/* Products - Only visible on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-20 bg-gray-900 flex flex-col h-full"
          >
            {/* Category header when products are visible */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-gray-900 border-b border-gray-700 flex-shrink-0"
            >
              <h3 className="text-2xl font-light text-center text-white mb-3 tracking-wide">
                {title}
              </h3>
              <div className="w-16 h-px bg-white mx-auto"></div>
            </motion.div>
            
            {/* Carousel */}
            <div className="flex-1 relative bg-gray-900 overflow-hidden">
              <Carousel
                products={products}
                isHovered={isHovered}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 bg-white text-black px-4 py-2 text-xs font-light tracking-wider uppercase"
              >
                Auto-cycling
              </motion.div>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-px bg-white flex-shrink-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CarouselSection;
