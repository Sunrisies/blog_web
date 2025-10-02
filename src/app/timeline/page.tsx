import { ScrollToTopButton } from '@/components/scroll-to-top-button'
import { CalendarHeatmap } from '@/components/timeline/calendar-heatmap'
import Http, { ResponseDto } from "@/services/request"
import { IArticle } from "@/types/article"
import { warehouseType } from '@/types/blog'
import { getClientInfo } from '@/utils/get-client-info'
import type { Metadata } from "next"
// 获取时光轴文章的接口
const getTimelineArticlesApi = async <T,>() => {
  const headers = await getClientInfo()
  return (await Http.get<T>(`/article/timeline`, { headers })).data
}
const getWarehouse = async <T,>() => await Http.get<T, ResponseDto<T>>('/article/uploadTime')
export const metadata: Metadata = {
  title: "时光轴 | 朝阳的码农札记",
  description: "记录技术成长的点点滴滴，分享学习历程和技术见解，见证每一步成长的足迹。",
  keywords: ["技术博客", "时光轴", "学习记录", "技术成长", "编程笔记"],

  // OpenGraph 社交媒体分享信息
  openGraph: {
    title: "时光轴 | 朝阳的码农札记",
    description: "记录技术成长的点点滴滴，分享学习历程和技术见解，见证每一步成长的足迹。",
    type: "website",
    url: "/timeline",
    siteName: "朝阳的码农札记",
    locale: "zh_CN",
    images: [
      {
        url: "https://aly.chaoyang1024.top/uploads/2025/2/26/og-timeline.jpg",
        width: 1200,
        height: 630,
        alt: "时光轴封面图"
      }
    ]
  },

  // Twitter 卡片信息
  twitter: {
    card: "summary_large_image",
    title: "时光轴 | 朝阳的码农札记",
    description: "记录技术成长的点点滴滴，分享学习历程和技术见解。",
    images: ["https://aly.chaoyang1024.top/uploads/2025/2/26/og-timeline.jpg"]
  },

  // 其他元数据
  alternates: {
    canonical: "/timeline"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large"
    }
  },

  // 结构化数据
  verification: {
    google: "google-site-verification-code",
  }
}

export default async function TimelinePage() {
  const { data: articles } = await getTimelineArticlesApi<IArticle[]>()
  const { data: warehouse } = await getWarehouse<warehouseType>()
  return (
    <>
      <div className="container mx-auto w-full md:w-3/4 px-2 md:px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">时光轴</h1>
        <div className="flex justify-start">
          <div className="my-4 w-full md:w-5/6 border-red-400 hidden md:block">
            <CalendarHeatmap warehouse={warehouse} />
          </div>
        </div>
        <div className="relative border-l-2 border-primary/30 pl-4 md:pl-7.5 ml-2 md:ml-10">
          {articles.length > 0 ? articles.map((article, index) => (
            <div key={article.uuid} className="mb-8 relative w-full md:w-3/4">
              <div className="absolute -left-[25px] md:-left-[41px] w-5 h-5 bg-background border-2 border-primary rounded-full" />
              <div className="group block p-4 md:p-6 bg-card hover:bg-accent rounded-lg transition-colors">
                {/* 日期 */}
                <time className="text-sm text-muted-foreground mb-2 block">
                  {new Date(article.publish_time!).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>

                {/* 文章标题 */}
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  <a href={`/article/${article.uuid}`}>
                    {article.title}
                  </a>
                </h2>

                {/* 文章描述 */}
                <p className="text-muted-foreground line-clamp-2">
                  {article.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {article.tags!.map(tag => (
                    <span
                      key={tag.id}
                      className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )) : <div>没有文章</div>}
        </div>
      </div>
      <ScrollToTopButton />
    </>
  )
}