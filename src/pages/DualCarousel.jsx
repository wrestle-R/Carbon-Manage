import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CarouselSection from '../components/CarouselSection';
import CartNotification from '../components/CartNotification';
import productsData from '../data/productsData';

const DualCarousel = () => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setNotification({
      message: `${product.name} added to cart`,
      type: 'success'
    });

    setTimeout(() => setNotification(null), 2500);
  };

  const viewProductDetails = (product) => {
    setNotification({
      message: `Viewing details for ${product.name}`,
      type: 'info'
    });

    setTimeout(() => setNotification(null), 2500);
    
    // Here you could implement modal opening, navigation, etc.
    console.log('Product details:', product);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Cart indicator - Only show when there are items */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 px-6 py-3"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.1M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.1" />
              </svg>
              <span className="font-light text-black text-sm tracking-wide">
                Cart ({cartItemCount})
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main title overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 text-center"
      >
        <h1 className="text-lg font-light text-white mb-2 tracking-widest uppercase">
          Product Categories
        </h1>
        <div className="w-12 h-px bg-white mx-auto"></div>
      </motion.div>

      {/* Main carousel sections */}
      <div className="flex h-full w-full">
        <CarouselSection
          title="Eco Bottles"
          products={productsData.left}
          onAddToCart={addToCart}
          onViewDetails={viewProductDetails}
          side="left"
        />
        <CarouselSection
          title="Smart Sensors"
          products={productsData.right}
          onAddToCart={addToCart}
          onViewDetails={viewProductDetails}
          side="right"
        />
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <CartNotification
            message={notification.message}
            type={notification.type}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DualCarousel;
