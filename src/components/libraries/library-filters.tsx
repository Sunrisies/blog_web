"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllCategories, getAllTags } from "@/services/library-service"
import type { Category, Tag } from "@/types/library"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export function LibraryFilters() {
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize search query from URL - use useEffect with proper dependency
  useEffect(() => {
    const query = searchParams.get("q") || ""
    setSearchQuery(query)
  }, [searchParams])

  // Fetch categories and tags - only run once on mount
  useEffect(() => {
    let isMounted = true

    async function fetchFilters() {
      setLoading(true)
      try {
        const [categoriesData, tagsData] = await Promise.all([getAllCategories(), getAllTags()])

        if (isMounted) {
          setCategories(categoriesData)
          setTags(tagsData)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching filters:", error)
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchFilters()

    return () => {
      isMounted = false
    }
  }, [])

  // Create a stable function for navigation
  const navigateWithParams = useCallback(
    (params: URLSearchParams) => {
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router],
  )

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("q", searchQuery)
    } else {
      params.delete("q")
    }

    navigateWithParams(params)
  }

  // Handle filter selection
  const handleFilterSelect = (type: "category" | "tag", id: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (type === "category") {
      const currentCategory = params.get("category")

      if (currentCategory === id.toString()) {
        params.delete("category")
      } else {
        params.set("category", id.toString())
      }
    } else if (type === "tag") {
      const currentTag = params.get("tag")

      if (currentTag === id.toString()) {
        params.delete("tag")
      } else {
        params.set("tag", id.toString())
      }
    }

    navigateWithParams(params)
  }

  // Handle clearing all filters
  const handleClearFilters = () => {
    router.push(pathname)
    setSearchQuery("")
  }

  // Check if any filter is active
  const isFilterActive = searchParams.toString() !== ""

  // Get currently selected filter IDs
  const selectedCategoryId = searchParams.get("category") ? Number.parseInt(searchParams.get("category")!) : null
  const selectedTagId = searchParams.get("tag") ? Number.parseInt(searchParams.get("tag")!) : null

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearch} className="relative w-full sm:flex-1">
          <Input
            type="search"
            placeholder="搜索资源..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-background/50 focus:bg-background"
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full hover:bg-transparent">
            <Search className="h-4 w-4 text-muted-foreground" />
          </Button>
        </form>

        <div className="flex gap-4">
          <select
            className="h-10 w-full sm:w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={selectedCategoryId || ""}
            onChange={(e) => handleFilterSelect("category", Number(e.target.value))}
          >
            <option value="">所有分类</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            className="h-10 w-full sm:w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={selectedTagId || ""}
            onChange={(e) => handleFilterSelect("tag", Number(e.target.value))}
          >
            <option value="">所有标签</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

          {isFilterActive && (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive"
              onClick={handleClearFilters}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
