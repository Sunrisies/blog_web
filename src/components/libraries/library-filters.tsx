"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getAllCategories, getAllTags } from "@/services/library-service"
import { Badge } from "@/components/ui/badge"
import type { Category, Tag } from "@/types/library"

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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">搜索资源</h2>
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="search"
            placeholder="搜索资源..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "tags"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>分类</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategoryId === category.id ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => handleFilterSelect("category", category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags">
          <AccordionTrigger>标签</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={selectedTagId === tag.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleFilterSelect("tag", tag.id)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {isFilterActive && (
        <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleClearFilters}>
          <X className="h-4 w-4 mr-2" />
          清除所有筛选
        </Button>
      )}
    </div>
  )
}
