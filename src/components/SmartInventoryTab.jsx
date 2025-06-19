import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, AlertCircle, TrendingUp, Warehouse, Radio } from 'lucide-react';

const SmartInventoryTab = () => {
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Steel Beams', quantity: 142, status: 'in-stock', forecast: 89, carbonImpact: 2.1 },
    { id: 2, name: 'Concrete Mix', quantity: 23, status: 'low', forecast: 156, carbonImpact: 0.4 },
    { id: 3, name: 'Insulation Panels', quantity: 0, status: 'out', forecast: 78, carbonImpact: 0.1 },
    { id: 4, name: 'Solar Panels', quantity: 67, status: 'in-stock', forecast: 45, carbonImpact: -1.2 }
  ]);

  const [realTimeUpdates, setRealTimeUpdates] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeUpdates(prev => prev + 1);
      
      setInventoryItems(prev => prev.map(item => ({
        ...item,
        quantity: Math.max(0, item.quantity + Math.floor(Math.random() * 3) - 1)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'text-blue-400 bg-blue-600/20';
      case 'low': return 'text-white bg-gray-600/20';
      case 'out': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const totalCarbonImpact = inventoryItems.reduce((sum, item) => sum + item.carbonImpact, 0);

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
            <Warehouse className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Smart{' '}
          <span className="text-blue-400">Inventory Management</span>
        </h3>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Track materials and assets in real-time with predictive analytics 
          to reduce waste and optimize carbon efficiency
        </p>
      </motion.div>

      {/* Real-time Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-blue-600/10 rounded-xl p-4 mb-8 flex items-center justify-between border border-blue-600/20"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 bg-blue-400 rounded-full"
          />
          <span className="font-semibold text-white">
            Live Updates: {realTimeUpdates} sensors active
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`font-semibold ${totalCarbonImpact > 0 ? 'text-red-400' : 'text-blue-400'}`}>
            Carbon Impact: {totalCarbonImpact > 0 ? '+' : ''}{totalCarbonImpact.toFixed(1)} tCO₂e
          </span>
          <Radio className="w-5 h-5 text-blue-400" />
        </div>
      </motion.div>

      {/* Inventory Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {inventoryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Package className="w-6 h-6 text-gray-400" />
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              {item.status === 'low' && (
                <AlertCircle className="w-5 h-5 text-white animate-pulse" />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Stock</span>
                <span className="font-bold text-white text-lg">{item.quantity}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Forecasted Need</span>
                <span className="font-semibold text-blue-400">{item.forecast}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Carbon Impact</span>
                <span className={`font-semibold ${item.carbonImpact < 0 ? 'text-blue-400' : 'text-white'}`}>
                  {item.carbonImpact > 0 ? '+' : ''}{item.carbonImpact.toFixed(1)} tCO₂e
                </span>
              </div>

              {/* Stock Level Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <motion.div
                  className={`h-2 rounded-full ${
                    item.quantity > 50 ? 'bg-blue-500' :
                    item.quantity > 20 ? 'bg-white' : 
                    'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((item.quantity / 100) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: Radio,
            title: 'Real-Time Updates',
            description: 'IoT sensors provide instant inventory tracking',
            color: 'text-blue-400'
          },
          {
            icon: TrendingUp,
            title: 'Predictive Analytics',
            description: 'AI forecasts material needs 30 days ahead',
            color: 'text-white'
          },
          {
            icon: Truck,
            title: 'Smart Procurement',
            description: 'Automated ordering prevents overconsumption',
            color: 'text-blue-300'
          }
        ].map((feature, index) => (
          <div
            key={feature.title}
            className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h4 className="font-bold text-white mb-2">{feature.title}</h4>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SmartInventoryTab;
