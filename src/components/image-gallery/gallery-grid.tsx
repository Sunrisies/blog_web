"use client"

import { useState } from "react"
import Image from "next/image"
import type { ImageData } from "@/types/gallery"

interface GalleryGridProps {
  images: ImageData[]
  onImageClick: (image: ImageData) => void
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-64"
          onClick={() => onImageClick(image)}
        >
          <div className="relative w-full h-full">
            <Image
              src={image.path}
              alt={image.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-opacity duration-300 ${
                loadedImages[image.id] ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => handleImageLoad(image.id)}
              loading="lazy"
            />
            {!loadedImages[image.id] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-medium truncate">{image.title}</h3>
            <p className="text-xs text-gray-300 mt-1">{image.size}</p>
            <p className="text-xs text-gray-300">{new Date(image.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
