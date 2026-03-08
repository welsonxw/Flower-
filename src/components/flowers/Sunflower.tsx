'use client'

import { motion } from 'framer-motion'

interface SunflowerProps {
  className?: string
  animate?: boolean
}

export default function Sunflower({ className = '', animate = false }: SunflowerProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const animateProps = animate ? {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  } : {}

  // Generate petal positions
  const petalCount = 16
  const petals = Array.from({ length: petalCount }, (_, i) => ({
    angle: (360 / petalCount) * i,
    length: i % 2 === 0 ? 28 : 24,
  }))

  return (
    <Wrapper
      viewBox="0 0 100 180"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...animateProps}
    >
      {/* Stem */}
      <path
        d="M50 180 Q48 140 50 100 Q52 85 50 75"
        stroke="#2d5a27"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaves */}
      <path
        d="M50 150 Q20 135 15 105 Q30 125 50 135"
        fill="#4a7c43"
      />
      <path
        d="M50 130 Q80 115 85 85 Q70 105 50 118"
        fill="#3d6b35"
      />
      
      {/* Petals - back layer */}
      {petals.map((petal, i) => (
        <ellipse
          key={`back-${i}`}
          cx="50"
          cy={45 - petal.length + 5}
          rx="6"
          ry={petal.length}
          fill={i % 2 === 0 ? '#fbbf24' : '#f59e0b'}
          transform={`rotate(${petal.angle} 50 45)`}
        />
      ))}
      
      {/* Petals - front layer (offset) */}
      {petals.map((petal, i) => (
        <ellipse
          key={`front-${i}`}
          cx="50"
          cy={45 - petal.length + 8}
          rx="5"
          ry={petal.length - 5}
          fill={i % 2 === 0 ? '#fcd34d' : '#fbbf24'}
          transform={`rotate(${petal.angle + 11} 50 45)`}
        />
      ))}
      
      {/* Center disk - outer ring */}
      <circle cx="50" cy="45" r="18" fill="#92400e" />
      
      {/* Center disk - inner pattern */}
      <circle cx="50" cy="45" r="14" fill="#78350f" />
      
      {/* Seed pattern dots */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <circle
          key={`seed-outer-${i}`}
          cx={50 + 9 * Math.cos((angle * Math.PI) / 180)}
          cy={45 + 9 * Math.sin((angle * Math.PI) / 180)}
          r="2"
          fill="#451a03"
        />
      ))}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => (
        <circle
          key={`seed-inner-${i}`}
          cx={50 + 5 * Math.cos((angle * Math.PI) / 180)}
          cy={45 + 5 * Math.sin((angle * Math.PI) / 180)}
          r="1.5"
          fill="#451a03"
        />
      ))}
      <circle cx="50" cy="45" r="2" fill="#451a03" />
    </Wrapper>
  )
}
