import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    quote: "Carbon Manage transformed how we track our environmental impact. The insights are game-changing for our sustainability goals.",
    name: "Sarah Chen",
    role: "Sustainability Director",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    quote: "The AI-powered recommendations saved us 30% on our carbon footprint within the first quarter. Absolutely brilliant platform.",
    name: "Marcus Rodriguez",
    role: "Environmental Manager",
    image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    quote: "Finally, a tool that makes carbon tracking simple and actionable. The team dashboards are exactly what we needed.",
    name: "Emma Thompson",
    role: "Operations Head",
    image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    quote: "The integration with our existing workflow was seamless. The visualizations are stunning and easy to understand.",
    name: "Liam Patel",
    role: "Chief Data Officer",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    quote: "We love the gamification aspect! Our teams are now competing to reduce emissions.",
    name: "Priya Singh",
    role: "HR Lead",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    quote: "Support is top-notch and the platform keeps getting better. Highly recommended.",
    name: "James Lee",
    role: "Facilities Manager",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    quote: "The mobile dashboard lets me check our progress on the go. Super convenient.",
    name: "Olivia Garcia",
    role: "Project Coordinator",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  }
];

const cardTransforms = [
  { y: 0, rotate: -6, scale: 1 },
  { y: 60, rotate: 4, scale: 0.95 },
  { y: -40, rotate: -3, scale: 1.05 },
  { y: 80, rotate: 8, scale: 0.92 },
  { y: -60, rotate: 6, scale: 1.08 },
  { y: 40, rotate: -8, scale: 0.97 },
  { y: -80, rotate: 10, scale: 1.1 }
];

const TestimonialsSection = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900 overflow-hidden"
    >
      {/* Abstract background blobs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.2, scale: 1.1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-purple-700 rounded-full blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.15, scale: 1.05 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-400 rounded-full blur-2xl"
        />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [-100, -400, -700] }}
          transition={{ duration: 10, times: [0, 0.5, 1], ease: "easeInOut" }}
          onAnimationComplete={onComplete}
          className="flex gap-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: cardTransforms[index % cardTransforms.length].y, rotate: cardTransforms[index % cardTransforms.length].rotate, scale: cardTransforms[index % cardTransforms.length].scale, opacity: 0 }}
              animate={{ y: cardTransforms[index % cardTransforms.length].y, rotate: cardTransforms[index % cardTransforms.length].rotate, scale: cardTransforms[index % cardTransforms.length].scale, opacity: 1 }}
              transition={{ delay: index * 0.25, duration: 0.8, ease: "easeOut" }}
              className="relative"
              style={{
                zIndex: 10 + (index % 3)
              }}
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-20 left-1/2 transform -translate-x-1/2"
      >
        <h2 className="text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
          What Our Clients Say
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialsSection;