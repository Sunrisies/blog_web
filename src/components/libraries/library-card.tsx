import Link from "next/link"
import { ExternalLink, Calendar } from "lucide-react"
import type { Library } from "@/types/library"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LibraryCardProps {
  library: Library
}

export function LibraryCard({ library }: LibraryCardProps) {
  // Format date in a simple way without external dependencies
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("zh-CN")
  }

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">
            <Link href={`/libraries/${library.id}`} className="hover:underline">
              {library.name}
            </Link>
          </h3>
          <Badge variant="outline">{library.category.name}</Badge>
        </div>

        <p className="text-muted-foreground mb-4">{library.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {library.tags.map((tag) => (
            <Link key={tag.id} href={`/libraries?tag=${tag.id}`}>
              <Badge variant="secondary" className="cursor-pointer">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formatDate(library.updated_at)}</span>
        </div>

        <Button variant="outline" size="sm" asChild>
          <a href={library.officialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
            访问官网
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
