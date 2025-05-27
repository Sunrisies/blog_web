"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { PlaybackState, Song } from "@/types"
import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { SynchronizedLyrics } from "./synchronized-lyrics"

// Sample playlist with timestamped lyrics
const playlist: Song[] = [
  { id: 1, title: "想象之中", artist: "许嵩", duration: "04:12" },
  { id: 2, title: "素颜", artist: "许嵩", duration: "03:45" },
  {
    id: 3,
    title: "墨尔本,晴",
    artist: "许嵩",
    duration: "03:23",
    lyrics: [
      { id: 1, startTime: 0, endTime: 15, text: "Instrumental intro..." },
      { id: 2, startTime: 15, endTime: 25, text: "Morning light breaks through" },
      { id: 3, startTime: 25, endTime: 35, text: "The southern hemisphere sky" },
      { id: 4, startTime: 35, endTime: 45, text: "Walking on the beach today" },
      { id: 5, startTime: 45, endTime: 55, text: "Feeling the warm sunshine" },
      { id: 6, startTime: 55, endTime: 65, text: "Ocean waves come and go" },
      { id: 7, startTime: 65, endTime: 75, text: "Like memories in my mind" },
      { id: 8, startTime: 75, endTime: 85, text: "This moment feels so right" },
      { id: 9, startTime: 85, endTime: 95, text: "Under Melbourne's clear blue sky" },
      { id: 10, startTime: 95, endTime: 105, text: "Time seems to stand still" },
      { id: 11, startTime: 105, endTime: 115, text: "In this peaceful place" },
      { id: 12, startTime: 115, endTime: 125, text: "Where dreams come alive" },
      { id: 13, startTime: 125, endTime: 135, text: "And hearts find their way" },
      { id: 14, startTime: 135, endTime: 145, text: "Back to what matters most" },
      { id: 15, startTime: 145, endTime: 155, text: "Love and simple joys" },
      { id: 16, startTime: 155, endTime: 165, text: "That make life beautiful" },
      { id: 17, startTime: 165, endTime: 175, text: "Every single day" },
      { id: 18, startTime: 175, endTime: 185, text: "Under this endless sky" },
      { id: 19, startTime: 185, endTime: 195, text: "I find my peace at last" },
      { id: 20, startTime: 195, endTime: 203, text: "In Melbourne's gentle embrace" },
    ],
  },
  { id: 4, title: "这你的甜白", artist: "许嵩", duration: "03:56" },
  { id: 5, title: "花满楼", artist: "许嵩", duration: "04:08" },
]

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song>(playlist[2])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(203)
  const [volume, setVolume] = useState([75])
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  // Create playback state object for lyrics synchronization
  const playbackState: PlaybackState = {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const selectSong = (song: Song) => {
    setCurrentSong(song)
    setCurrentTime(0)
    const [mins, secs] = song.duration.split(":").map(Number)
    setDuration(mins * 60 + secs)
  }

  const previousTrack = () => {
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1
    selectSong(playlist[previousIndex])
  }

  const nextTrack = () => {
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const nextIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0
    selectSong(playlist[nextIndex])
  }

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0])
  }

  // Enhanced time progression with playback rate support
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + playbackRate * 0.1 // Update every 100ms
          return Math.min(newTime, duration)
        })
      }, 100) // More frequent updates for smoother lyrics sync
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration, playbackRate])

  // Auto-advance to next track when current ends
  useEffect(() => {
    if (currentTime >= duration && isPlaying) {
      if (isRepeat) {
        setCurrentTime(0)
      } else {
        nextTrack()
      }
    }
  }, [currentTime, duration, isPlaying, isRepeat])

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200">
      {/* Playlist Section */}
      <div className="w-1/3 p-6 bg-black/20 backdrop-blur-sm">
        <div className="space-y-2">
          {playlist.map((song, index) => (
            <div
              key={song.id}
              onClick={() => selectSong(song)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                currentSong.id === song.id ? "bg-white/30 backdrop-blur-sm shadow-lg" : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium w-6">{index + 1}</span>
                <span className="text-white font-medium">{song.title}</span>
              </div>
              <span className="text-white/70 text-sm">{song.artist}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Album Art and Synchronized Lyrics */}
      <div className="w-2/3 p-6 flex flex-col">
        {/* Album Cover and Song Details */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative flex-shrink-0">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Album Cover"
              width={120}
              height={120}
              className="rounded-lg shadow-xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {currentSong.title} - {currentSong.artist}
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>词：符格</p>
              <p>曲：李毅杰</p>
              <p>编曲：李毅杰</p>
            </div>
          </div>
        </div>

        {/* Synchronized Lyrics Display */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <SynchronizedLyrics lyrics={currentSong.lyrics || []} playbackState={playbackState} className="h-full" />
        </div>

        {/* Music Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg mt-4">
          {/* Progress Bar */}
          <div className="space-y-2 mb-4">
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleProgressChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffle(!isShuffle)}
              className={isShuffle ? "text-blue-600" : "text-gray-600"}
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={previousTrack}>
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button variant="default" size="lg" onClick={togglePlayPause} className="rounded-full w-12 h-12">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={nextTrack}>
              <SkipForward className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRepeat(!isRepeat)}
              className={isRepeat ? "text-blue-600" : "text-gray-600"}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control and Playback Rate */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 flex-1">
              <Volume2 className="h-4 w-4 text-gray-600" />
              <Slider value={volume} max={100} step={1} onValueChange={setVolume} className="flex-1" />
              <span className="text-xs text-gray-600 w-8">{volume[0]}%</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">Speed:</span>
              <select
                value={playbackRate}
                onChange={(e) => setPlaybackRate(Number(e.target.value))}
                className="text-xs bg-transparent border rounded px-1"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
