'use client'

import { motion } from 'framer-motion'

interface RoseProps {
  className?: string
  animate?: boolean
}

export default function Rose({ className = '', animate = false }: RoseProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const animateProps = animate ? {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  } : {}

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
        d="M50 180 Q48 140 50 100 Q52 80 50 70"
        stroke="#2d5a27"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaves */}
      <ellipse cx="38" cy="120" rx="12" ry="6" fill="#4a7c43" transform="rotate(-30 38 120)" />
      <ellipse cx="62" cy="135" rx="12" ry="6" fill="#4a7c43" transform="rotate(30 62 135)" />
      
      {/* Rose petals - layered */}
      {/* Outer petals */}
      <ellipse cx="50" cy="45" rx="28" ry="24" fill="#e63946" />
      <ellipse cx="35" cy="40" rx="18" ry="20" fill="#dc2f3c" />
      <ellipse cx="65" cy="40" rx="18" ry="20" fill="#dc2f3c" />
      <ellipse cx="50" cy="30" rx="20" ry="18" fill="#e63946" />
      
      {/* Middle petals */}
      <ellipse cx="45" cy="35" rx="12" ry="14" fill="#f07167" />
      <ellipse cx="55" cy="35" rx="12" ry="14" fill="#f07167" />
      <ellipse cx="50" cy="28" rx="14" ry="12" fill="#f4978e" />
      
      {/* Inner petals / center */}
      <ellipse cx="50" cy="32" rx="8" ry="10" fill="#fbc4ab" />
      <circle cx="50" cy="30" r="5" fill="#f8ad9d" />
      
      {/* Highlight */}
      <ellipse cx="42" cy="25" rx="4" ry="3" fill="#ffddd2" opacity="0.6" />
    </Wrapper>
  )
}
