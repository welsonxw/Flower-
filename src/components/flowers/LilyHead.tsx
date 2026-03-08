'use client'

import { motion } from 'framer-motion'

interface LilyHeadProps {
  className?: string
  animate?: boolean
}

export default function LilyHead({ className = '', animate = false }: LilyHeadProps) {
  const Wrapper = animate ? motion.svg : 'svg'
  const animateProps = animate ? {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  } : {}

  return (
    <Wrapper
      viewBox="0 0 90 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...animateProps}
    >
      {/* Lily petals - elegant trumpet shape with soft rounded tips */}
      {/* Back petals */}
      <path
        d="M45 65 Q22 42 10 20 Q8 14 12 12 Q18 10 22 16 Q30 32 45 52 Q60 32 68 16 Q72 10 78 12 Q82 14 80 20 Q68 42 45 65"
        fill="#f8f9fa"
        stroke="#e9ecef"
        strokeWidth="1"
      />
      <path
        d="M45 65 Q18 48 8 28 Q5 20 10 18 Q16 16 20 24 Q28 40 45 55"
        fill="#ffffff"
      />
      <path
        d="M45 65 Q72 48 82 28 Q85 20 80 18 Q74 16 70 24 Q62 40 45 55"
        fill="#ffffff"
      />
      
      {/* Middle petals */}
      <path
        d="M45 60 Q30 40 24 20 Q22 12 26 10 Q32 8 35 16 Q40 32 45 48 Q50 32 55 16 Q58 8 64 10 Q68 12 66 20 Q60 40 45 60"
        fill="#ffffff"
        stroke="#dee2e6"
        strokeWidth="0.5"
      />
      
      {/* Front petal */}
      <path
        d="M45 65 Q34 48 38 22 Q40 14 45 14 Q50 14 52 22 Q56 48 45 65"
        fill="#f8f9fa"
      />
      
      {/* Center / stamens */}
      <line x1="38" y1="58" x2="32" y2="32" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="58" x2="45" y2="28" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="58" x2="58" y2="32" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
      
      {/* Pollen dots */}
      <circle cx="32" cy="30" r="3" fill="#f4a261" />
      <circle cx="45" cy="26" r="3" fill="#f4a261" />
      <circle cx="58" cy="30" r="3" fill="#f4a261" />
      
      {/* Subtle purple spots on petals */}
      <circle cx="28" cy="45" r="2" fill="#e9d5ff" opacity="0.6" />
      <circle cx="62" cy="45" r="2" fill="#e9d5ff" opacity="0.6" />
      <circle cx="45" cy="38" r="1.5" fill="#e9d5ff" opacity="0.5" />
    </Wrapper>
  )
}
