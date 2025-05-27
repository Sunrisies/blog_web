import { GalleryGrid } from "@/components/image-gallery/gallery-grid";
import { SearchBar } from "@/components/image-gallery/search-bar";
import { generateMockImages } from '@/lib/mock-data';
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "图片库 | 朝阳的码农札记 - 精选技术图片与截图分享",
  description: "探索开发者分享的高质量技术图片、代码截图和项目演示。我们收集了各类编程相关的视觉资料，帮助你更直观地理解技术概念和实践应用。",
  keywords: ["技术图片", "代码截图", "项目演示", "编程教程", "技术分享", "视觉学习", "开发工具"],
  openGraph: {
    title: "图片库 | 朝阳的码农札记 - 精选技术图片与截图分享",
    description: "探索开发者分享的高质量技术图片、代码截图和项目演示。收集了各类编程相关的视觉资料，帮助你更直观地理解技术概念。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "https://sunrise1024.top/og-gallery.png",
      width: 1200,
      height: 630,
      alt: "技术图片库"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "图片库 | 精选技术图片与截图分享",
    description: "探索开发者分享的高质量技术图片、代码截图和项目演示。直观的编程学习资源，助你快速掌握技术要点。",
    images: ["https://sunrise1024.top/og-gallery.png"]
  }
};
function SearchBarFallback() {
  return <>placeholder</>
}

export default function ImageGallery() {
  const images = generateMockImages(100)

  return (
    <div className=" flex flex-col">
      <div className="md:static fixed top-14 inset-x-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b md:border-none md:bg-transparent md:backdrop-blur-none">
        <div className="container mx-auto px-4 py-2  md:py-4">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-20 md:pt-4 pb-4">
        <Suspense fallback={<SearchBarFallback />}>
          <GalleryGrid images={images} />
        </Suspense>
      </div>
    </div>
  )
}
