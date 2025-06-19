import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Filter, TrendingDown } from 'lucide-react';

const EmissionsTab = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredBar, setHoveredBar] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects', color: 'from-white to-gray-300' },
    { id: 'refurbishment', label: 'Refurbishment', color: 'from-blue-400 to-blue-500' },
    { id: 'newbuild', label: 'New Build', color: 'from-blue-500 to-blue-600' }
  ];

  const chartData = [
    { year: '2020', refurb: 45, newbuild: 78, target: 60 },
    { year: '2021', refurb: 38, newbuild: 72, target: 55 },
    { year: '2022', refurb: 32, newbuild: 65, target: 50 },
    { year: '2023', refurb: 28, newbuild: 58, target: 45 },
    { year: '2024', refurb: 25, newbuild: 52, target: 40 }
  ];

  const getFilteredData = () => {
    switch (activeFilter) {
      case 'refurbishment':
        return chartData.map(d => ({ ...d, value: d.refurb }));
      case 'newbuild':
        return chartData.map(d => ({ ...d, value: d.newbuild }));
      default:
        return chartData.map(d => ({ ...d, value: (d.refurb + d.newbuild) / 2 }));
    }
  };

  return (
    <div className="relative rounded-3xl p-8 border border-blue-400/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-in-up">
      {/* Glowing background shapes */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative z-10"
      >
        <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-300% drop-shadow-lg">
          Embodied Carbon <span className="text-blue-400">Emissions Tracking</span>
        </h3>
        <p className="text-gray-200 text-lg drop-shadow-md">
          Monitor emissions across project types with intelligent carbon target alignment
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="flex space-x-2 bg-white/10 backdrop-blur-xl rounded-xl p-2 border border-blue-400/20 shadow-lg">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 relative
                ${activeFilter === filter.id 
                  ? `bg-gradient-to-r ${filter.color} text-black shadow-lg ring-2 ring-cyan-400/40` 
                  : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-md'
                }
              `}
              style={{backdropFilter: 'blur(6px)'}}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative rounded-2xl p-6 border border-blue-400/10 bg-white/5 backdrop-blur-xl shadow-xl overflow-x-auto">
        <div className="h-64 flex items-end justify-between space-x-4">
          {getFilteredData().map((data, index) => (
            <motion.div
              key={data.year}
              className="flex-1 flex flex-col items-center group relative"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="w-full relative mb-3 flex items-end justify-center" style={{height: '100%'}}>
                <motion.div
                  className={`w-8 rounded-t-xl shadow-lg transition-all duration-300 cursor-pointer ${
                    activeFilter === 'refurbishment' ? 'bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300' :
                    activeFilter === 'newbuild' ? 'bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400' : 
                    'bg-gradient-to-t from-white via-blue-200 to-cyan-200'
                  } ${hoveredBar === index ? 'ring-4 ring-cyan-400/30 scale-105' : ''}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${data.value * 2.5}px` }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                />
                {/* Tooltip on hover */}
                {hoveredBar === index && (
                  <div className="absolute bottom-full mb-2 px-3 py-1 rounded-lg bg-black/80 text-white text-xs font-semibold shadow-xl border border-cyan-400/30 animate-fade-in-up z-20">
                    {data.value.toFixed(1)} tCO₂e
                  </div>
                )}
                {/* Target line with glowing dot */}
                <div 
                  className="absolute w-full flex items-center"
                  style={{ bottom: `${data.target * 2.5}px` }}
                >
                  <div className="w-full border-t-2 border-cyan-400 border-dashed relative"></div>
                  <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg border-2 border-white absolute -right-2 -top-2 animate-pulse"></div>
                  <span className="absolute -right-8 -top-2 text-xs text-cyan-300 font-semibold bg-black/60 px-2 py-0.5 rounded-lg border border-cyan-400/30 shadow-md">Target</span>
                </div>
              </div>
              <span className="text-white font-semibold mb-1 mt-2">{data.year}</span>
              <span className="text-sm text-cyan-200">{data.value.toFixed(1)} tCO₂e</span>
            </motion.div>
          ))}
        </div>
        {/* Legend */}
        <div className="flex justify-center mt-6 space-x-6">
          <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-blue-400/20">
            <div className={`w-4 h-4 rounded-full shadow-md ${
              activeFilter === 'refurbishment' ? 'bg-gradient-to-r from-blue-600 to-blue-400' :
              activeFilter === 'newbuild' ? 'bg-gradient-to-r from-blue-700 to-blue-500' : 
              'bg-gradient-to-r from-white to-gray-300'
            }`}></div>
            <span className="text-sm text-cyan-200 font-semibold">Emissions</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-blue-400/20">
            <div className="w-4 h-0.5 border-t-2 border-cyan-400 border-dashed"></div>
            <span className="text-sm text-cyan-200 font-semibold">Carbon Target</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 grid md:grid-cols-3 gap-6 relative z-10"
      >
        {[
          { icon: TrendingDown, label: 'Average Reduction', value: '23%', color: 'text-blue-400' },
          { icon: BarChart3, label: 'Best Performance', value: 'Refurbishment', color: 'text-white' },
          { icon: Filter, label: 'Projects Tracked', value: '147', color: 'text-blue-300' }
        ].map((insight, index) => (
          <div 
            key={insight.label} 
            className="text-center p-6 bg-white/10 rounded-2xl border border-blue-400/20 shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-md group relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-cyan-400/10 rounded-full blur-xl z-0 group-hover:scale-110 transition-transform"></div>
            <insight.icon className={`w-10 h-10 ${insight.color} mx-auto mb-3 drop-shadow-lg`} />
            <div className="text-3xl font-extrabold text-cyan-200 mb-1 drop-shadow-lg">{insight.value}</div>
            <div className="text-base text-cyan-100 font-medium drop-shadow">{insight.label}</div>
          </div>
        ))}
      </motion.div>
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
    </div>
  );
};

export default EmissionsTab;
