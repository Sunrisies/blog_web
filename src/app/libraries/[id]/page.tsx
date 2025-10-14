import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { sampleLibraries } from '@/services/library-service'
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function LibraryPage() {
  const library = sampleLibraries[0]
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/libraries" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回资源库
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{ library.name }</h1>
          <p className="text-muted-foreground">{ library.description }</p>
        </div>

        <Button asChild>
          <a href={ library.officialUrl } target="_blank" rel="noopener noreferrer" className="flex items-center">
            访问官网
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">关于 { library.name }</h2>
            <p className="text-muted-foreground">{ library.description }</p>

            {/* In a real application, we would display more detailed content here */ }
            <p className="mt-4">这里将显示更多关于该资源的详细信息，包括使用指南、特点和优势等。</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">资源信息</h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">分类</h4>
                <Link href={ `/libraries?category=${library.category.id}` }>
                  <Badge variant="outline" className="cursor-pointer">
                    { library.category.name }
                  </Badge>
                </Link>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">标签</h4>
                <div className="flex flex-wrap gap-2">
                  { library.tags.map((tag) => (
                    <Link key={ tag.id } href={ `/libraries?tag=${tag.id}` }>
                      <Badge variant="secondary" className="cursor-pointer">
                        { tag.name }
                      </Badge>
                    </Link>
                  )) }
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">添加日期</h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{ formatDate(library.created_at) }</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">最后更新</h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{ formatDate(library.updated_at) }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
