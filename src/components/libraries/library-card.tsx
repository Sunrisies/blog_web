import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Library } from "@/types/library"
import { Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

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
    <Card className="h-full gap-0 flex flex-col py-4">
      <CardContent className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold line-clamp-2">
            <a href={ library.url } target="_blank" rel="noopener noreferrer" className="flex items-center">
              { library.name }
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </h3>
          <Badge variant="outline">{ library.category }</Badge>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{ library.description }</p>

        <div className="flex flex-wrap gap-2 mb-4">
          { library.tags.map((tag, index) => (
            <Link key={ index } href={ `/libraries?tag=${tag}` }>
              <Badge variant="secondary" className="cursor-pointer">
                { tag }
              </Badge>
            </Link>
          )) }
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t !pt-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{ formatDate(library.updated_at) }</span>
        </div>

        <Button variant="outline" size="sm" asChild>
          <a href={ library.url } target="_blank" rel="noopener noreferrer" className="flex items-center">
            访问官网
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
