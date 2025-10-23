import { BlogPostCard } from "@/components/home/blog-post-card"
import { ProfileCard } from "@/components/home/profile-card"
import { RecentPostsList } from "@/components/home/recent-posts-list"
import SentencesCarousel from "@/components/home/SentencesCarousel"
import { TagCloud } from "@/components/home/tag-cloud"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { Button } from "@/components/ui/button"
import Http, { PaginatedResponseDto, ResponseDto } from "@/services/request"
import { IBlog } from "@/types/blog"
import { ArrowRight } from "lucide-react"
import type { Metadata, } from "next"

import Link from "next/link"
type Tag = {
  id: number,
  name: string,
  count: number
}

export const metadata: Metadata = {
  title: "朝阳的码农札记 | 全栈开发者的技术分享与经验总结",
  description: "这是一个专注于全栈开发、Web技术、云原生和DevOps的技术博客。在这里，我分享实用的编程技巧、项目经验和技术见解，帮助开发者解决实际问题，提升编程技能。欢迎加入我的学习社区！",
  keywords: ["全栈开发", "Web开发", "React", "Node.js", "云原生", "DevOps", "技术博客", "编程学习", "最佳实践"],
  authors: [{ name: "朝阳", url: "https://github.com/Sunrisies" }],
  creator: "朝阳",
  publisher: "朝阳的码农札记",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://sunrise1024.top",
    title: "朝阳的码农札记 | 全栈开发者的技术分享与经验总结",
    description: "这是一个专注于全栈开发、Web技术、云原生和DevOps的技术博客。在这里，我分享实用的编程技巧、项目经验和技术见解，帮助开发者解决实际问题，提升编程技能。",
    siteName: "朝阳的码农札记",
    images: [{
      url: "https://sunrise1024.top/og-image.png",
      width: 1200,
      height: 630,
      alt: "朝阳的码农札记"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "朝阳的码农札记 | 全栈开发者的技术分享与经验总结",
    description: "这是一个专注于全栈开发、Web技术、云原生和DevOps的技术博客。在这里，我分享实用的编程技巧、项目经验和技术见解。",
    images: ["https://sunrise1024.top/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://sunrise1024.top"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
}
const getPostApi = async <T,>(slug: number) => {
  const { data } = await Http.get(`v1/posts?page=${slug}&limit=12`).json<PaginatedResponseDto<T>>()
  return data
}
const getTags = async <T,>() => {
  const data = await Http.get("v1/tags/count").json<ResponseDto<T[]>>()
  return data
}
export default async function HomePage() {
  const { data: blogs } = await getPostApi<IBlog[]>(1)
  const { data: tags } = await getTags<Tag>()
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] dark:bg-zinc-900">
      <main className="flex-1">
        <section className="py-8 md:py-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">朝阳的码农札记</h1>
            <SentencesCarousel />
          </div>
        </section>

        <section className="container pb-8">
          <div className="grid gap-10 md:grid-cols-3">

            <div className="md:col-span-2">
              <div className="grid gap-6">
                { blogs.map((item) => (
                  <BlogPostCard
                    key={ item.id }
                    blog={ item }
                  />
                )) }
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" asChild className="group">
                  <Link href="/blog/1">
                    查看更多
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:col-span-1">
              <ProfileCard />

              <div className="mt-8 rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-medium">标签</h2>
                <TagCloud tags={ tags } />
              </div>

              <div className="mt-8 rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-medium">最新文章</h2>
                <RecentPostsList blogs={ blogs } />
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  )
}

