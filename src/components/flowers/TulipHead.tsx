'use client'

import { motion } from 'framer-motion'

interface TulipHeadProps {
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

export default function TulipHead({ className = '', animate = false, color = 'pink' }: TulipHeadProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const animateProps = animate ? {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  } : {}

  const colors = tulipColors[color]

  return (
    <Wrapper
      viewBox="0 0 70 65"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...animateProps}
    >
      {/* Tulip cup petals - soft rounded edges */}
      {/* Back petals */}
      <path
        d="M15 60 Q8 38 12 18 Q18 8 25 12 Q30 20 35 42 Q40 20 45 12 Q52 8 58 18 Q62 38 55 60 Q35 65 15 60"
        fill={colors.dark}
      />
      
      {/* Left petal */}
      <path
        d="M15 60 Q4 42 8 20 Q12 8 20 12 Q28 22 32 48 Q26 56 15 60"
        fill={colors.mid}
      />
      
      {/* Right petal */}
      <path
        d="M55 60 Q66 42 62 20 Q58 8 50 12 Q42 22 38 48 Q44 56 55 60"
        fill={colors.mid}
      />
      
      {/* Front/center petal */}
      <path
        d="M20 60 Q22 42 28 18 Q33 10 35 10 Q37 10 42 18 Q48 42 50 60 Q35 62 20 60"
        fill={colors.base}
      />
      
      {/* Highlight on front petal */}
      <path
        d="M30 55 Q31 42 33 25 Q35 22 35 22 Q35 22 37 25 Q39 42 40 55 Q35 56 30 55"
        fill={colors.highlight}
        opacity="0.5"
      />
      
      {/* Inner shadow lines */}
      <path
        d="M28 50 Q30 38 35 22"
        stroke={colors.dark}
        strokeWidth="0.8"
        opacity="0.3"
        fill="none"
      />
      <path
        d="M42 50 Q40 38 35 22"
        stroke={colors.dark}
        strokeWidth="0.8"
        opacity="0.3"
        fill="none"
      />
    </Wrapper>
  )
}
