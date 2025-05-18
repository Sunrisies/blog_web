"use client"

import { useState, useEffect, useCallback } from "react"
import type { Library, LibraryFilters } from "@/types/library"
import { getLibraries } from "@/services/library-service"
import { LibraryCard } from "./library-card"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

export function LibrariesList() {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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
    let isMounted = true

    async function fetchLibraries() {
      if (!isMounted) return

      setLoading(true)
      setError(null)

      try {
        const filters = getFilters()
        const data = await getLibraries(filters)

        if (isMounted) {
          setLibraries(data)
        }
      } catch (error) {
        console.error("Error fetching libraries:", error)
        if (isMounted) {
          setError("加载资源时出错，请稍后再试。")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchLibraries()

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false
    }
  }, [getFilters])

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
        <p className="text-muted-foreground">{error}</p>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {libraries.map((library) => (
        <LibraryCard key={library.id} library={library} />
      ))}
    </div>
  )
}
