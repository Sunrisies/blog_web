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
    uuid: string
    name: string
    description: string
    url: string
    protocol: string
    icon_url: string
    category: string
    tags: string[]
    created_at: string
    updated_at: string
  }
  
  export interface LibraryFilters {
    categoryId?: number
    tagId?: number
    searchQuery?: string
  }
  