'use client'

import { motion } from 'framer-motion'
import { Rose, Lily, Tulip, Sunflower } from './flowers'

const floatingFlowers = [
  { type: 'rose', size: 'w-10 h-14', x: '5%', y: '10%', delay: 0 },
  { type: 'tulip', size: 'w-12 h-16', x: '85%', y: '15%', delay: 1 },
  { type: 'lily', size: 'w-8 h-12', x: '15%', y: '75%', delay: 2 },
  { type: 'sunflower', size: 'w-10 h-14', x: '90%', y: '70%', delay: 0.5 },
  { type: 'rose', size: 'w-8 h-12', x: '75%', y: '85%', delay: 1.5 },
  { type: 'tulip', size: 'w-10 h-14', x: '10%', y: '45%', delay: 2.5 },
  { type: 'lily', size: 'w-8 h-12', x: '95%', y: '40%', delay: 3 },
  { type: 'sunflower', size: 'w-6 h-8', x: '50%', y: '5%', delay: 0.8 },
  { type: 'rose', size: 'w-8 h-12', x: '30%', y: '90%', delay: 1.8 },
  { type: 'tulip', size: 'w-6 h-8', x: '70%', y: '30%', delay: 2.2 },
]

const FlowerIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case 'rose':
      return <Rose className={className} />
    case 'lily':
      return <Lily className={className} />
    case 'tulip':
      return <Tulip className={className} />
    case 'sunflower':
      return <Sunflower className={className} />
    default:
      return <Rose className={className} />
  }
}

export default function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingFlowers.map((flower, index) => (
        <motion.div
          key={index}
          className={`absolute ${flower.size} opacity-20`}
          style={{ left: flower.x, top: flower.y }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: flower.delay,
          }}
        >
          <FlowerIcon type={flower.type} className="w-full h-full" />
        </motion.div>
      ))}

      {/* Gradient orbs for ambient effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-pink-200/30 blur-3xl"
        style={{ top: '-10%', left: '-10%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-lavender-200/30 blur-3xl"
        style={{ bottom: '-10%', right: '-10%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-cream-100/40 blur-3xl"
        style={{ top: '40%', left: '60%' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  )
}
