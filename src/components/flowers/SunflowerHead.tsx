'use client'

import { motion } from 'framer-motion'

interface SunflowerHeadProps {
  className?: string
  animate?: boolean
}

export default function SunflowerHead({ className = '', animate = false }: SunflowerHeadProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const animateProps = animate ? {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  } : {}

  // Generate petal positions
  const petalCount = 18
  const petals = Array.from({ length: petalCount }, (_, i) => ({
    angle: (360 / petalCount) * i,
    length: i % 2 === 0 ? 26 : 22,
  }))

  return (
    <Wrapper
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...animateProps}
    >
      {/* Petals - back layer */}
      {petals.map((petal, i) => (
        <ellipse
          key={`back-${i}`}
          cx="50"
          cy={50 - petal.length + 5}
          rx="7"
          ry={petal.length}
          fill={i % 2 === 0 ? '#fbbf24' : '#f59e0b'}
          transform={`rotate(${petal.angle} 50 50)`}
        />
      ))}
      
      {/* Petals - front layer (offset) */}
      {petals.map((petal, i) => (
        <ellipse
          key={`front-${i}`}
          cx="50"
          cy={50 - petal.length + 8}
          rx="5.5"
          ry={petal.length - 5}
          fill={i % 2 === 0 ? '#fcd34d' : '#fbbf24'}
          transform={`rotate(${petal.angle + 10} 50 50)`}
        />
      ))}
      
      {/* Center disk - outer ring */}
      <circle cx="50" cy="50" r="20" fill="#92400e" />
      
      {/* Center disk - inner pattern ring */}
      <circle cx="50" cy="50" r="16" fill="#78350f" />
      
      {/* Seed pattern - spiral dots */}
      {Array.from({ length: 5 }, (_, ring) => 
        Array.from({ length: 6 + ring * 2 }, (_, i) => {
          const angle = (360 / (6 + ring * 2)) * i + ring * 15
          const r = 4 + ring * 3
          const x = 50 + Math.cos(angle * Math.PI / 180) * r
          const y = 50 + Math.sin(angle * Math.PI / 180) * r
          return (
            <circle
              key={`seed-${ring}-${i}`}
              cx={x}
              cy={y}
              r={1.2 - ring * 0.1}
              fill={ring % 2 === 0 ? '#fcd34d' : '#d97706'}
            />
          )
        })
      )}
      
      {/* Highlight on center */}
      <circle cx="45" cy="45" r="4" fill="#a16207" opacity="0.5" />
    </Wrapper>
  )
}
