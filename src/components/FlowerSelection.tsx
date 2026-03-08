'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FlowerType, UserData } from '@/app/page'
import { saveSubmission } from '@/lib/supabase'
import { Rose, Lily, Tulip, Sunflower } from './flowers'

interface FlowerSelectionProps {
  onSubmit: (data: UserData) => void
}

const flowers = [
  { type: 'rose' as FlowerType, name: 'Rose', color: 'from-red-100 to-pink-200', meaning: 'Warmth & Passion' },
  { type: 'lily' as FlowerType, name: 'White Lily', color: 'from-gray-50 to-purple-100', meaning: 'Purity & Grace' },
  { type: 'tulip' as FlowerType, name: 'Tulip', color: 'from-pink-100 to-pink-200', meaning: 'Growth & Confidence' },
  { type: 'sunflower' as FlowerType, name: 'Sunflower', color: 'from-yellow-100 to-amber-200', meaning: 'Joy & Happiness' },
]

const FlowerIcon = ({ type, className }: { type: FlowerType; className?: string }) => {
  switch (type) {
    case 'rose':
      return <Rose className={className} />
    case 'lily':
      return <Lily className={className} />
    case 'tulip':
      return <Tulip className={className} />
    case 'sunflower':
      return <Sunflower className={className} />
  }
}

export default function FlowerSelection({ onSubmit }: FlowerSelectionProps) {
  const [selectedFlower, setSelectedFlower] = useState<FlowerType | null>(null)
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedFlower) {
      setError('Please select a flower')
      return
    }

    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    setIsSubmitting(true)

    try {
      // Save to Supabase
      await saveSubmission({
        name: name.trim(),
        flower: selectedFlower,
      })

      // Proceed to bouquet animation
      onSubmit({
        name: name.trim(),
        flower: selectedFlower,
      })
    } catch (err) {
      console.error('Error:', err)
      // Still proceed even if save fails
      onSubmit({
        name: name.trim(),
        flower: selectedFlower,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        className="w-full max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold gradient-text mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create Your Bouquet
          </motion.h2>
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Choose a flower and personalize your greeting */}
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          className="glass rounded-3xl p-6 md:p-8 card-shadow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSubmit}>
            {/* Flower Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-600 mb-4">
                Select a flower for your bouquet
              </label>
              <div className="grid grid-cols-2 gap-4">
                {flowers.map((flower, index) => (
                  <motion.button
                    key={flower.type}
                    type="button"
                    onClick={() => setSelectedFlower(flower.type)}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedFlower === flower.type
                        ? 'border-pink-400 bg-gradient-to-br ' + flower.color
                        : 'border-gray-200 bg-white/50 hover:border-pink-200 hover:bg-white'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-20 h-24 mx-auto mb-2">
                      <FlowerIcon type={flower.type} className="w-full h-full" />
                    </div>
                    <span className={`text-sm font-medium block ${
                      selectedFlower === flower.type ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {flower.name}
                    </span>
                    <span className={`text-xs block mt-1 ${
                      selectedFlower === flower.type ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {flower.meaning}
                    </span>
                    {selectedFlower === flower.type && (
                      <motion.div
                        className="absolute top-2 right-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                maxLength={50}
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.p
                className="text-red-400 text-sm mb-4 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-pink-400 to-lavender-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                  Creating...
                </>
              ) : (
                <>
                  <span>Create Bouquet</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}
