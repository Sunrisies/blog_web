import Link from "next/link"
import { ArrowRight } from "lucide-react"

// import { SiteHeader } from "@/components/site-header"
// import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { BlogPostCard } from "@/components/home/blog-post-card"
import { TagCloud } from "@/components/home/tag-cloud"
import { RecentPostsList } from "@/components/home/recent-posts-list"
import { ProfileCard } from "@/components/home/profile-card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] dark:bg-zinc-900">
      {/* <SiteHeader /> */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">中文博客</h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Exploring Chinese culture, language, and traditions through engaging content
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/blog">Browse Articles</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-8">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <ProfileCard />

              <div className="mt-8 rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-medium">Tags</h2>
                <TagCloud />
              </div>

              <div className="mt-8 rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-medium">Recent Posts</h2>
                <RecentPostsList />
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="mb-6 text-2xl font-bold">Featured Articles</h2>
              <div className="grid gap-6">
                <BlogPostCard
                  title="Understanding Chinese Culture"
                  excerpt="Explore the rich traditions and modern celebrations of Chinese culture."
                  date="2024-02-10"
                  tags={["Culture", "Traditions"]}
                  slug="understanding-chinese-culture"
                />
                <BlogPostCard
                  title="Essential Chinese Phrases"
                  excerpt="Learn useful Chinese phrases for travelers and beginners."
                  date="2024-02-05"
                  tags={["Language", "Travel"]}
                  slug="essential-chinese-phrases"
                />
                <BlogPostCard
                  title="The Evolution of Chinese Cinema"
                  excerpt="Discover how Chinese cinema has evolved over the decades."
                  date="2024-01-28"
                  tags={["Arts", "Cinema"]}
                  slug="evolution-chinese-cinema"
                />
                <BlogPostCard
                  title="Traditional Chinese Medicine"
                  excerpt="Explore ancient wisdom for modern health practices."
                  date="2024-01-22"
                  tags={["Health", "Traditions"]}
                  slug="traditional-chinese-medicine"
                />
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" asChild className="group">
                  <Link href="/blog">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}
