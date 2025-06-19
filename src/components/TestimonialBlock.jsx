import React from 'react'
import { motion } from 'framer-motion'

const TestimonialBlock = ({ testimonial }) => {
  // Create asymmetric variations for different testimonials - made wider
  const getBlockStyle = (id) => {
    const styles = {
      1: "h-64 w-96 rotate-2",
      2: "h-72 w-88 -rotate-1",
      3: "h-60 w-100 rotate-1",
      4: "h-68 w-92 -rotate-2"
    }
    return styles[id] || "h-64 w-96"
  }

  const getGradient = (id) => {
    const gradients = {
      1: "from-purple-600/30 to-blue-700/40",
      2: "from-blue-600/30 to-purple-700/40",
      3: "from-purple-700/30 to-blue-600/40",
      4: "from-blue-700/30 to-purple-600/40"
    }
    return gradients[id] || "from-purple-600/30 to-blue-700/40"
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${getBlockStyle(testimonial.id)} bg-gradient-to-br ${getGradient(testimonial.id)} backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xl`}
    >
      {/* Quote Text */}
      <div className="flex-1 flex items-center">
        <p className="text-white text-lg leading-relaxed font-medium">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author Info */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <h4 className="text-blue-300 font-semibold text-lg">{testimonial.name}</h4>
        <p className="text-purple-300 text-sm opacity-90">{testimonial.title}</p>
      </div>
    </motion.div>
  )
}

export default TestimonialBlock
