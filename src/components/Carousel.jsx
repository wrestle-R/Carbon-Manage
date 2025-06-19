import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

const Carousel = ({ products, isHovered, onAddToCart, onViewDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, products.length]);

  return (
    <div className="relative w-full h-full bg-gray-900">
      <AnimatePresence mode="wait">
        <ProductCard
          key={`${products[currentIndex].id}-${currentIndex}`}
          product={products[currentIndex]}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
