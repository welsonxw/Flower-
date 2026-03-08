'use client'

import { motion } from 'framer-motion'

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Main content */}
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Decorative flowers */}
        <motion.div
          className="flex justify-center gap-4 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="text-4xl animate-bounce-gentle">🌸</span>
          <span className="text-4xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>🌷</span>
          <span className="text-4xl animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>🌹</span>
          <span className="text-4xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>🌻</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Bloom for Her 🌸
        </motion.h1>

        {/* Flower emoji decoration */}
        <motion.span
          className="text-5xl md:text-6xl inline-block mb-6"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          
        </motion.span>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-pink-400 mb-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A small flower for someone who continues to grow, inspire, and shine. As every dream you chase makes the world a little brighter.
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Create a beautiful animated bouquet to honor the amazing women in your life
          this International Women's Day */}
        </motion.p>

        {/* Start Button */}
        <motion.button
          onClick={onStart}
          className="group relative px-10 py-4 bg-gradient-to-r from-pink-400 to-lavender-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Start
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-lavender-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        {/* International Women's Day badge */}
        <motion.div
          className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm text-pink-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* <span>💜</span>
          <span>International Women's Day 2026</span>
          <span>💜</span> */}
        </motion.div>
      </motion.div>
    </div>
  )
}
