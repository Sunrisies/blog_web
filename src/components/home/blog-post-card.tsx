import Link from "next/link"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPostCardProps {
  title: string
  excerpt: string
  date: string
  tags: string[]
  slug: string
}

export function BlogPostCard({ title, excerpt, date, tags, slug }: BlogPostCardProps) {
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <time dateTime={date}>{formattedDate}</time>
        </div>

        <h3 className="mt-2 text-xl font-semibold">
          <Link href={`/blog/${slug}`} className="hover:text-primary">
            {title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
