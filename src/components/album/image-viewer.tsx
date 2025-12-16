"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"

interface ImageViewerProps {
  images: Array<{
    id: number
    src: string
    alt: string
    width: number
    height: number
  }>
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  slug: string
}

export function ImageViewer({ images, initialIndex = 0, isOpen, onClose }: ImageViewerProps) {
  // 使用初始索引作为默认值
  const [currentIndex, setCurrentIndex] = useState(() => initialIndex)

  // 使用 useCallback 优化导航函数
  const navigatePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const navigateNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  // 处理键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          navigatePrevious()
          break
        case "ArrowRight":
          navigateNext()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, navigatePrevious, navigateNext, onClose])

  // 当组件打开时，重置索引
  useEffect(() => {
    if (isOpen) {
      // 使用 setTimeout 将状态更新推迟到下一个事件循环
      const timer = setTimeout(() => {
        setCurrentIndex(initialIndex)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen, initialIndex])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      {/* 关闭按钮 */ }
      <button
        onClick={ onClose }
        className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
        aria-label="关闭图片查看器"
      >
        <X className="h-6 w-6" />
      </button>

      {/* 图片导航按钮 */ }
      <button
        onClick={ navigatePrevious }
        className="absolute left-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
        aria-label="上一张图片"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        onClick={ navigateNext }
        className="absolute right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
        aria-label="下一张图片"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* 图片计数器 */ }
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-white bg-opacity-20">
        <p className="text-sm font-medium">
          { currentIndex + 1 } / { images.length }
        </p>
      </div>

      {/* 主图片 */ }
      <div className="max-w-[90vw] max-h-[90vh] relative">
        <Image
          src={ currentImage.src }
          alt={ currentImage.alt }
          width={ currentImage.width }
          height={ currentImage.height }
          className="max-w-full max-h-full object-contain"
          unoptimized={ true }
        />
      </div>
    </div>
  )
}
