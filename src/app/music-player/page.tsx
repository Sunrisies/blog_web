'use client'

import { useEffect } from 'react'
import { ResponsiveMusicPlayer } from '@/components/music/responsive-music-player'

export default function MusicPlayerPage() {
  // 初始化音频播放器

  useEffect(() => {
    // 页面加载时添加浮动音乐播放器
    const playerContainer = document.createElement('div')
    playerContainer.id = 'floating-music-player-container'
    document.body.appendChild(playerContainer)

    return () => {
      // 清理
      const container = document.getElementById('floating-music-player-container')
      if (container) {
        document.body.removeChild(container)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* 主要内容区域 */ }
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">音乐播放器</h1>
          <p className="text-gray-600">享受美妙的音乐时光</p>
        </div>

        {/* 音乐播放器控制面板 */ }
        <div className="max-w-4xl mx-auto">
          {/* 这里可以添加更多的音乐播放器功能 */ }
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎵 音乐播放</h2>
              <p className="text-gray-600 mb-6">
                点击右下角的播放按钮开始享受音乐
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">🎵 丰富曲库</h3>
                  <p className="text-sm opacity-90">精选优质音乐，满足不同品味</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">📱 响应式设计</h3>
                  <p className="text-sm opacity-90">完美适配各种设备尺寸</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">🎛️ 智能控制</h3>
                  <p className="text-sm opacity-90">便捷的播放控制和音量调节</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 浮动音乐播放器 */ }
      <ResponsiveMusicPlayer className="fixed right-6 bottom-6 z-50" />
    </div>
  )
}
