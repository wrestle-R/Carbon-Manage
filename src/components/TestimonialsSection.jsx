import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = ({ onComplete }) => {
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
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [-100, -200, -300] }}
          transition={{ duration: 6, times: [0, 0.5, 1], ease: "easeInOut" }}
          onAnimationComplete={onComplete}
          className="flex gap-8 pl-20"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-20 left-1/2 transform -translate-x-1/2"
      >
        <h2 className="text-5xl font-bold text-white text-center mb-4">
          What Our Clients Say
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialsSection;