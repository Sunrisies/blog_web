"use client"

import Image from "next/image"
import { useState } from "react"

interface AlbumImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  slug: string
  id: number
}

export function AlbumImage({ src, alt, width, height, className, slug, id }: AlbumImageProps) {
  // 生成备用图片URL，使用picsum作为备用源
  const fallbackSrc = `https://picsum.photos/seed/${slug}-${id}/800/600.jpg`
  const [imgSrc, setImgSrc] = useState(src)
  const [errorCount, setErrorCount] = useState(0)

  const handleError = () => {
    if (errorCount === 0) {
      // 第一次错误，尝试使用备用图片
      setImgSrc(fallbackSrc)
    } else if (errorCount === 1) {
      // 第二次错误，使用本地占位符
      setImgSrc(`/placeholder.svg?height=600&width=800&text=${encodeURIComponent(alt)}`)
    }
    setErrorCount(prev => prev + 1)
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      unoptimized={true}
    />
  )
}
