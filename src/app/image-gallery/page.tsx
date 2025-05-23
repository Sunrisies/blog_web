"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/image-gallery/search-bar"
import { GalleryGrid } from "@/components/image-gallery/gallery-grid"
import { FullScreenView } from "@/components/image-gallery/full-screen-view"
import type { ImageData } from "@/types/gallery"

// Sample image data - in a real app, this would come from an API or database
const sampleImages: ImageData[] = [
  {
    id: "1",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片1.jpeg",
    size: "2.8 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "2",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片2.jpeg",
    size: "3.4 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "3",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片3.jpeg",
    size: "2.1 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "4",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片3.jpeg",
    size: "2.1 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "5",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片3.jpeg",
    size: "2.1 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "6",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片3.jpeg",
    size: "2.1 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "7",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片3.jpeg",
    size: "2.1 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "8",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片3.jpeg",
    size: "2.1 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "9",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片3.jpeg",
    size: "2.1 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
  {
    id: "10",
    path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    title: "示例图片3.jpeg",
    size: "2.1 MB",
    type: "image/jpeg",
    created_at: "2025-05-12T07:26:55.626Z",
    storage_provider: "qiniu"
  },
]

export default function ImageGallery() {
  const [images, setImages] = useState<ImageData[]>(sampleImages)
  const [filteredImages, setFilteredImages] = useState<ImageData[]>(sampleImages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Filter images based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredImages(images)
      return
    }

    const lowerCaseSearch = searchTerm.toLowerCase()
    const filtered = images.filter(
      (image) =>
        image.title.toLowerCase().includes(lowerCaseSearch)
    )

    setFilteredImages(filtered)
  }, [searchTerm, images])

  // Handle image click to open full-screen view
  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image)
    setIsFullScreen(true)
  }

  // Handle closing full-screen view
  const handleCloseFullScreen = () => {
    setIsFullScreen(false)
  }

  // Handle navigation in full-screen view
  const handleNavigate = (direction: "next" | "prev") => {
    if (!selectedImage) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    let newIndex: number

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }

    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Image Gallery</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No images found matching "{searchTerm}"</p>
        </div>
      ) : (
        <GalleryGrid images={filteredImages} onImageClick={handleImageClick} />
      )}

      {isFullScreen && selectedImage && (
        <FullScreenView
          image={selectedImage}
          onClose={handleCloseFullScreen}
          onNavigate={handleNavigate}
          hasNext={filteredImages.length > 1}
          hasPrev={filteredImages.length > 1}
        />
      )}
    </div>
  )
}
