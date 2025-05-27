import { IBlog } from "@/types/blog"
import Link from "next/link"

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
