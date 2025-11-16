'use client';

import { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { Slider } from '@/components/ui/slider';

interface MusicPlayerControlsProps {
  className?: string;
}

export function MusicPlayerControls({ className }: MusicPlayerControlsProps) {
  const { currentMusic, isPlaying, play, pause, next, previous, volume, setVolume, setCurrentTime } = useMusicPlayer();
  const { seek } = useAudioPlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentMusic) {
      setDuration(currentMusic.duration);
      setProgress(0);
    }
  }, [currentMusic]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else if (currentMusic) {
      play(currentMusic);
    }
  };

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0];
    setProgress(newProgress);
    const newTime = (newProgress / 100) * duration;
    setCurrentTime(newTime);
    seek(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentMusic) {
    return (
      <div className={cn('flex items-center justify-center p-8 text-muted-foreground', className)}>
        <p>请选择一首歌曲开始播放</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-card rounded-lg p-6 shadow-lg', className)}>
      {/* 当前播放歌曲信息 */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-foreground truncate">{currentMusic.title}</h4>
          <p className="text-sm text-muted-foreground truncate">{currentMusic.artist}</p>
          {currentMusic.album && (
            <p className="text-xs text-muted-foreground truncate">{currentMusic.album}</p>
          )}
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-4">
        <Slider
          value={[progress]}
          onValueChange={handleProgressChange}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentMusic.duration * (progress / 100))}</span>
          <span>{formatTime(currentMusic.duration)}</span>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={previous}
          className={cn(
            'p-2 rounded-full hover:bg-accent transition-colors',
            'text-muted-foreground hover:text-foreground'
          )}
          aria-label="上一首"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={handlePlayPause}
          className={cn(
            'p-3 rounded-full bg-primary hover:bg-primary/90',
            'text-primary-foreground shadow-lg',
            'transition-all hover:scale-105 active:scale-95'
          )}
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>

        <button
          onClick={next}
          className={cn(
            'p-2 rounded-full hover:bg-accent transition-colors',
            'text-muted-foreground hover:text-foreground'
          )}
          aria-label="下一首"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* 音量控制 */}
      <div className="flex items-center space-x-3">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={[volume * 100]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-8 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}