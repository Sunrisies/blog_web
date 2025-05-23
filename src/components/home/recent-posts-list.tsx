import { IBlog } from "@/types/blog"
import Link from "next/link"

const recentPosts = [
  {
    title: "Understanding Chinese Culture",
    slug: "understanding-chinese-culture",
    date: "Feb 10, 2024",
  },
  {
    title: "Essential Chinese Phrases",
    slug: "essential-chinese-phrases",
    date: "Feb 5, 2024",
  },
  {
    title: "The Evolution of Chinese Cinema",
    slug: "evolution-chinese-cinema",
    date: "Jan 28, 2024",
  },
  {
    title: "Traditional Chinese Medicine",
    slug: "traditional-chinese-medicine",
    date: "Jan 22, 2024",
  },
  {
    title: "Chinese Calligraphy",
    slug: "chinese-calligraphy",
    date: "Jan 15, 2024",
  },
]

export function RecentPostsList({ blogs }: { blogs: IBlog[] }) {
  return (
    <ul className="space-y-3">
      {blogs.map((post) => (
        <li key={post.id} className="text-sm">
          <Link href={`/article/${post.id}`} className="block hover:text-primary">
            <span className="line-clamp-1">{post.title}</span>
            <span className="text-xs text-muted-foreground">{post.publish_time}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
