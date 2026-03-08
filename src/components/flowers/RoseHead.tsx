'use client'

import { motion } from 'framer-motion'

interface RoseHeadProps {
  className?: string
  animate?: boolean
}

export default function RoseHead({ className = '', animate = false }: RoseHeadProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const animateProps = animate ? {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  } : {}

  return (
    <Wrapper
      viewBox="0 0 80 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...animateProps}
    >
      {/* Rose petals - layered for depth */}
      {/* Outermost petals */}
      <ellipse cx="40" cy="40" rx="36" ry="28" fill="#e63946" />
      <ellipse cx="22" cy="35" rx="20" ry="22" fill="#dc2f3c" />
      <ellipse cx="58" cy="35" rx="20" ry="22" fill="#dc2f3c" />
      <ellipse cx="40" cy="22" rx="24" ry="20" fill="#e63946" />
      
      {/* Middle layer petals */}
      <ellipse cx="30" cy="32" rx="16" ry="18" fill="#f07167" />
      <ellipse cx="50" cy="32" rx="16" ry="18" fill="#f07167" />
      <ellipse cx="40" cy="25" rx="18" ry="16" fill="#f4978e" />
      
      {/* Inner petals */}
      <ellipse cx="35" cy="30" rx="10" ry="12" fill="#f8ad9d" />
      <ellipse cx="45" cy="30" rx="10" ry="12" fill="#f8ad9d" />
      <ellipse cx="40" cy="28" rx="12" ry="14" fill="#fbc4ab" />
      
      {/* Center spiral */}
      <circle cx="40" cy="30" r="8" fill="#f8ad9d" />
      <path d="M40 24 Q44 28 40 32 Q36 28 40 24" fill="#ffddd2" />
      
      {/* Highlights */}
      <ellipse cx="30" cy="20" rx="6" ry="4" fill="#ffddd2" opacity="0.6" />
      <ellipse cx="48" cy="22" rx="4" ry="3" fill="#ffddd2" opacity="0.4" />
    </Wrapper>
  )
}
