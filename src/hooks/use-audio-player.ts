"use client";

import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "./use-music-player";

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentMusic, isPlaying, setCurrentTime, next, isLoading } =
    useMusicPlayer();
  const [hasUserInteraction, setHasUserInteraction] = useState(false);

  // 监听用户交互
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteraction(true);
    };

    // 添加各种用户交互事件监听
    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  useEffect(() => {
    // 创建音频元素
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();

      const audio = audioRef.current;

      // 监听音频结束事件
      audio.addEventListener("ended", () => {
        next(); // 播放下一首
      });

      // 监听时间更新事件
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      return () => {
        audio.pause();
        audio.removeEventListener("ended", next);
        audio.removeEventListener("timeupdate", () =>
          setCurrentTime(audio.currentTime)
        );
      };
    }
  }, [next, setCurrentTime]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (currentMusic) {
      // 设置音频源
      audio.src = currentMusic.url;

      // 加载音频但不自动播放，等待明确的播放调用
      audio.load();

      if (isPlaying) {
        // 延迟播放，确保音频已加载
        setTimeout(() => {
          audio.play().catch((error) => {
            console.error("音频播放失败:", error);
          });
        }, 100);
      }
    } else {
      // 停止播放
      audio.pause();
      audio.currentTime = 0;
    }
  }, [currentMusic, isPlaying]);

  // 处理播放状态变化
  useEffect(() => {
    if (!audioRef.current || !currentMusic || !hasUserInteraction || isLoading)
      return;

    const audio = audioRef.current;

    if (isPlaying) {
      // 确保音频已加载后再播放
      if (audio.readyState >= 2) {
        // HAVE_CURRENT_DATA
        audio.play().catch((error) => {
          console.error("音频播放失败:", error);
          // 处理特定的播放错误
          if (error.name === "NotAllowedError") {
            console.warn("播放被阻止，需要用户交互");
          } else if (error.name === "NotSupportedError") {
            console.warn("音频格式不支持");
          } else if (error.name === "AbortError") {
            console.warn("播放被中断，可能是由于新的加载请求");
          }
        });
      } else {
        // 如果音频还没加载好，等待加载完成
        const handleLoadedData = () => {
          if (isPlaying && audioRef.current && !isLoading) {
            audio.play().catch((error) => {
              console.error("音频播放失败:", error);
            });
          }
        };

        audio.addEventListener("loadeddata", handleLoadedData, { once: true });

        return () => {
          audio.removeEventListener("loadeddata", handleLoadedData);
        };
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentMusic, hasUserInteraction, isLoading]);

  // 控制方法
  const play = () => {
    if (audioRef.current && currentMusic && hasUserInteraction && !isLoading) {
      // 如果音频还没准备好，先加载
      if (audioRef.current.readyState < 2) {
        audioRef.current.load();
      }

      // 延迟播放，确保音频已加载
      setTimeout(() => {
        if (audioRef.current && !isLoading) {
          audioRef.current.play().catch((error) => {
            console.error("播放失败:", error);
            if (error.name === "NotAllowedError") {
              console.warn("播放需要用户交互");
            }
          });
        }
      }, 150);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return {
    play,
    pause,
    seek,
    setVolume,
    audioRef,
  };
}
