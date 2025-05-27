import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const tags = [
  { name: "Culture", count: 12 },
  { name: "Language", count: 8 },
  { name: "Food", count: 7 },
  { name: "Travel", count: 6 },
  { name: "History", count: 5 },
  { name: "Arts", count: 5 },
  { name: "Traditions", count: 4 },
  { name: "Cinema", count: 3 },
  { name: "Health", count: 3 },
  { name: "Literature", count: 2 },
]

export function TagCloud() {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link key={tag.name} href={`/tag/${tag.name.toLowerCase()}`}>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            {tag.name} <span className="ml-1 text-xs text-muted-foreground">({tag.count})</span>
          </Badge>
        </Link>
      ))}
    </div>
  )
}
