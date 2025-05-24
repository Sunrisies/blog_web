"use client"

import { useEffect, useRef, useState } from "react"
import type { LyricLine, PlaybackState } from "@/types"
import { useLyricsSync } from "@/hooks/use-lyrics-sync"

interface SynchronizedLyricsProps {
  lyrics: LyricLine[]
  playbackState: PlaybackState
  className?: string
}

export function SynchronizedLyrics({ lyrics, playbackState, className = "" }: SynchronizedLyricsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentLineRef = useRef<HTMLDivElement>(null)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const { currentLyricIndex, currentLyric, nextLyric, getCurrentLyricProgress } = useLyricsSync({
    lyrics,
    playbackState,
    onLyricChange: (currentLine, nextLine) => {
      // Optional: Add sound effects or haptic feedback here
      console.log("Lyric changed:", currentLine?.text)
    },
  })

  // Handle user scrolling detection
  const handleScroll = () => {
    setIsUserScrolling(true)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Resume auto-scroll after 3 seconds of no user interaction
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false)
    }, 3000)
  }

  // Smooth scroll to current lyric line
  const scrollToCurrentLyric = () => {
    if (!currentLineRef.current || !containerRef.current || isUserScrolling) return

    const container = containerRef.current
    const currentLine = currentLineRef.current

    const containerHeight = container.clientHeight
    const lineHeight = currentLine.offsetHeight
    const lineTop = currentLine.offsetTop

    // Calculate scroll position to center the current line
    const targetScrollTop = lineTop - containerHeight / 2 + lineHeight / 2

    // Smooth scroll with easing
    container.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: "smooth",
    })
  }

  // Auto-scroll effect
  useEffect(() => {
    if (currentLyricIndex >= 0) {
      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(scrollToCurrentLyric, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [currentLyricIndex, isUserScrolling])

  // Cleanup scroll timeout
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  if (!lyrics.length) {
    return (
      <div className={`flex items-center justify-center h-full text-gray-500 ${className}`}>
        <p>No lyrics available</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${className}`}
      onScroll={handleScroll}
      style={{ maxHeight: "400px" }}
    >
      <div className="space-y-4 p-4">
        {lyrics.map((lyric, index) => {
          const isCurrent = index === currentLyricIndex
          const isPast = index < currentLyricIndex
          const isFuture = index > currentLyricIndex

          // Calculate opacity and scale for smooth transitions
          let opacity = 0.4
          let scale = 0.95
          let fontWeight = "normal"

          if (isCurrent) {
            opacity = 1
            scale = 1.05
            fontWeight = "bold"
          } else if (isPast) {
            opacity = 0.6
            scale = 0.98
          } else if (isFuture) {
            opacity = 0.4
            scale = 0.95
          }

          // Progress bar for current lyric
          const progress = isCurrent ? getCurrentLyricProgress() : 0

          return (
            <div
              key={lyric.id}
              ref={isCurrent ? currentLineRef : null}
              className={`
                relative transition-all duration-300 ease-out p-3 rounded-lg
                ${isCurrent ? "bg-blue-50 border-l-4 border-blue-500" : ""}
                ${isPast ? "text-gray-600" : ""}
                ${isFuture ? "text-gray-400" : ""}
              `}
              style={{
                opacity,
                transform: `scale(${scale})`,
                fontWeight: isCurrent ? "bold" : "normal",
              }}
            >
              {/* Progress indicator for current line */}
              {isCurrent && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              )}

              {/* Lyric text */}
              <p
                className={`
                text-center leading-relaxed transition-colors duration-300
                ${isCurrent ? "text-blue-900 text-lg" : "text-gray-700"}
              `}
              >
                {lyric.text}
              </p>

              {/* Timestamp indicator (optional, for debugging) */}
              {process.env.NODE_ENV === "development" && (
                <span className="absolute top-1 right-1 text-xs text-gray-400">{lyric.startTime.toFixed(1)}s</span>
              )}
            </div>
          )
        })}

        {/* Spacer for better scrolling experience */}
        <div className="h-32" />
      </div>

      {/* Scroll indicator */}
      {isUserScrolling && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          Manual scroll - auto-scroll paused
        </div>
      )}
    </div>
  )
}
