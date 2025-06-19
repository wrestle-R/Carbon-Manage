"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from 'react-router-dom';

export const HeroParallax = ({ products }) => {
  // Ensure at least 15 products by repeating if needed
  const filledProducts = [];
  for (let i = 0; i < 15; i++) {
    filledProducts.push(products[i % products.length]);
  }
  const firstRow = filledProducts.slice(0, 5);
  const secondRow = filledProducts.slice(5, 10);
  const thirdRow = filledProducts.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden bg-black antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, idx) => (
            <ProductCard product={product} translate={translateX} key={product.title + idx} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product, idx) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title + idx} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product, idx) => (
            <ProductCard product={product} translate={translateX} key={product.title + idx} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 
        className="text-2xl md:text-7xl font-bold text-white font-mono tracking-wider"
        style={{
          fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
          textShadow: '0 0 30px rgba(255,255,255,0.3)'
        }}
      >
        CARBON MANAGE <br /> 
        <span className="text-gray-400">SOLUTIONS</span>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-gray-300 font-light tracking-wide leading-relaxed">
        Revolutionary carbon-neutral technology products designed for a sustainable future. 
        We create intelligent environmental solutions that monitor, reduce, and optimize 
        your carbon footprint through cutting-edge innovation.
      </p>
      
      <motion.div 
        className="mt-12 flex space-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Link to="/dual-carousel">
          <button 
            className="px-8 py-4 bg-white text-black font-mono font-bold tracking-widest uppercase text-xs hover:bg-gray-200 transition-colors duration-300"
          >
            Explore Products
          </button>
        </Link>
        <Link to="/features">
          <button 
            className="px-8 py-4 border border-gray-600 text-white font-mono font-light tracking-widest uppercase text-xs hover:border-white transition-colors duration-300"
          >
            Learn More
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 border border-gray-800 group-hover/product:border-gray-600 transition-all duration-300"
          alt={product.title}
          style={{ filter: 'brightness(0.8) contrast(1.1)' }}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-70 bg-black pointer-events-none transition-opacity duration-300"></div>
      <h2 
        className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-mono font-bold tracking-wider uppercase text-sm transition-opacity duration-300"
        style={{
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}
      >
        {product.title}
      </h2>
    </motion.div>
  );
};
