"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/image-gallery/search-bar"
import { GalleryGrid } from "@/components/image-gallery/gallery-grid"
import { FullScreenView } from "@/components/image-gallery/full-screen-view"
import type { ImageData } from "@/types/gallery"
import { generateMockImages } from '@/lib/mock-data'

export default function ImageGallery() {
  const [images, setImages] = useState<ImageData[]>(generateMockImages(100))
  const [filteredImages, setFilteredImages] = useState<ImageData[]>(generateMockImages(100))
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
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

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image)
    setIsFullScreen(true)
  }

  const handleCloseFullScreen = () => {
    setIsFullScreen(false)
  }

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
