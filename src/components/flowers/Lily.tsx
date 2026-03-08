'use client'

import { motion } from 'framer-motion'

interface LilyProps {
  className?: string
  animate?: boolean
}

export default function Lily({ className = '', animate = false }: LilyProps) {
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
        d="M50 180 Q48 140 50 100 Q52 85 50 75"
        stroke="#3d6b35"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaves */}
      <path d="M50 130 Q30 115 25 100" stroke="#4a7c43" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M50 145 Q70 130 75 115" stroke="#4a7c43" strokeWidth="4" fill="none" strokeLinecap="round" />
      
      {/* Lily petals - elegant trumpet shape with soft rounded tips */}
      {/* Back petals */}
      <path
        d="M50 75 Q32 52 22 35 Q18 28 22 25 Q28 22 32 30 Q40 45 50 60 Q60 45 68 30 Q72 22 78 25 Q82 28 78 35 Q68 52 50 75"
        fill="#f8f9fa"
        stroke="#e9ecef"
        strokeWidth="1"
      />
      <path
        d="M50 75 Q28 58 18 42 Q14 34 18 32 Q24 30 28 38 Q36 52 50 65"
        fill="#ffffff"
      />
      <path
        d="M50 75 Q72 58 82 42 Q86 34 82 32 Q76 30 72 38 Q64 52 50 65"
        fill="#ffffff"
      />
      
      {/* Middle petals */}
      <path
        d="M50 70 Q38 48 32 32 Q28 24 32 22 Q38 20 42 28 Q46 42 50 55 Q54 42 58 28 Q62 20 68 22 Q72 24 68 32 Q62 48 50 70"
        fill="#ffffff"
        stroke="#dee2e6"
        strokeWidth="0.5"
      />
      
      {/* Front petal */}
      <path
        d="M50 75 Q42 58 44 38 Q46 28 50 28 Q54 28 56 38 Q58 58 50 75"
        fill="#f8f9fa"
      />
      
      {/* Center / stamens */}
      <line x1="45" y1="70" x2="40" y2="45" stroke="#ffd166" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="70" x2="50" y2="42" stroke="#ffd166" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="55" y1="70" x2="60" y2="45" stroke="#ffd166" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Pollen dots */}
      <circle cx="40" cy="44" r="2" fill="#f4a261" />
      <circle cx="50" cy="41" r="2" fill="#f4a261" />
      <circle cx="60" cy="44" r="2" fill="#f4a261" />
      
      {/* Subtle green spots on petals */}
      <circle cx="35" cy="55" r="1.5" fill="#c8e6c9" opacity="0.5" />
      <circle cx="65" cy="55" r="1.5" fill="#c8e6c9" opacity="0.5" />
    </Wrapper>
  )
}
