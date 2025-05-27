import { LibrariesList } from "@/components/libraries/libraries-list";
import { LibraryFilters } from "@/components/libraries/library-filters";
import { Suspense } from "react";

export const metadata = {
  title: "中文学习资源库 | 朝阳的码农札记 - 精选优质学习资源",
  description: "探索丰富的中文学习和文化资源，包括教材、视频、播客、应用等。我们精心筛选并分类整理了最实用的学习材料，帮助你更高效地掌握中文，深入了解中国文化。",
  keywords: ["中文学习", "汉语资源", "中国文化", "学习材料", "教育资源", "在线学习", "中文教程"],
  openGraph: {
    title: "中文学习资源库 | 朝阳的码农札记 - 精选优质学习资源",
    description: "探索丰富的中文学习和文化资源，包括教材、视频、播客、应用等。我们精心筛选并分类整理了最实用的学习材料，帮助你更高效地掌握中文。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "https://sunrise1024.top/og-library.png",
      width: 1200,
      height: 630,
      alt: "中文学习资源库"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "中文学习资源库 | 精选优质学习资源",
    description: "探索丰富的中文学习和文化资源，包括教材、视频、播客、应用等。精心筛选的实用学习材料，助你高效掌握中文。",
    images: ["https://sunrise1024.top/og-library.png"]
  }
};
function SearchBarFallback() {
  return <>placeholder</>
}
export default function LibrariesPage() {
  return (
    <div className="flex flex-col">
      <div className="md:static fixed top-14 inset-x-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b md:border-none md:bg-transparent md:backdrop-blur-none">
        <div className="container mx-auto px-4 py-2 md:py-4">
          <Suspense fallback={<SearchBarFallback />}>
            <LibraryFilters />
          </Suspense>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-40 md:pt-2 pb-4">
        <Suspense fallback={<SearchBarFallback />}>
          <LibrariesList />
        </Suspense>
      </div>
    </div>
  )
}
