"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react"
import type { ImageData } from "@/types/gallery"

interface FullScreenViewProps {
  image: ImageData
  onClose: () => void
  onNavigate: (direction: "next" | "prev") => void
  hasNext: boolean
  hasPrev: boolean
}

export function FullScreenView({ image, onClose, onNavigate, hasNext, hasPrev }: FullScreenViewProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowRight" && hasNext) {
        onNavigate("next")
      } else if (e.key === "ArrowLeft" && hasPrev) {
        onNavigate("prev")
      } else if (e.key === "i") {
        setShowInfo((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [onClose, onNavigate, hasNext, hasPrev])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
        aria-label="Close full screen view"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Info button */}
      <button
        onClick={() => setShowInfo((prev) => !prev)}
        className="absolute top-4 left-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
        aria-label={showInfo ? "Hide image information" : "Show image information"}
      >
        <Info className="h-6 w-6" />
      </button>

      {/* Navigation buttons */}
      {hasPrev && (
        <button
          onClick={() => onNavigate("prev")}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={() => onNavigate("next")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={image.path}
          alt={image.title}
          fill
          className="object-contain"
          onLoad={() => setIsLoading(false)}
          priority
        />
      </div>

      {/* Image info */}
      {showInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 transition-transform">
          <h2 className="text-xl font-bold mb-1">{image.title}</h2>
          <p className="text-sm text-gray-300">大小: {image.size}</p>
          <p className="text-sm text-gray-300">类型: {image.type}</p>
          <p className="text-sm text-gray-300">上传时间: {new Date(image.created_at).toLocaleString()}</p>
          <p className="text-sm text-gray-300">存储提供商: {image.storage_provider}</p>
        </div>
      )}
    </div>
  )
}
