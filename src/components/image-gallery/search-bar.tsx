"use client"

import { Search, X } from "lucide-react"

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="根据标题搜索图片..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
    </div>
  )
}
