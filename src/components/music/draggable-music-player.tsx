'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Music, X, ChevronDown, Volume2, VolumeX, ListMusic } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IMusic } from '@/types/music'
import { MusicList } from '@/components/music/music-list'
import { useMusicPlayer } from '@/hooks/use-music-player'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { useMobile } from '@/hooks/use-mobile'
import { SynchronizedLyrics } from '@/components/music-player/synchronized-lyrics'
import { SingleLineLyrics } from './single-line-lyrics'
import { Slider } from '@/components/ui/slider'
import { parseLyrics } from '@/utils/lyrics-parser'
import { LyricLine } from '@/types'
import Image from "next/image"


interface DraggableMusicPlayerProps {
  className?: string
  defaultPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export function MusicPlayer({
  className,
  defaultPosition = 'top-right'
}: DraggableMusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [parsedLyrics, setParsedLyrics] = useState<LyricLine[]>([])
  const playerRef = useRef<HTMLDivElement>(null)
  const volumeTimeoutRef = useRef<NodeJS.Timeout>()

  const { currentMusic, play, pause, isPlaying: globalIsPlaying, volume, setVolume, currentTime } = useMusicPlayer()
  const { play: audioPlay, pause: audioPause } = useAudioPlayer()
  const isMobile = useMobile()

  // 确保客户端渲染
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 同步全局播放状态
  useEffect(() => {
    setIsPlaying(globalIsPlaying)
  }, [globalIsPlaying])

  // 解析歌词
  useEffect(() => {
    if (currentMusic?.lyrics) {
      const parsed = parseLyrics(currentMusic.lyrics)
      setParsedLyrics(parsed)
    } else {
      setParsedLyrics([])
    }
  }, [currentMusic?.lyrics])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current)
      }
    }
  }, []) // Only run on unmount

  const [isPlaying, setIsPlaying] = useState(false)



  // 播放/暂停切换
  const handlePlayButtonClick = () => {
    if (currentMusic) {
      if (isPlaying) {
        pause()
      } else {
        play(currentMusic)
      }
    }
  }

  // 播放列表切换
  const handlePlaylistToggle = () => {
    setIsExpanded(prev => !prev)
  }

  // 播放按钮点击 - 不触发拖拽
  const handlePlayClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    handlePlayButtonClick()
  }, [handlePlayButtonClick])

  // 播放列表切换 - 不触发拖拽
  const handlePlaylistClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    handlePlaylistToggle()
  }, [handlePlaylistToggle])



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

  const handleCoverClick = () => {
    if (currentMusic) {
      if (isPlaying) {
        pause()
      } else {
        play(currentMusic)
      }
    }
  }

  const handleMusicSelect = (music: IMusic) => {
    play(music)
    setIsExpanded(false)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setShowVolumeSlider(true)

    // Hide volume slider after 2 seconds
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current)
    }
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false)
    }, 2000)
  }

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider)
  }

  const toggleMinimized = () => {
    setIsMinimized(prev => !prev)
  }
  if (isMobile) {
    return (
      <div ref={ playerRef } className={ cn('fixed z-50', className) }>
        {/* 圆形播放按钮 - 支持点击播放/暂停 */ }
        <div
          className={ cn(
            'relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500',
            'shadow-lg hover:shadow-xl transition-all duration-300',
            'flex items-center justify-center text-white',
            'hover:scale-110 active:scale-95 cursor-pointer overflow-hidden',
            'z-40'
          ) }
          onClick={ handleCoverClick }
        >
          {/* 歌曲封面或默认图标 */ }
          { currentMusic?.cover ? (
            <Image
              src={ currentMusic.cover }
              alt={ currentMusic.title || '歌曲封面' }
              className="w-full h-full object-cover rounded-full"
              draggable={ false }
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              { isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Music className="w-6 h-6" />
              ) }
            </div>
          ) }

          {/* 播放状态覆盖层 */ }
          <div className={ cn(
            'absolute inset-0 bg-black/20 flex items-center justify-center rounded-full transition-opacity',
            isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
          ) }>
            { isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            ) }
          </div>
        </div>

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
          {/* 面板头部 - 分离播放控制和播放列表控制 */ }
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <button
                onClick={ handlePlayClick }
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
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-foreground truncate">{ currentMusic?.title || '音乐播放' }</h3>
                { currentMusic && (
                  <p className="text-sm text-muted-foreground truncate">
                    { currentMusic.artist }
                  </p>
                ) }
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={ toggleVolumeSlider }
                className="p-2 hover:bg-accent rounded-full transition-colors"
                title="音量"
              >
                { volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                ) }
              </button>
              <button
                onClick={ handlePlaylistClick }
                className="p-2 hover:bg-accent rounded-full transition-colors"
                title="关闭播放列表"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 音量控制 */ }
          { showVolumeSlider && (
            <div className="px-4 py-3 border-b bg-muted/50">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">音量</span>
                <div className="flex-1">
                  <Slider
                    value={ [volume * 100] }
                    onValueChange={ handleVolumeChange }
                    max={ 100 }
                    step={ 1 }
                    className="h-1"
                  />
                </div>
                <span className="text-sm text-muted-foreground min-w-[40px] text-right">
                  { Math.round(volume * 100) }%
                </span>
              </div>
            </div>
          ) }

          {/* 歌词显示 */ }
          { currentMusic && parsedLyrics.length > 0 && (
            <div className="px-4 py-3 border-b bg-muted/30">
              <div className="h-16 overflow-hidden">
                <SynchronizedLyrics
                  lyrics={ parsedLyrics }
                  playbackState={ {
                    isPlaying: isPlaying,
                    currentTime: currentTime,
                    duration: currentMusic.duration,
                    playbackRate: 1
                  } }
                  className="text-sm leading-tight"
                />
              </div>
            </div>
          ) }

          {/* 音乐列表 */ }
          <div className="p-4 overflow-y-auto" style={ { maxHeight: 'calc(80vh - 200px)' } }>
            <MusicList onMusicSelect={ handleMusicSelect } currentMusic={ currentMusic } />
          </div>
        </div>
      </div>
    )
  }

  // 桌面端固定位置版本
  return (
    <>
      <div
        className={ cn(
          'fixed z-50 top-36 right-6',
          className
        ) }
      >
        {/* 主播放器容器 - 仅拖拽手柄可拖拽 */ }
        <div className="relative">

          {/* 播放列表按钮 - 左上角 */ }
          <button
            onClick={ handlePlaylistClick }
            className={ cn(
              'absolute -top-2 -left-2 w-6 h-6 rounded-full bg-blue-500 cursor-pointer',
              'flex items-center justify-center text-white shadow-md',
              'hover:bg-blue-600 transition-all duration-200 hover:scale-110',
              'z-30'
            ) }
          >
            <ListMusic className="w-5 h-5" />
          </button>

          {/* 圆形播放按钮 */ }
          <div
            className={ cn(
              'relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500',
              'shadow-lg hover:shadow-xl transition-all duration-300',
              'flex items-center justify-center text-white',
              'hover:scale-110 active:scale-95',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
              'dark:focus:ring-offset-gray-900',
              'z-40 cursor-pointer overflow-hidden'
            ) }
            onClick={ handleCoverClick }
          >
            {/* 歌曲封面或默认图标 */ }
            { currentMusic?.cover ? (
              <Image
                src={ currentMusic.cover }
                alt={ currentMusic.title || '歌曲封面' }
                className="w-full h-full object-cover rounded-full"
                draggable={ false }
                width={ 64 }
                height={ 64 }
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                { isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Music className="w-6 h-6" />
                ) }
              </div>
            ) }

            {/* 播放状态覆盖层 */ }
            <div className={ cn(
              'absolute inset-0 bg-black/20 flex items-center justify-center rounded-full transition-opacity',
            ) }>
              { isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              ) }
            </div>
          </div>
        </div>




        {/* 音乐列表面板 */ }
        <div
          className={ cn(
            'absolute top-20 right-0 transform ',
            'bg-background/95 backdrop-blur-sm rounded-lg shadow-2xl border',
            'w-[320px] max-h-[400px] overflow-hidden',
            'transition-all duration-300 ease-in-out',
            isExpanded
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          ) }
        >
          {/* 面板头部 - 分离播放控制和播放列表控制 */ }
          <div className="grid grid-cols-2 gap-2 items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3 min-w-0">
              <button
                onClick={ handlePlayClick }
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
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-foreground truncate">{ currentMusic?.title || '音乐播放' }</h3>
                { currentMusic && (
                  <p className="text-sm text-muted-foreground truncate">
                    { currentMusic.artist }
                  </p>
                ) }
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={ toggleVolumeSlider }
                className="p-2 hover:bg-accent rounded-full transition-colors"
                title="音量"
              >
                { volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                ) }
              </button>
              <button
                onClick={ toggleMinimized }
                className="p-2 hover:bg-accent rounded-full transition-colors"
                title="最小化"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={ handlePlaylistClick }
                className="p-2 hover:bg-accent rounded-full transition-colors"
                title="关闭播放列表"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 音量控制 */ }
            <div
              className={ cn(
                'col-span-2',
                'bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border',
                'p-2 transition-all duration-300',

              ) }
            >
              <div className="flex items-center space-x-2">
                <button
                  onClick={ toggleVolumeSlider }
                  className="p-1 hover:bg-accent rounded-full transition-colors"
                >
                  { volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  ) }
                </button>
                <div className="w-20">
                  <Slider
                    value={ [volume * 100] }
                    onValueChange={ handleVolumeChange }
                    max={ 100 }
                    step={ 1 }
                    className="h-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 音乐列表 */ }
          <div className="p-4 overflow-y-auto" style={ { maxHeight: '300px' } }>
            <MusicList onMusicSelect={ handleMusicSelect } currentMusic={ currentMusic } />
          </div>
        </div>
      </div>
      {/* 歌词显示区域 - 精确定位在header下方 */ }
      {
       isPlaying && currentMusic && parsedLyrics.length > 0 && (
          <div
            className={ cn(
              'fixed z-40 w-full',
              'bg-gradient-to-r from-background/90 via-background/95 to-background/90 backdrop-blur-md',
              'border-b border-border/50 shadow-lg',
              'h-[50px] overflow-hidden',
              'transition-all duration-500 ease-out',
              'opacity-100 translate-y-0'
            ) }
            style={{
              bottom: '0px', // header高度是56px，确保不重叠
              left: 0,
              right: 0
            }}
          >
            <SingleLineLyrics
              lyrics={ parsedLyrics }
              playbackState={ {
                isPlaying: isPlaying,
                currentTime: currentTime,
                duration: currentMusic.duration,
                playbackRate: 1
              } }
              className="h-full"
            />
          </div>
        )
      }
    </>

  )
}