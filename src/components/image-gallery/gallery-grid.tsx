"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { ImageData } from "@/types/gallery"
import { FullScreenView } from "./full-screen-view"

interface GalleryGridProps {
  images: ImageData[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const imagesPerPage = 8
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)

  // 计算当前页的图片
  const indexOfLastImage = page * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage)
  const totalPages = Math.ceil(images.length / imagesPerPage)

  // 生成分页链接的函数
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `?${params.toString()}`
  }

  // 处理图片导航
  const handleNavigate = (direction: "next" | "prev") => {
    if (!selectedImage) return
    const currentIndex = currentImages.findIndex(img => img.id === selectedImage.id)
    if (direction === "next" && currentIndex < currentImages.length - 1) {
      setSelectedImage(currentImages[currentIndex + 1])
    } else if (direction === "prev" && currentIndex > 0) {
      setSelectedImage(currentImages[currentIndex - 1])
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentImages.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-64"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative w-full h-full">
              <Image
                src={image.path}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-medium truncate">{image.title}</h3>
              <p className="text-xs text-gray-300 mt-1">{image.size}</p>
              <p className="text-xs text-gray-300">{new Date(image.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Link
            href={createPageUrl(Math.max(page - 1, 1))}
            className={`px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
          >
            上一页
          </Link>
          <span className="text-sm text-gray-600">
            第 {page} 页，共 {totalPages} 页
          </span>
          <Link
            href={createPageUrl(Math.min(page + 1, totalPages))}
            className={`px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
          >
            下一页
          </Link>
        </div>
      )}

      {selectedImage && (
        <FullScreenView
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNavigate={handleNavigate}
          hasNext={currentImages.findIndex(img => img.id === selectedImage.id) < currentImages.length - 1}
          hasPrev={currentImages.findIndex(img => img.id === selectedImage.id) > 0}
        />
      )}
    </div>
  )
}
