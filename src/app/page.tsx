'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import FlowerSelection from '@/components/FlowerSelection'
import BouquetAnimation from '@/components/BouquetAnimation'
import FloatingPetals from '@/components/FloatingPetals'

export type FlowerType = 'rose' | 'lily' | 'sunflower' | 'tulip'

export interface UserData {
  name: string
  flower: FlowerType
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'selection' | 'bouquet'>('landing')
  const [userData, setUserData] = useState<UserData | null>(null)

  const handleStart = () => {
    setCurrentPage('selection')
  }

  const handleSubmit = (data: UserData) => {
    setUserData(data)
    setCurrentPage('bouquet')
  }

  const handleReset = () => {
    setCurrentPage('landing')
    setUserData(null)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-lavender-50 to-cream-50 -z-10" />
      
      {/* Floating decorative petals in background */}
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStart={handleStart} />
          </motion.div>
        )}

        {currentPage === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <FlowerSelection onSubmit={handleSubmit} />
          </motion.div>
        )}

        {currentPage === 'bouquet' && userData && (
          <motion.div
            key="bouquet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BouquetAnimation userData={userData} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
