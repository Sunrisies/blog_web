import { LibrariesList } from "@/components/libraries/libraries-list"
import { LibraryFilters } from "@/components/libraries/library-filters"

export const metadata = {
  title: "资源库 | 中文博客",
  description: "探索有用的中文学习和文化资源",
}

export default function LibrariesPage() {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <LibraryFilters />
        </div>
        <div className="w-full">
          <LibrariesList />
        </div>
      </div>
    </div>
  )
}
