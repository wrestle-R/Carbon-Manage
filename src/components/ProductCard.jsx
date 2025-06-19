import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-900"
    >
      {/* Product Image */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-96 h-96 object-cover border border-gray-700 transition-all duration-300 hover:border-gray-500"
          style={{ minHeight: '192px' }}
        />
      </motion.div>
      
      {/* Product Name */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-2xl font-light text-white mb-3 tracking-wide"
      >
        {product.name}
      </motion.h3>
      
      {/* Product Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-gray-400 mb-4 max-w-xs leading-relaxed font-light text-sm"
      >
        {product.description}
      </motion.p>
      
      {/* Product Price */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-xl font-light text-white mb-6 tracking-wider"
      >
        {product.price}
      </motion.div>
      
      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        onClick={() => onAddToCart(product)}
        className="bg-white hover:bg-gray-200 text-black font-light py-3 px-8 transition-colors duration-300 tracking-widest uppercase text-xs border border-white hover:border-gray-200"
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
};


export default ProductCard;
