import { motion } from 'framer-motion';

const CartNotification = ({ message, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white px-6 py-3 border border-gray-800"
    >
      <div className="flex items-center space-x-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-light text-sm tracking-wide">{message}</span>
      </div>
    </motion.div>
  );
};

export default CartNotification;
