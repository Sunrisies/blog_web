import { LibrariesList } from "@/components/libraries/libraries-list"
import { LibraryFilters } from "@/components/libraries/library-filters"

export const metadata = {
  title: "资源库 | 中文博客",
  description: "探索有用的中文学习和文化资源",
}

export default function LibrariesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">资源库</h1>
      <p className="text-muted-foreground mb-8">探索有用的中文学习和文化资源</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <LibraryFilters />
        </div>
        <div className="lg:col-span-3">
          <LibrariesList />
        </div>
      </div>
    </div>
  )
}
