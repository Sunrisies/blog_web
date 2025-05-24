"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { LyricLine, PlaybackState } from "../types"

interface UseLyricsSyncProps {
  lyrics: LyricLine[]
  playbackState: PlaybackState
  onLyricChange?: (currentLine: LyricLine | null, nextLine: LyricLine | null) => void
}

export function useLyricsSync({ lyrics, playbackState, onLyricChange }: UseLyricsSyncProps) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState<number>(-1)
  const [nextLyricIndex, setNextLyricIndex] = useState<number>(-1)
  const previousTimeRef = useRef<number>(0)
  const animationFrameRef = useRef<number>(0)

  // Binary search to find the current lyric line efficiently
  const findCurrentLyricIndex = useCallback(
    (currentTime: number): number => {
      if (!lyrics.length) return -1

      let left = 0
      let right = lyrics.length - 1
      let result = -1

      while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const lyric = lyrics[mid]

        if (currentTime >= lyric.startTime && currentTime < lyric.endTime) {
          return mid
        } else if (currentTime >= lyric.endTime) {
          result = mid
          left = mid + 1
        } else {
          right = mid - 1
        }
      }

      return result
    },
    [lyrics],
  )

  // Find the next upcoming lyric line
  const findNextLyricIndex = useCallback(
    (currentTime: number): number => {
      return lyrics.findIndex((lyric) => lyric.startTime > currentTime)
    },
    [lyrics],
  )

  // Update lyric indices based on current playback time
  const updateLyricIndices = useCallback(() => {
    const { currentTime } = playbackState

    const newCurrentIndex = findCurrentLyricIndex(currentTime)
    const newNextIndex = findNextLyricIndex(currentTime)

    // Only update if indices have changed to avoid unnecessary re-renders
    if (newCurrentIndex !== currentLyricIndex) {
      setCurrentLyricIndex(newCurrentIndex)
    }

    if (newNextIndex !== nextLyricIndex) {
      setNextLyricIndex(newNextIndex)
    }

    // Trigger callback when lyric changes
    if (newCurrentIndex !== currentLyricIndex && onLyricChange) {
      const currentLine = newCurrentIndex >= 0 ? lyrics[newCurrentIndex] : null
      const nextLine = newNextIndex >= 0 ? lyrics[newNextIndex] : null
      onLyricChange(currentLine, nextLine)
    }
  }, [
    playbackState,
    currentLyricIndex,
    nextLyricIndex,
    findCurrentLyricIndex,
    findNextLyricIndex,
    lyrics,
    onLyricChange,
  ])

  // Handle time jumps (seeking, skipping)
  const handleTimeJump = useCallback(() => {
    const { currentTime } = playbackState
    const timeDifference = Math.abs(currentTime - previousTimeRef.current)

    // If time jumped more than 2 seconds, immediately update
    if (timeDifference > 2) {
      updateLyricIndices()
    }

    previousTimeRef.current = currentTime
  }, [playbackState, updateLyricIndices])

  // Main synchronization effect
  useEffect(() => {
    const syncLyrics = () => {
      handleTimeJump()
      updateLyricIndices()

      // Continue animation frame loop if playing
      if (playbackState.isPlaying) {
        animationFrameRef.current = requestAnimationFrame(syncLyrics)
      }
    }

    if (playbackState.isPlaying) {
      animationFrameRef.current = requestAnimationFrame(syncLyrics)
    } else {
      // Still update when paused in case of seeking
      updateLyricIndices()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [playbackState.isPlaying, playbackState.currentTime, handleTimeJump, updateLyricIndices])

  // Get current and upcoming lyrics
  const currentLyric = currentLyricIndex >= 0 ? lyrics[currentLyricIndex] : null
  const nextLyric = nextLyricIndex >= 0 ? lyrics[nextLyricIndex] : null

  // Calculate progress within current lyric line
  const getCurrentLyricProgress = useCallback((): number => {
    if (!currentLyric) return 0

    const { currentTime } = playbackState
    const lineProgress = (currentTime - currentLyric.startTime) / (currentLyric.endTime - currentLyric.startTime)
    return Math.max(0, Math.min(1, lineProgress))
  }, [currentLyric, playbackState])

  return {
    currentLyricIndex,
    nextLyricIndex,
    currentLyric,
    nextLyric,
    getCurrentLyricProgress,
    totalLyrics: lyrics.length,
  }
}
