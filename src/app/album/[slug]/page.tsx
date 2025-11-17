import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlbumDetail } from "@/components/album/album-detail"

// 定义相册元数据
const albumData: Record<string, { title: string; description: string; category: string }> = {
  food: {
    title: "自己做的，或外面吃的",
    description: "美食记录",
    category: "美食"
  },
  travel: {
    title: "去过的地方",
    description: "旅行足迹",
    category: "足迹"
  },
  life: {
    title: "生活的精彩瞬间",
    description: "生活记录",
    category: "生活"
  },
  scenery: {
    title: "美丽的景色",
    description: "家乡风景",
    category: "景色"
  }
}

// 生成相册图片
function generateAlbumImages(slug: string, count: number = 12) {
  // 确保slug存在
  if (!slug) return [];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    src: `/album/${slug}/${i + 1}.jpg`,
    alt: `${albumData[slug]?.title || slug} 图片 ${i + 1}`,
    width: 800,
    height: 600
  }))
}

// 动态生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params?.slug;
  
  // 如果slug不存在，返回默认元数据
  if (!slug) {
    return {
      title: "相册页面 - 中文博客",
      description: "浏览精美相册"
    }
  }
  
  const album = albumData[slug]

  if (!album) {
    return {
      title: "相册未找到",
      description: "您请求的相册不存在"
    }
  }

  return {
    title: `${album.title} - 中文博客`,
    description: album.description
  }
}

export default function AlbumPage({ params }: { params: { slug: string } }) {
  // 确保params存在且包含slug
  const slug = params?.slug;
  
  // 如果slug不存在，显示错误页面
  if (!slug) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">无效的相册链接</h1>
        <p className="text-muted-foreground mb-6">相册链接无效</p>
        <Button asChild>
          <Link href="/album">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回相册列表
          </Link>
        </Button>
      </div>
    )
  }
  
  const album = albumData[slug]

  // 如果相册不存在，显示404页面
  if (!album) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">相册未找到</h1>
        <p className="text-muted-foreground mb-6">您请求的相册不存在</p>
        <Button asChild>
          <Link href="/album">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回相册列表
          </Link>
        </Button>
      </div>
    )
  }

  // 生成相册图片
  const images = generateAlbumImages(slug)

  return (
    <AlbumDetail
      slug={slug}
      title={album.title}
      category={album.category}
      description={album.description}
      images={images}
    />
  )
}
