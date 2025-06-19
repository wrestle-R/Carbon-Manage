"use client"

import { useState, useEffect } from "react"

const ProfessionalFloatingCard = ({ cardData, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false)

  const renderChart = () => {
    switch (cardData.chartType) {
      case "donut":
        return (
          <div className="relative w-20 h-20 mx-auto mb-4">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(75, 85, 99, 0.2)"
                strokeWidth="2.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={cardData.color}
                strokeWidth="2.5"
                strokeDasharray={`${cardData.percentage}, 100`}
                className="animate-draw-circle"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-bold text-white">{cardData.percentage}%</div>
              </div>
            </div>
          </div>
        )
      case "bar":
        return (
          <div className="flex items-end justify-center space-x-1.5 h-16 mb-4 px-2">
            {cardData.barData.map((height, index) => (
              <div
                key={index}
                className="w-2.5 rounded-t-sm animate-grow-bar"
                style={{
                  height: `${height}%`,
                  background: `linear-gradient(to top, ${cardData.color}60, ${cardData.color})`,
                  animationDelay: `${index * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        )
      case "line":
        return (
          <div className="relative h-16 mb-4 px-2">
            <svg className="w-full h-full" viewBox="0 0 80 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`gradient-${cardData.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={cardData.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={cardData.color} stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <polygon
                fill={`url(#gradient-${cardData.id})`}
                points={`0,40 ${cardData.lineData} 80,40`}
                className="animate-fill-area"
              />
              <polyline
                fill="none"
                stroke={cardData.color}
                strokeWidth="2"
                points={cardData.lineData}
                className="animate-draw-line"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-16 mb-4">
            <div
              className="w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${cardData.color}20, ${cardData.color}40)` }}
            >
              <span className="text-2xl">{cardData.icon}</span>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className={`relative ${className} cursor-pointer group transition-transform duration-500 hover:scale-110`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(24, 24, 27, 0.55)',
        borderRadius: '1.2rem',
        boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.14)',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '1rem',
        minWidth: '170px',
        maxWidth: '200px',
        minHeight: '120px',
        zIndex: 10,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-1">
          <span className="text-base">{cardData.icon}</span>
          <span className="text-[10px] font-semibold text-gray-200 uppercase tracking-wider">{cardData.category}</span>
        </div>
        <span className="text-[10px] text-gray-400 font-mono">{cardData.id.toString().padStart(2, "0")}</span>
      </div>
      {/* Chart/Visual */}
      <div className="my-1">{typeof renderChart === 'function' ? renderChart(cardData) : null}</div>
      {/* Main Value */}
      <div className="text-lg font-black text-white mb-0.5 tracking-tight">{cardData.value}</div>
      <div className="text-[10px] text-gray-300 leading-tight font-medium mb-1">{cardData.label}</div>
      {/* Trend indicator */}
      <div className="text-[10px] px-1.5 py-0.5 rounded-full font-medium inline-block mb-1"
        style={{
          background: cardData.trend === 'up' ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
          color: cardData.trend === 'up' ? '#ef4444' : '#10b981',
          border: `1px solid ${cardData.trend === 'up' ? '#ef4444' : '#10b981'}22`,
        }}
      >
        {cardData.trend === 'up' ? '↗' : '↘'} {cardData.trendValue}
      </div>
      {/* Hover Stats Popup */}
      {isHovered && (
        <div className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 bg-black/80 text-white rounded-xl shadow-xl border border-white/10 p-3 z-50 backdrop-blur-md animate-fade-in-up">
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-cyan-400 font-bold">{cardData.stat1Value}</span>
              <span className="text-gray-300">{cardData.stat1Label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-400 font-bold">{cardData.stat2Value}</span>
              <span className="text-gray-300">{cardData.stat2Label}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const HeroSection = () => {
  const professionalCards = [
    {
      id: 1,
      icon: "🌡️",
      category: "TEMP",
      chartType: "line",
      lineData: "0,35 10,30 20,25 30,20 40,15 50,10 60,8 70,5 80,3",
      color: "#ef4444",
      value: "+1.1°C",
      label: "Global Rise",
      trend: "up",
      trendValue: "0.2°",
    },
    {
      id: 2,
      icon: "🏭",
      category: "CO₂",
      chartType: "bar",
      barData: [60, 75, 70, 85, 80, 90, 95, 100],
      color: "#f59e0b",
      value: "36.8Gt",
      label: "Annual CO₂",
      trend: "up",
      trendValue: "2.1%",
    },
    {
      id: 3,
      icon: "🌊",
      category: "SEA",
      chartType: "line",
      lineData: "0,35 10,32 20,28 30,25 40,20 50,15 60,12 70,8 80,5",
      color: "#06b6d4",
      value: "3.4mm",
      label: "Per Year",
      trend: "up",
      trendValue: "0.3mm",
    },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-cyan-900/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Main Hero Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto relative">
          {/* Floating Professional Cards positioned beside main text */}
          <div className="hidden lg:block">
            {/* Left side card */}
            <div className="absolute left-[-220px] top-[-80px] z-30" style={{
              animation: `gentleFloat 8s ease-in-out infinite`,
              animationDelay: `0s`,
            }}>
              <ProfessionalFloatingCard cardData={professionalCards[0]} />
            </div>
            {/* Right side cards */}
            <div className="absolute right-[-220px] top-[-40px] z-30" style={{
              animation: `gentleFloat 8s ease-in-out infinite`,
              animationDelay: `2s`,
            }}>
              <ProfessionalFloatingCard cardData={professionalCards[1]} />
            </div>
            <div className="absolute right-[-180px] top-[140px] z-30" style={{
              animation: `gentleFloat 8s ease-in-out infinite`,
              animationDelay: `4s`,
            }}>
              <ProfessionalFloatingCard cardData={professionalCards[2]} />
            </div>
          </div>

          {/* Mobile stacked cards */}
          <div className="lg:hidden flex flex-col items-center gap-4 mb-8">
            <ProfessionalFloatingCard cardData={professionalCards[0]} />
            <ProfessionalFloatingCard cardData={professionalCards[1]} />
            <ProfessionalFloatingCard cardData={professionalCards[2]} />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            Climate Action Starts Here
          </div>

          {/* Main Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight animate-fade-in-up relative"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="block">Reduce Your</span>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-300% animate-gradient">
              Carbon Footprint
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Track your emissions, discover reduction strategies, and offset your impact with
            <span className="text-emerald-400 font-medium"> AI-powered insights</span>
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Carbon Analysis
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="px-8 py-4 bg-gray-800/50 text-gray-300 font-semibold rounded-2xl border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-300 backdrop-blur-sm">
              View Demo
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
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
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        
        @keyframes draw-circle {
          from {
            stroke-dasharray: 0, 100;
          }
          to {
            stroke-dasharray: var(--percentage), 100;
          }
        }
        
        @keyframes grow-bar {
          from {
            height: 0%;
          }
          to {
            height: var(--height);
          }
        }
        
        @keyframes draw-line {
          from {
            stroke-dasharray: 0, 300;
          }
          to {
            stroke-dasharray: 300, 0;
          }
        }
        
        @keyframes fill-area {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-draw-circle {
          animation: draw-circle 2s ease-out forwards;
        }
        
        .animate-grow-bar {
          animation: grow-bar 1.5s ease-out forwards;
        }
        
        .animate-draw-line {
          animation: draw-line 2s ease-out forwards;
        }
        
        .animate-fill-area {
          animation: fill-area 2s ease-out forwards;
        }
        
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  )
}

export default HeroSection