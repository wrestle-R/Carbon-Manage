import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TestimonialBlock from '../components/TestimonialBlock'
import PlansSection from '../components/PlansSection'

const Testimonials = () => {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    // Slower timings for better readability
    const timers = [
      setTimeout(() => setAnimationStep(1), 2200),  // Split words - slightly longer delay
      setTimeout(() => setAnimationStep(2), 4000),  // Show testimonials after slide
      setTimeout(() => setAnimationStep(3), 14000)  // Show plans after testimonials (10s visible)
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  const testimonials = [
    {
      id: 1,
      quote: "Carbon Manage revolutionized our sustainability tracking. We cut emissions by 35% in just 4 months with their real-time insights.",
      name: "Alex Rivera",
      title: "VP of Operations, EcoFlow Industries",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      id: 2,
      quote: "The dashboard is incredibly intuitive. Our team can now identify carbon hotspots instantly and take immediate action.",
      name: "Sarah Chen",
      title: "Sustainability Director, GreenTech Corp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      id: 3,
      quote: "Implementation was seamless. The ROI became apparent within weeks as we optimized our entire carbon footprint strategy.",
      name: "Marcus Johnson",
      title: "CEO, CleanEnergy Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      id: 4,
      quote: "Outstanding analytics and reporting. Carbon Manage transformed how we approach environmental responsibility across all departments.",
      name: "Emma Thompson",
      title: "Environmental Manager, FutureCorp",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format"
    }
  ]

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-black via-slate-900 to-blue-900 overflow-hidden relative">
      {/* Carbon Manage Title Animation */}
      <AnimatePresence mode="wait">
        {animationStep < 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            {animationStep === 0 && (
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="text-7xl font-black text-white tracking-tight"
              >
                Carbon Manage
              </motion.h1>
            )}
            {animationStep === 1 && (
              <div className="flex items-center justify-between w-full px-16">
                <motion.span
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: -320, opacity: 0.15, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-7xl font-black text-blue-400"
                  style={{ willChange: "transform, opacity" }}
                >
                  Carbon
                </motion.span>
                <motion.span
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: 320, opacity: 0.15, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-7xl font-black text-blue-400"
                  style={{ willChange: "transform, opacity" }}
                >
                  Manage
                </motion.span>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Testimonials Camera Pan */}
      {animationStep >= 2 && animationStep < 3 && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-60%" }}
          transition={{ duration: 6.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 flex items-center"
          style={{ width: "320%" }}
        >
          <div className="flex items-center space-x-24 h-full px-24">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 1.2, duration: 1.2, ease: "easeOut" }}
              >
                <TestimonialBlock testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Plans Section */}
      {animationStep >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <PlansSection />
        </motion.div>
      )}
    </div>
  )
}

export default Testimonials
