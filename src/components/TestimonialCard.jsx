import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.5, duration: 0.8, ease: "easeOut" }}
      className="bg-white rounded-2xl p-8 shadow-2xl border-l-4 border-blue-500 min-w-[500px] max-w-[500px]"
    >
      <div className="mb-6">
        <p className="text-gray-800 text-lg leading-relaxed italic">
          "{testimonial.quote}"
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
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