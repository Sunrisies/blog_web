"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlbumImage } from "@/components/album/album-image"
import { ImageViewer } from "@/components/album/image-viewer"

interface AlbumDetailProps {
  slug: string
  title: string
  category: string
  description: string
  images: Array<{
    id: number
    src: string
    alt: string
    width: number
    height: number
  }>
}

export function AlbumDetail({ slug, title, category, description, images }: AlbumDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 图片查看器 */}
      <ImageViewer
        images={images}
        isOpen={!!selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        initialIndex={selectedImageIndex || 0}
        slug={slug}
      />

      {/* 页面头部 */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/album">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回相册列表
          </Link>
        </Button>

        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* 相册网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
            onClick={() => setSelectedImageIndex(index)}
          >
            <AlbumImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              slug={slug}
              id={image.id}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部操作区 */}
      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/album">
            <Grid3X3 className="mr-2 h-4 w-4" />
            查看更多相册
          </Link>
        </Button>
      </div>
    </div>
  )
}
