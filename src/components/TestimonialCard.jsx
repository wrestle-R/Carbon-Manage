import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.5, duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 8px 32px 0 rgba(0, 118, 255, 0.25)",
        borderColor: "#7dd3fc"
      }}
      className="bg-white rounded-2xl p-8 shadow-2xl border-l-8 border-gradient-to-b from-blue-400 via-cyan-400 to-blue-600 min-w-[320px] max-w-[420px] sm:min-w-[400px] sm:max-w-[500px] transition-all duration-300"
      style={{
        borderImage: "linear-gradient(to bottom, #3b82f6, #06b6d4, #2563eb) 1"
      }}
    >
      <div className="mb-6">
        <p className="text-gray-800 text-lg leading-relaxed italic">
          "{testimonial.quote}"
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
            {testimonial.name.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;