'use client'

import { motion } from 'framer-motion'

interface TulipProps {
  className?: string
  animate?: boolean
  color?: 'pink' | 'red' | 'yellow' | 'purple'
}

const tulipColors = {
  pink: { base: '#f472b6', mid: '#ec4899', dark: '#db2777', highlight: '#fbcfe8' },
  red: { base: '#f87171', mid: '#ef4444', dark: '#dc2626', highlight: '#fecaca' },
  yellow: { base: '#fde047', mid: '#facc15', dark: '#eab308', highlight: '#fef9c3' },
  purple: { base: '#c084fc', mid: '#a855f7', dark: '#9333ea', highlight: '#e9d5ff' },
}

export default function Tulip({ className = '', animate = false, color = 'pink' }: TulipProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const animateProps = animate ? {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  } : {}

  const colors = tulipColors[color]

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
        d="M50 180 Q48 140 50 100 Q51 85 50 70"
        stroke="#2d5a27"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaves */}
      <path
        d="M50 160 Q25 140 20 100 Q30 130 50 145"
        fill="#4a7c43"
      />
      <path
        d="M50 150 Q75 130 80 95 Q70 125 50 140"
        fill="#3d6b35"
      />
      
      {/* Tulip cup petals - soft rounded edges */}
      {/* Back petals */}
      <path
        d="M30 70 Q25 48 28 32 Q32 22 38 26 Q44 34 50 50 Q56 34 62 26 Q68 22 72 32 Q75 48 70 70 Q50 75 30 70"
        fill={colors.dark}
      />
      
      {/* Left petal */}
      <path
        d="M30 70 Q18 52 22 32 Q26 22 34 26 Q40 36 45 55 Q40 65 30 70"
        fill={colors.mid}
      />
      
      {/* Right petal */}
      <path
        d="M70 70 Q82 52 78 32 Q74 22 66 26 Q60 36 55 55 Q60 65 70 70"
        fill={colors.mid}
      />
      
      {/* Front/center petal */}
      <path
        d="M35 70 Q38 52 44 32 Q48 24 50 24 Q52 24 56 32 Q62 52 65 70 Q50 72 35 70"
        fill={colors.base}
      />
      
      {/* Highlight on front petal */}
      <path
        d="M45 60 Q47 48 49 38 Q50 35 50 35 Q50 35 51 38 Q53 48 55 60 Q50 62 45 60"
        fill={colors.highlight}
        opacity="0.4"
      />
      
      {/* Base of flower */}
      <ellipse cx="50" cy="70" rx="20" ry="5" fill="#3d6b35" />
    </Wrapper>
  )
}
