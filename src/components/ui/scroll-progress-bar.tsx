
'use client'

import { useEffect, useState } from 'react'

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    let scrollTimeout: NodeJS.Timeout
    
    const handleScroll = () => {
      // 显示进度条
      setIsVisible(true)
      
      // 清除之前的计时器
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // 设置新的计时器，在滚动停止后隐藏进度条
      scrollTimeout = setTimeout(() => {
        setIsVisible(false)
      }, 1000) // 滚动停止1秒后隐藏
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollPosition = window.scrollY
          const progress = (scrollPosition / totalHeight) * 100
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    // 初始化滚动进度
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [])

  return (
    <div className={`fixed left-0 w-full h-1.5 bg-gray-200 dark:bg-gray-700 z-[60] shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="h-full w-full bg-white opacity-30 animate-pulse"></div>
      </div>
    </div>
  )
}
