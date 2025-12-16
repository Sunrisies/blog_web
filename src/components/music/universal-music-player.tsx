'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Music, X, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IMusic } from '@/types/music'
import { MusicList } from '@/components/music/music-list'
import { useMusicPlayer } from '@/hooks/use-music-player'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { useMobile } from '@/hooks/use-mobile'

interface UniversalMusicPlayerProps {
  className?: string
  defaultPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export function UniversalMusicPlayer({
  className,
  defaultPosition = 'bottom-right'
}: UniversalMusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const { currentMusic, play, pause, isPlaying: globalIsPlaying } = useMusicPlayer()
  const { play: audioPlay, pause: audioPause } = useAudioPlayer()
  const isMobile = useMobile()
  // 声明本地播放状态
  const [isPlaying, setIsPlaying] = useState(false)
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
        audioPause()
        pause()
      } else {
        audioPlay()
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized)
  }

  // 获取位置样式
  const getPositionStyles = () => {
    const positions = {
      'bottom-right': 'right-6 bottom-6',
      'bottom-left': 'left-6 bottom-6',
      'top-right': 'right-6 top-6',
      'top-left': 'left-6 top-6',
    }
    return positions[defaultPosition]
  }

  // 迷你播放器模式
  if (isMinimized && currentMusic) {
    return (
      <div className={ cn(
        'fixed z-50',
        getPositionStyles(),
        className
      ) }>
        <div className={ cn(
          'bg-background/90 backdrop-blur-sm rounded-lg shadow-lg border',
          'p-3 flex items-center space-x-3 min-w-[200px]',
          'transition-all duration-300'
        ) }>
          <button
            onClick={ handlePlayButtonClick }
            className={ cn(
              'w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500',
              'flex items-center justify-center text-white',
              'hover:scale-105 active:scale-95 transition-transform'
            ) }
          >
            { isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            ) }
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{ currentMusic.title }</p>
            <p className="text-xs text-muted-foreground truncate">{ currentMusic.artist }</p>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={ toggleExpanded }
              className="p-1 hover:bg-accent rounded-full transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={ toggleMinimized }
              className="p-1 hover:bg-accent rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 移动端底部弹出面板
  if (isMobile) {
    return (
      <div ref={ playerRef } className={ cn('fixed z-50', getPositionStyles(), className) }>
        {/* 圆形播放按钮 */ }
        <button
          onClick={ toggleExpanded }
          className={ cn(
            'w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500',
            'shadow-lg hover:shadow-xl transition-all duration-300',
            'flex items-center justify-center text-white',
            'hover:scale-110 active:scale-95',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
            'dark:focus:ring-offset-gray-900',
            'z-40'
          ) }
          aria-label={ isPlaying ? '暂停音乐' : '播放音乐' }
        >
          { isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Music className="w-5 h-5" />
          ) }
        </button>

        {/* 移动端底部弹出面板 */ }
        <div
          className={ cn(
            'fixed inset-x-0 bottom-0 bg-background border-t shadow-2xl',
            'transition-transform duration-300 ease-in-out',
            'max-h-[80vh] overflow-hidden',
            isExpanded
              ? 'translate-y-0'
              : 'translate-y-full'
          ) }
        >
          {/* 面板头部 */ }
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <button
                onClick={ handlePlayButtonClick }
                className={ cn(
                  'w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500',
                  'flex items-center justify-center text-white',
                  'hover:scale-105 active:scale-95 transition-transform'
                ) }
              >
                { isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                ) }
              </button>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-foreground">音乐播放</h3>
                { currentMusic && (
                  <p className="text-sm text-muted-foreground truncate">
                    { currentMusic.title } - { currentMusic.artist }
                  </p>
                ) }
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={ toggleMinimized }
                className="p-2 hover:bg-accent rounded-full transition-colors"
                title="最小化"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={ toggleExpanded }
                className="p-2 hover:bg-accent rounded-full transition-colors"
                title="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 音乐列表 */ }
          <div className="flex-1 overflow-y-auto">
            <MusicList onMusicSelect={ handleMusicSelect } currentMusic={ currentMusic } />
          </div>
        </div>

        {/* 遮罩层 */ }
        { isExpanded && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={ toggleExpanded }
          />
        ) }
      </div>
    )
  }

  // 桌面端右侧悬浮面板
  return (
    <div ref={ playerRef } className={ cn('fixed z-50', getPositionStyles(), className) }>
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
          'absolute right-0 mt-3 w-64 bg-background/95 backdrop-blur-sm rounded-lg shadow-2xl border',
          'transition-all duration-300 ease-in-out',
          'transform origin-top-right',
          isExpanded
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
          'max-h-[400px] overflow-hidden'
        ) }
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">音乐播放</h3>
              { currentMusic && (
                <p className="text-sm text-muted-foreground truncate">
                  正在播放: { currentMusic.title }
                </p>
              ) }
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={ toggleMinimized }
                className="p-1 hover:bg-accent rounded-full transition-colors"
                title="最小化"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={ toggleExpanded }
                className="p-1 hover:bg-accent rounded-full transition-colors"
                title="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <MusicList onMusicSelect={ handleMusicSelect } currentMusic={ currentMusic } />
      </div>
    </div>
  )
}