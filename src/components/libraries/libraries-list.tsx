"use client"

import type { Library, LibraryFilters } from "@/types/library"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { LibraryCard } from "./library-card"
import { PaginatedResponseDto } from "@/services/request"

export function LibrariesList({ data }: { data: PaginatedResponseDto<Library[]> }) {
  const [libraries, setLibraries] = useState<Library[]>(data.data)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const searchParams = useSearchParams()

  // Use a stable reference to searchParams with useCallback
  const getFilters = useCallback(() => {
    const filters: LibraryFilters = {}

    const categoryId = searchParams.get("category")
    const tagId = searchParams.get("tag")
    const query = searchParams.get("q")

    if (categoryId) filters.categoryId = Number.parseInt(categoryId)
    if (tagId) filters.tagId = Number.parseInt(tagId)
    if (query) filters.searchQuery = query

    return filters
  }, [searchParams])

  // Fetch libraries only when searchParams changes
  useEffect(() => {
    // let isMounted = true
    // 后续的搜索

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      // isMounted = false
    }
  }, [getFilters])

  // 计算分页数据
  const totalPages = Math.ceil(libraries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLibraries = libraries.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium mb-2 text-destructive">出错了</h3>
        <p className="text-muted-foreground">{ error }</p>
      </div>
    )
  }

  if (libraries.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium mb-2">没有找到资源</h3>
        <p className="text-muted-foreground">尝试调整您的筛选条件或搜索查询</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        { currentLibraries.map((library) => (
          <LibraryCard key={ library.id } library={ library } />
        )) }
      </div>

      { totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            onClick={ () => setCurrentPage(p => Math.max(1, p - 1)) }
            disabled={ currentPage === 1 }
          >
            上一页
          </Button>
          <span className="text-sm text-muted-foreground">
            第 { currentPage } 页，共 { totalPages } 页
          </span>
          <Button
            variant="outline"
            onClick={ () => setCurrentPage(p => Math.min(totalPages, p + 1)) }
            disabled={ currentPage === totalPages }
          >
            下一页
          </Button>
        </div>
      ) }
    </div>
  )
}
