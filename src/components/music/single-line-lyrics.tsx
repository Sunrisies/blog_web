"use client"

import type { LyricLine, PlaybackState } from "@/types"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SingleLineLyricsProps {
  lyrics: LyricLine[]
  playbackState: PlaybackState
  className?: string
}

export function SingleLineLyrics({ lyrics, playbackState, className = "" }: SingleLineLyricsProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayLyric, setDisplayLyric] = useState("")
  let currentLyric:any = null

  // Custom lyric synchronization logic for single line display
  useEffect(() => {
    if (!lyrics.length || !playbackState.duration) return

    const currentTime = playbackState.currentTime
    let currentIndex = -1

    // Find current lyric
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      const nextLyric = lyrics[i + 1]
      
      if (currentTime >= lyric.startTime && (!nextLyric || currentTime < nextLyric.startTime)) {
        currentIndex = i
        currentLyric = lyric
        break
      }
    }

    // Handle lyric change with animation
    if (currentLyric && currentLyric.text !== displayLyric) {
      setIsAnimating(true)
      
      // Smooth transition to new lyric
      setTimeout(() => {
        setDisplayLyric(currentLyric.text)
        setIsAnimating(false)
      }, 100)
    } else if (!currentLyric && displayLyric) {
      // Fade out when no lyric matches
      setIsAnimating(true)
      setTimeout(() => {
        setDisplayLyric("")
        setIsAnimating(false)
      }, 100)
    }
  }, [playbackState.currentTime, playbackState.duration, lyrics, displayLyric])

  if (!lyrics.length) {
    return (
      <div className={cn("flex items-center justify-center h-full text-gray-500", className)}>
        <p className="text-sm">暂无歌词</p>
      </div>
    )
  }

  return (
    <div className={cn("relative h-full flex items-center justify-center overflow-hidden", className)}>
      {/* Background glow effect with animation */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10",
          "blur-xl transition-all duration-500 ease-out",
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      />
      
      {/* Current lyric text with advanced animations */}
      <div className="relative z-10 text-center px-4 max-w-full">
        <div className={cn(
          "transition-all duration-300 ease-out",
          isAnimating 
            ? "opacity-0 transform translate-y-1 scale-95" 
            : "opacity-100 transform translate-y-0 scale-100"
        )}>
          <p 
            className={cn(
              "text-base sm:text-lg md:text-xl font-medium leading-tight",
              "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent",
              "drop-shadow-lg font-sans animate-lyric-glow",
              "whitespace-nowrap overflow-hidden text-ellipsis"
            )}
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.15), 0 0 20px rgba(99, 102, 241, 0.3)',
            }}
          >
            {displayLyric || "♪ 音乐播放中 ♪"}
          </p>
          
          {/* Enhanced progress indicator */}
          {currentLyric && (
            <div className="mt-1 h-0.5 bg-gray-200/30 rounded-full overflow-hidden max-w-[200px] mx-auto">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-150 ease-linear"
                style={{ 
                  width: `${Math.min(100, Math.max(0, (playbackState.currentTime - currentLyric.startTime) / Math.max(0.1, currentLyric.endTime - currentLyric.startTime) * 100))}%` 
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Enhanced floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full animate-pulse",
              "bg-gradient-to-r from-blue-400/20 to-purple-400/20",
              isAnimating ? "opacity-0" : "opacity-100"
            )}
            style={{
              width: `${2 + i * 1}px`,
              height: `${2 + i * 1}px`,
              left: `${15 + i * 18}%`,
              top: `${25 + (i % 2) * 35}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${1.5 + i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient light effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent",
          "animate-pulse transition-opacity duration-1000",
          isAnimating ? "opacity-0" : "opacity-100"
        )}
        style={{
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />
    </div>
  )
}