export interface Tag {
    id: number
    name: string
  }
  
  export interface Category {
    id: number
    name: string
  }
  
  export interface Library {
    id: number
    name: string
    officialUrl: string
    description: string
    metadata: Record<string, any>
    created_at: string
    updated_at: string
    category: Category
    tags: Tag[]
  }
  
  export interface LibraryFilters {
    categoryId?: number
    tagId?: number
    searchQuery?: string
  }
  