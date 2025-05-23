import { LibrariesList } from "@/components/libraries/libraries-list"
import { LibraryFilters } from "@/components/libraries/library-filters"

export const metadata = {
  title: "资源库 | 中文博客",
  description: "探索有用的中文学习和文化资源",
}

export default function LibrariesPage() {
  return (
    <div className="flex flex-col">
      <div className="md:static fixed top-14 inset-x-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b md:border-none md:bg-transparent md:backdrop-blur-none">
        <div className="container mx-auto px-4 py-2 md:py-4">
          <LibraryFilters />
        </div>
      </div>
      <div className="container mx-auto px-4 pt-40 md:pt-2 pb-4">
        <LibrariesList />
      </div>
    </div>
  )
}
