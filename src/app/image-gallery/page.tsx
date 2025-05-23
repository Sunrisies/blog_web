import { SearchBar } from "@/components/image-gallery/search-bar"
import { GalleryGrid } from "@/components/image-gallery/gallery-grid"
import type { ImageData } from "@/types/gallery"
import { generateMockImages } from '@/lib/mock-data'

export default function ImageGallery() {
  const images = generateMockImages(100)

  return (
    <div className=" flex flex-col">
      <div className="md:static fixed top-14 inset-x-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b md:border-none md:bg-transparent md:backdrop-blur-none">
        <div className="container mx-auto px-4 py-2  md:py-4">
          <SearchBar />
        </div>
      </div>
      <div className="container mx-auto px-4 pt-20 md:pt-4 pb-4">
        <GalleryGrid images={images} />
      </div>
    </div>
  )
}
