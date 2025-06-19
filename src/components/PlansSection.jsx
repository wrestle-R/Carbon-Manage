import React from 'react'
import { motion } from 'framer-motion'

const PlansSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: [
        "Basic carbon tracking",
        "Monthly reports",
        "Email support",
        "Up to 5 team members"
      ],
      gradient: "from-purple-600 to-purple-800",
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      features: [
        "Advanced analytics",
        "Real-time monitoring",
        "API access",
        "Up to 25 team members",
        "Priority support"
      ],
      gradient: "from-blue-600 to-blue-800",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: [
        "Custom integrations",
        "Dedicated account manager",
        "Advanced security",
        "Unlimited team members",
        "24/7 phone support"
      ],
      gradient: "from-purple-800 to-black",
      popular: false
    }
  ]

  return (
    <div className="h-full flex items-center justify-center px-16">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-300">Scale your carbon management</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`relative bg-gradient-to-br ${plan.gradient} rounded-3xl p-8 border-2 ${
                plan.popular ? 'border-blue-400 scale-105' : 'border-purple-500/30'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-end justify-center">
                  <span className="text-5xl font-black text-white font-mono tracking-tight">{plan.price}</span>
                  <span className="text-lg text-gray-300 ml-1 font-light">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-200">
                    <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlansSection
