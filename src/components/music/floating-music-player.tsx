'use client'

import { useMusicPlayer } from '@/hooks/use-music-player'
import { cn } from '@/lib/utils'
import { IMusic } from '@/types/music'
import { Music, Pause } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MusicList } from './music-list'

interface FloatingMusicPlayerProps {
  className?: string
}

export function FloatingMusicPlayer({ className }: FloatingMusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const { currentMusic, play, pause, isPlaying: globalIsPlaying } = useMusicPlayer()

  // 同步全局播放状态
  useEffect(() => {
    setIsPlaying(globalIsPlaying)
  }, [globalIsPlaying])

  // 外部点击关闭面板
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isExpanded])

  const handlePlayButtonClick = () => {
    if (currentMusic) {
      if (isPlaying) {
        pause()
      } else {
        play(currentMusic)
      }
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  const handleMusicSelect = (music: IMusic) => {
    play(music)
    setIsExpanded(false)
  }

  return (
    <div ref={ playerRef } className={ cn('fixed right-6 top-1/2 -translate-y-1/2 z-50', className) }>
      {/* 圆形播放按钮 */ }
      <button
        onClick={ handlePlayButtonClick }
        className={ cn(
          'w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500',
          'shadow-lg hover:shadow-xl transition-all duration-300',
          'flex items-center justify-center text-white',
          'hover:scale-110 active:scale-95',
          'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
          'dark:focus:ring-offset-gray-900'
        ) }
        aria-label={ isPlaying ? '暂停音乐' : '播放音乐' }
      >
        { isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Music className="w-5 h-5" />
        ) }
      </button>

      {/* 音乐列表面板 */ }
      <div
        className={ cn(
          'absolute right-0 mt-3 w-64 bg-background rounded-lg shadow-2xl border',
          'transition-all duration-300 ease-in-out',
          'transform origin-top-right',
          isExpanded
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
          'md:w-80 md:right-0',
          'max-h-[300px] overflow-hidden'
        ) }
      >
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-foreground">音乐播放</h3>
          { currentMusic && (
            <p className="text-sm text-muted-foreground truncate">
              正在播放: { currentMusic.title }
            </p>
          ) }
        </div>

        <MusicList onMusicSelect={ handleMusicSelect } currentMusic={ currentMusic } />
      </div>
    </div>
  )
}