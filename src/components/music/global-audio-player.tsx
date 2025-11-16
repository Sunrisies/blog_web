'use client';

import { useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/use-audio-player';

export function GlobalAudioPlayer() {
  const { audioRef } = useAudioPlayer();

  useEffect(() => {
    // 确保音频元素存在并添加到body
    if (audioRef.current && !document.body.contains(audioRef.current)) {
      document.body.appendChild(audioRef.current);
    }

    return () => {
      // 清理时移除音频元素
      if (audioRef.current && document.body.contains(audioRef.current)) {
        document.body.removeChild(audioRef.current);
      }
    };
  }, [audioRef]);

  return null; // 这个组件不渲染任何可见内容
}