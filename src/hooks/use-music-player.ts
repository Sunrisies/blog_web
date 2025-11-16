'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IMusic, IMusicPlayerState } from '@/types/music';

interface MusicPlayerStore extends IMusicPlayerState {
  play: (music: IMusic) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaylist: (playlist: IMusic[]) => void;
  next: () => void;
  previous: () => void;
  isLoading?: boolean;
}

const useMusicPlayerStore = create<MusicPlayerStore>()(
  persist(
    (set, get) => ({
      isPlaying: false,
      currentMusic: null,
      currentTime: 0,
      volume: 0.8,
      playlist: [],

      play: (music: IMusic) => {
        const { currentMusic } = get();
        
        // 如果正在播放同一首歌，只是恢复播放
        if (currentMusic?.id === music.id) {
          set({ isPlaying: true });
        } else {
          // 播放新歌
          set({
            isPlaying: true,
            currentMusic: music,
            currentTime: 0,
            isLoading: true,
          });
          
          // 模拟加载完成（实际应用中可以通过音频事件监听）
          setTimeout(() => {
            set({ isLoading: false });
          }, 500);
        }
      },

      pause: () => {
        set({ isPlaying: false, isLoading: false });
      },

      resume: () => {
        set({ isPlaying: true });
      },

      stop: () => {
        set({
          isPlaying: false,
          currentMusic: null,
          currentTime: 0,
          isLoading: false,
        });
      },

      setCurrentTime: (time: number) => {
        set({ currentTime: time });
      },

      setVolume: (volume: number) => {
        set({ volume: Math.max(0, Math.min(1, volume)) });
      },

      setPlaylist: (playlist: IMusic[]) => {
        set({ playlist });
      },

      next: () => {
        const { playlist, currentMusic } = get();
        if (!currentMusic || playlist.length === 0) return;

        const currentIndex = playlist.findIndex(music => music.id === currentMusic.id);
        const nextIndex = (currentIndex + 1) % playlist.length;
        const nextMusic = playlist[nextIndex];

        if (nextMusic) {
          get().play(nextMusic);
        }
      },

      previous: () => {
        const { playlist, currentMusic } = get();
        if (!currentMusic || playlist.length === 0) return;

        const currentIndex = playlist.findIndex(music => music.id === currentMusic.id);
        const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
        const prevMusic = playlist[prevIndex];

        if (prevMusic) {
          get().play(prevMusic);
        }
      },
    }),
    {
      name: 'music-player-storage',
      partialize: (state) => ({
        volume: state.volume,
        currentMusic: state.currentMusic,
        currentTime: state.currentTime,
      }),
    }
  )
);

// 自定义hook，方便在组件中使用
export function useMusicPlayer() {
  const store = useMusicPlayerStore();
  
  return {
    // 状态
    isPlaying: store.isPlaying,
    currentMusic: store.currentMusic,
    currentTime: store.currentTime,
    volume: store.volume,
    playlist: store.playlist,
    
    // 方法
    play: store.play,
    pause: store.pause,
    resume: store.resume,
    stop: store.stop,
    setCurrentTime: store.setCurrentTime,
    setVolume: store.setVolume,
    setPlaylist: store.setPlaylist,
    next: store.next,
    previous: store.previous,
  };
}