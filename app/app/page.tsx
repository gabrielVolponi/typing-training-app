'use client'

import { useState, useEffect } from 'react'
import LanguageSelector from '@/components/LanguageSelector'
import TypingInterface from '@/components/TypingInterface'
import ResultsDisplay from '@/components/ResultsDisplay'
import { codeSnippets } from '@/lib/codeSnippets'
import { motion } from 'framer-motion'

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)
  const [isTestActive, setIsTestActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen p-8 bg-black">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Code Typing Practice</h1>
        
        {!isTestActive && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageSelect={setSelectedLanguage}
              onSnippetSelect={setCurrentSnippetIndex}
              currentSnippetIndex={currentSnippetIndex}
              snippetCount={codeSnippets[selectedLanguage].length}
            />
          </motion.div>
        )}

        <TypingInterface
          language={selectedLanguage}
          snippet={codeSnippets[selectedLanguage][currentSnippetIndex]}
          isActive={isTestActive}
          setIsActive={setIsTestActive}
        />

        <ResultsDisplay />
      </motion.div>
    </main>
  )
}