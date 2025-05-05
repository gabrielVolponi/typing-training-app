'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Timer from './Timer'
import { saveResult } from '@/lib/sessionStorage'

interface TypingInterfaceProps {
  language: string
  snippet: string
  isActive: boolean
  setIsActive: (active: boolean) => void
}

export default function TypingInterface({
  language,
  snippet,
  isActive,
  setIsActive,
}: TypingInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [errors, setErrors] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [completed, setCompleted] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 })

  const calculateStats = useCallback(() => {
    if (!startTime) return

    const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
    const wordsTyped = currentIndex / 5
    const currentWpm = Math.round(wordsTyped / timeElapsed)
    const currentAccuracy = Math.round(((currentIndex - errors) / currentIndex) * 100)

    setWpm(currentWpm)
    setAccuracy(currentAccuracy)

    if (completed) {
      saveResult({
        language,
        wpm: currentWpm,
        accuracy: currentAccuracy,
        errors,
        timestamp: Date.now(),
      })
    }
  }, [currentIndex, errors, startTime, completed, language])

  const updateCursorPosition = useCallback((index: number) => {
    const textUpToCursor = snippet.slice(0, index)
    const lines = textUpToCursor.split(/\n/)
    const currentLine = lines.length - 1
    const currentColumn = lines[currentLine].length

    setCursorPosition({
      line: currentLine,
      column: currentColumn,
    })
  }, [snippet])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && !completed) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
        calculateStats()
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, completed, calculateStats])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isActive || completed) return

    if (!startTime) {
      setStartTime(Date.now())
    }

    // Prevent default behavior for Enter key to avoid unwanted scrolling
    if (e.key === 'Enter') {
      e.preventDefault()
    }

    const expectedChar = snippet[currentIndex]
    let isCorrect = false

    // Handle Enter key and newline characters
    if (e.key === 'Enter' && (expectedChar === '\n' || expectedChar === '\r')) {
      isCorrect = true
      // Skip '\r' if it's followed by '\n'
      if (expectedChar === '\r' && snippet[currentIndex + 1] === '\n') {
        setCurrentIndex((prev) => prev + 2)
        updateCursorPosition(currentIndex + 2)
      } else {
        setCurrentIndex((prev) => prev + 1)
        updateCursorPosition(currentIndex + 1)
      }
    } else if (e.key === expectedChar) {
      isCorrect = true
      setCurrentIndex((prev) => prev + 1)
      updateCursorPosition(currentIndex + 1)
    }

    if (!isCorrect) {
      setErrors((prev) => prev + 1)
    }

    if (currentIndex + 1 >= snippet.length) {
      setCompleted(true)
      setIsActive(false)
      calculateStats()
    }
  }, [currentIndex, snippet, isActive, completed, startTime, setIsActive, calculateStats, updateCursorPosition])

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keypress', handleKeyPress)
    }
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [isActive, handleKeyPress])

  const renderSnippet = () => {
    const lines = snippet.split(/\n/)
    return lines.map((line, lineIndex) => {
      const chars = line.split('')
      
      return (
        <motion.div
          key={lineIndex}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {chars.map((char, charIndex) => {
            const absoluteIndex = lines
              .slice(0, lineIndex)
              .join('\n')
              .length + charIndex + lineIndex

            let className = ''
            if (absoluteIndex < currentIndex) {
              className = 'char-correct'
            } else if (absoluteIndex === currentIndex) {
              className = 'char-current'
            }

            return (
              <motion.span
                key={charIndex}
                className={className}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {char}
              </motion.span>
            )
          })}
          {/* Add cursor for newline if it's the current position */}
          {cursorPosition.line === lineIndex && 
           cursorPosition.column === line.length && 
           currentIndex < snippet.length && (
            <motion.span
              className="cursor-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
            >
              ⏎
            </motion.span>
          )}
          {/* Add actual newline */}
          <br />
        </motion.div>
      )
    })
  }

  return (
    <motion.div
      className="bg-gray-900 p-8 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between mb-4">
        <div className="stats space-x-8">
          <span>WPM: {wpm}</span>
          <span>Accuracy: {accuracy}%</span>
          <span>Errors: {errors}</span>
        </div>
        <Timer seconds={elapsedTime} />
      </div>

      <div className="typing-text bg-black p-6 rounded-lg mb-4 min-h-[200px] font-mono relative">
        {renderSnippet()}
      </div>

      {!isActive && !completed && (
        <motion.button
          onClick={() => setIsActive(true)}
          className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Typing
        </motion.button>
      )}

      {completed && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Test Complete!</h3>
          <p>Final WPM: {wpm}</p>
          <p>Final Accuracy: {accuracy}%</p>
          <p>Total Errors: {errors}</p>
          <motion.button
            onClick={() => {
              setCurrentIndex(0)
              setErrors(0)
              setStartTime(null)
              setElapsedTime(0)
              setWpm(0)
              setAccuracy(100)
              setCompleted(false)
              setCursorPosition({ line: 0, column: 0 })
            }}
            className="mt-4 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}