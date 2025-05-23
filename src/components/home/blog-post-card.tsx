import Link from "next/link"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { IBlog } from "@/types/blog"
import { formatChineseDateTime } from 'sunrise-utils'



export function BlogPostCard({ blog: { title, description, publish_time, tags, uuid } }: { blog: IBlog }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md p-0">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <time dateTime={formatChineseDateTime(publish_time)}>{formatChineseDateTime(publish_time)}</time>
        </div>

        <h3 className="mt-2 text-xl font-semibold">
          <Link href={`/article/${uuid}`} className="hover:text-primary">
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
