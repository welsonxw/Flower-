'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserData, FlowerType } from '@/app/page'
import { Rose, Lily, Tulip, Sunflower, RoseHead, LilyHead, TulipHead, SunflowerHead } from './flowers'

interface BouquetAnimationProps {
  userData: UserData
  onReset: () => void
}

const flowerColors: Record<FlowerType, { primary: string; secondary: string; ribbon: string }> = {
  rose: { primary: '#e63946', secondary: '#fda4af', ribbon: '#fecdd3' },
  lily: { primary: '#f8f9fa', secondary: '#e9d5ff', ribbon: '#ddd6fe' },
  sunflower: { primary: '#fbbf24', secondary: '#fde68a', ribbon: '#fef3c7' },
  tulip: { primary: '#f472b6', secondary: '#fbcfe8', ribbon: '#fce7f3' },
}

const FlowerComponent = ({ type, className }: { type: FlowerType; className?: string }) => {
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

// Flower head only component - uses dedicated head SVGs (no stems)
const FlowerHead = ({ type, size, className }: { type: FlowerType; size: number; className?: string }) => {
  const style = { width: size, height: size }
  const combinedClassName = `${className || ''}`
  
  switch (type) {
    case 'rose':
      return <div style={style} className={combinedClassName}><RoseHead className="w-full h-full" /></div>
    case 'lily':
      return <div style={style} className={combinedClassName}><LilyHead className="w-full h-full" /></div>
    case 'tulip':
      return <div style={style} className={combinedClassName}><TulipHead className="w-full h-full" /></div>
    case 'sunflower':
      return <div style={style} className={combinedClassName}><SunflowerHead className="w-full h-full" /></div>
  }
}

// Backdrop floating flowers (full flower with stem)
const BackdropFlowers = ({ type }: { type: FlowerType }) => {
  const positions = [
    { x: 5, y: 8, size: 60, delay: 0, dur: 9 },
    { x: 85, y: 12, size: 55, delay: 1.2, dur: 10 },
    { x: 15, y: 75, size: 50, delay: 2, dur: 8 },
    { x: 90, y: 65, size: 58, delay: 0.5, dur: 11 },
    { x: 75, y: 85, size: 45, delay: 1.8, dur: 9 },
    { x: 8, y: 45, size: 40, delay: 2.5, dur: 10 },
    { x: 50, y: 5, size: 38, delay: 0.8, dur: 8 },
    { x: 92, y: 40, size: 48, delay: 3, dur: 12 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {positions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size * 1.8 }}
          animate={{
            y: [0, -25, 0],
            x: [0, 12, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        >
          <FlowerComponent type={type} className="w-full h-full opacity-15" />
        </motion.div>
      ))}
    </div>
  )
}

// The stem positions: each flower sits at the tip of a stem
// SVG viewBox = 0 0 200 350, container maps to these percentages
// offsetX/offsetY fine-tune flower head position relative to stem tip
const stemFlowers = [
  // Back row (smaller, higher up) - creates depth
  { stemPath: 'M100 350 L100 230 Q88 180 42 70', tipX: 42, tipY: 70, size: 32, delay: 0.1, offsetX: -10, offsetY: -20 },
  { stemPath: 'M100 350 L100 230 Q112 180 158 70', tipX: 158, tipY: 70, size: 32, delay: 0.15, offsetX: -25, offsetY: -20 },
  // Middle row (medium size) - left side
  { stemPath: 'M100 350 L100 230 Q92 200 48 55', tipX: 48, tipY: 55, size: 38, delay: 0.2, offsetX: -10, offsetY: -20 },
  { stemPath: 'M100 350 L100 230 Q95 170 75 40', tipX: 75, tipY: 40, size: 40, delay: 0.3, offsetX: -10, offsetY: -20 },
  // Middle row - right side
  { stemPath: 'M100 350 L100 230 Q105 170 125 40', tipX: 125, tipY: 40, size: 40, delay: 0.35, offsetX: -10, offsetY: -20 },
  { stemPath: 'M100 350 L100 230 Q108 200 152 55', tipX: 152, tipY: 55, size: 38, delay: 0.4, offsetX: -10, offsetY: -20 },
  // Front row (larger, center focus)
  { stemPath: 'M100 350 L100 230 L100 25', tipX: 100, tipY: 25, size: 48, delay: 0.5, offsetX: -10, offsetY: -20 },
  { stemPath: 'M100 350 L100 230 Q97 190 85 60', tipX: 85, tipY: 60, size: 36, delay: 0.55, offsetX: -10, offsetY: -20 },
]

export default function BouquetAnimation({ userData, onReset }: BouquetAnimationProps) {
  const [phase, setPhase] = useState<'falling' | 'gathering' | 'bouquet' | 'card'>('falling')
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; rotate: number }>>([])

  const colors = flowerColors[userData.flower]

  useEffect(() => {
    const newPetals = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      delay: Math.random() * 1.5,
      rotate: Math.random() * 360,
    }))
    setPetals(newPetals)

    const timer1 = setTimeout(() => setPhase('gathering'), 2500)
    const timer2 = setTimeout(() => setPhase('bouquet'), 3500)
    const timer3 = setTimeout(() => setPhase('card'), 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Backdrop floating flower heads */}
      {(phase === 'bouquet' || phase === 'card') && <BackdropFlowers type={userData.flower} />}

      {/* Falling Flowers */}
      <AnimatePresence>
        {(phase === 'falling' || phase === 'gathering') && (
          <>
            {petals.map((petal) => (
              <motion.div
                key={petal.id}
                className="absolute pointer-events-none"
                style={{ width: 50, height: 90 }}
                initial={{
                  top: '-15%',
                  left: `${petal.x}%`,
                  rotate: petal.rotate,
                  scale: 0.8,
                }}
                animate={
                  phase === 'falling'
                    ? {
                        top: '55%',
                        rotate: petal.rotate + 180,
                        transition: {
                          duration: 2.5 + petal.delay,
                          ease: 'easeIn',
                          delay: petal.delay * 0.4,
                        },
                      }
                    : {
                        top: '45%',
                        left: '50%',
                        scale: 0,
                        opacity: 0,
                        transition: { duration: 0.8, ease: 'easeInOut' },
                      }
                }
                exit={{ opacity: 0 }}
              >
                <FlowerComponent type={userData.flower} className="w-full h-full" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Content - Bouquet and Card side by side */}
      <AnimatePresence>
        {(phase === 'bouquet' || phase === 'card') && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full px-4 z-10">
            {/* Card - appears on left */}
            <AnimatePresence>
              {phase === 'card' && (
                <motion.div
                  className="order-2 md:order-1 bg-white/95 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
                  initial={{ opacity: 0, x: -100, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Decorative corners */}
                  <div className="absolute top-3 left-3 opacity-30" style={{ width: 28, height: 50 }}>
                    <FlowerComponent type={userData.flower} className="w-full h-full" />
                  </div>
                  <div className="absolute top-3 right-3 opacity-30 scale-x-[-1]" style={{ width: 28, height: 50 }}>
                    <FlowerComponent type={userData.flower} className="w-full h-full" />
                  </div>

                  {/* Header with flower */}
                  <motion.div
                    className="flex justify-center mb-4"
                    style={{ width: 40, height: 72, margin: '0 auto' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <FlowerComponent type={userData.flower} className="w-full h-full" />
                  </motion.div>

                  {/* Greeting */}
                  <motion.p
                    className="text-pink-500 font-medium mb-3 text-base"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Dear {userData.name},
                  </motion.p>

                  <div className="text-gray-600 leading-relaxed mb-4 space-y-2 text-sm">
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      Your passion, your courage, and the way you keep going even when things are difficult make you someone worth admiring.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      Never stop believing in the path you're walking. You&apos;re doing better than you think.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      Keep striving and keep dreaming.
                    </motion.p>
                  </div>

                  <motion.p
                    className="text-pink-400 font-semibold text-base mb-2"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    Happy International Women&apos;s Day
                  </motion.p>

                  <motion.p
                    className="text-gray-400 text-xs mb-0"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7, duration: 0.4 }}
                  >
                    Welson Woong,
                  </motion.p>
                  <motion.p
                    className="text-gray-400 text-xs mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.9, duration: 0.4 }}
                  >
                    March 8th, 2026
                  </motion.p>

                  {/* Divider */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
                    <div style={{ width: 20, height: 36 }}>
                      <FlowerComponent type={userData.flower} className="w-full h-full" />
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
                  </div>

                  {/* Action button */}
                  <motion.button
                    onClick={onReset}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Another
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bouquet - moves to right when card appears */}
            <motion.div
              className="order-1 md:order-2 flex flex-col items-center"
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{
                scale: phase === 'card' ? 0.85 : 1,
                opacity: 1,
                y: 0,
                x: phase === 'card' ? 20 : 0,
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
              {/* Bouquet SVG with stems + ribbon */}
              <div className="relative" style={{ width: 280, height: 400 }}>
                <svg
                  viewBox="0 0 200 350"
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Stems */}
                  {stemFlowers.map((s, i) => (
                    <path
                      key={`stem-${i}`}
                      d={s.stemPath}
                      stroke={i % 2 === 0 ? '#3d6b3d' : '#4a7c4a'}
                      strokeWidth={i === 3 ? 5 : 4}
                      fill="none"
                      strokeLinecap="round"
                    />
                  ))}

                  {/* Leaves on stems */}
                  <ellipse cx="80" cy="165" rx="8" ry="16" fill="#4a7c4a" transform="rotate(-30 80 165)" />
                  <ellipse cx="120" cy="170" rx="8" ry="16" fill="#3d6b3d" transform="rotate(30 120 170)" />
                  <ellipse cx="70" cy="130" rx="7" ry="13" fill="#4a7c4a" transform="rotate(-40 70 130)" />
                  <ellipse cx="130" cy="135" rx="7" ry="13" fill="#3d6b3d" transform="rotate(40 130 135)" />
                  <ellipse cx="90" cy="195" rx="7" ry="14" fill="#4a7c4a" transform="rotate(-20 90 195)" />
                  <ellipse cx="110" cy="200" rx="7" ry="14" fill="#3d6b3d" transform="rotate(20 110 200)" />

                  {/* Ribbon / Bow */}
                  <path
                    d="M100 240 Q68 215 52 225 Q36 240 52 256 Q72 266 100 246"
                    fill={colors.ribbon}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <path
                    d="M100 240 Q132 215 148 225 Q164 240 148 256 Q128 266 100 246"
                    fill={colors.ribbon}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <ellipse cx="100" cy="243" rx="13" ry="10" fill={colors.ribbon} stroke="#fff" strokeWidth="1.5" />
                  <path d="M93 252 Q78 278 68 305" stroke={colors.ribbon} strokeWidth="9" fill="none" strokeLinecap="round" />
                  <path d="M93 252 Q78 278 68 305" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M107 252 Q122 278 132 305" stroke={colors.ribbon} strokeWidth="9" fill="none" strokeLinecap="round" />
                  <path d="M107 252 Q122 278 132 305" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </svg>

                {/* Flower heads positioned at stem tips */}
                {stemFlowers.map((s, i) => {
                  const flowerSize = s.size * 1.4
                  // Convert tip position to percentage, then apply pixel offset for fine-tuning
                  const leftPercent = (s.tipX / 200) * 100
                  const topPercent = (s.tipY / 350) * 100
                  return (
                    <motion.div
                      key={`flower-${i}`}
                      className="absolute"
                      style={{
                        left: `calc(${leftPercent}% + ${s.offsetX}px)`,
                        top: `calc(${topPercent}% + ${s.offsetY}px)`,
                        width: flowerSize,
                        height: flowerSize,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: s.delay, duration: 0.4, type: 'spring' }}
                    >
                      <FlowerHead type={userData.flower} size={flowerSize} />
                    </motion.div>
                  )
                })}
              </div>

              {/* Name */}
              <motion.div
                className="text-center mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <p className="text-white/80 text-lg font-light tracking-wide">
                  For <span className="font-medium text-pink-300">{userData.name}</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Background glow */}
      {(phase === 'bouquet' || phase === 'card') && (
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl -z-10"
          style={{ background: colors.secondary }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1 }}
        />
      )}
    </div>
  )
}
