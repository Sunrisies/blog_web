import Comment from "@/components/comment"
import { BlogPostCard } from "@/components/home/blog-post-card"
import { ProfileCard } from "@/components/home/profile-card"
import { RecentPostsList } from "@/components/home/recent-posts-list"
import SentencesCarousel from "@/components/home/SentencesCarousel"
import { TagCloud } from "@/components/home/tag-cloud"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { Button } from "@/components/ui/button"
import Http from "@/services/request"
import { IBlog } from "@/types/blog"
import { getClientInfo } from "@/utils/get-client-info"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const getPostApi = async <T,>(slug: number) => {
  const headers = await getClientInfo()
  return (await Http.get<T[]>(`/article?page=${slug}&limit=8`, { headers })).data
}
export default async function HomePage() {
  const { data: blogs } = await getPostApi<IBlog>(1)
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
                {blogs.map((item) => (
                  <BlogPostCard
                    key={item.id}
                    blog={item}
                  />
                ))}
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
                <TagCloud />
              </div>

              <div className="mt-8 rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-medium">最新文章</h2>
                <RecentPostsList blogs={blogs} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  )
}

