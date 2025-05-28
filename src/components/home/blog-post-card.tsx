import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { IBlog } from "@/types/blog"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { formatChineseDateTime } from 'sunrise-utils'



export function BlogPostCard({ blog: { title, description, publish_time, tags, uuid } }: { blog: IBlog }) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 p-0">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <time dateTime={formatChineseDateTime(publish_time)}>{formatChineseDateTime(publish_time)}</time>
        </div>

        <h3 className="mt-2 text-xl font-semibold">
          <Link 
            href={`/article/${uuid}`} 
            className="relative hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform group-hover:after:scale-x-100"
          >
            {title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="font-normal">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
