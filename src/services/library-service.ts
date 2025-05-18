import type { Library, LibraryFilters } from "@/types/library"

// Sample data matching the required structure
export const sampleLibraries: Library[] = [
  {
    id: 1,
    name: "Vue.js",
    officialUrl: "https://vuejs.org",
    description: "渐进式JavaScript框架",
    metadata: {},
    created_at: "2025-05-18T13:21:15.000Z",
    updated_at: "2025-05-18T13:21:15.000Z",
    category: {
      id: 14,
      name: "网站",
    },
    tags: [
      {
        id: 34,
        name: "arcgis",
      },
    ],
  },
  {
    id: 2,
    name: "React",
    officialUrl: "https://reactjs.org",
    description: "用于构建用户界面的 JavaScript 库",
    metadata: {},
    created_at: "2025-05-17T10:15:22.000Z",
    updated_at: "2025-05-17T10:15:22.000Z",
    category: {
      id: 14,
      name: "网站",
    },
    tags: [
      {
        id: 35,
        name: "frontend",
      },
    ],
  },
  {
    id: 3,
    name: "汉语词典",
    officialUrl: "https://dict.example.com",
    description: "全面的中文词典和学习资源",
    metadata: {},
    created_at: "2025-05-16T08:30:45.000Z",
    updated_at: "2025-05-16T08:30:45.000Z",
    category: {
      id: 15,
      name: "语言学习",
    },
    tags: [
      {
        id: 36,
        name: "dictionary",
      },
      {
        id: 37,
        name: "learning",
      },
    ],
  },
  {
    id: 4,
    name: "中国历史博物馆",
    officialUrl: "https://history.example.org",
    description: "探索中国丰富的历史和文化遗产",
    metadata: {},
    created_at: "2025-05-15T14:22:30.000Z",
    updated_at: "2025-05-15T14:22:30.000Z",
    category: {
      id: 16,
      name: "历史",
    },
    tags: [
      {
        id: 38,
        name: "culture",
      },
      {
        id: 39,
        name: "history",
      },
    ],
  },
]

// Cached data for categories and tags to prevent unnecessary recalculations
const cachedCategories = Array.from(new Map(sampleLibraries.map((lib) => [lib.category.id, lib.category])).values())

const cachedTags = (() => {
  const tagsMap = new Map()
  sampleLibraries.forEach((lib) => {
    lib.tags.forEach((tag) => {
      tagsMap.set(tag.id, tag)
    })
  })
  return Array.from(tagsMap.values())
})()

export async function getLibraries(filters?: LibraryFilters): Promise<Library[]> {
  let filteredLibraries = [...sampleLibraries]

  if (filters) {
    if (filters.categoryId) {
      filteredLibraries = filteredLibraries.filter((lib) => lib.category.id === filters.categoryId)
    }

    if (filters.tagId) {
      filteredLibraries = filteredLibraries.filter((lib) => lib.tags.some((tag) => tag.id === filters.tagId))
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filteredLibraries = filteredLibraries.filter(
        (lib) => lib.name.toLowerCase().includes(query) || lib.description.toLowerCase().includes(query),
      )
    }
  }

  return filteredLibraries
}

export async function getLibraryById(id: number): Promise<Library | undefined> {
  return sampleLibraries.find((lib) => lib.id === id)
}

export async function getAllCategories(): Promise<{ id: number; name: string }[]> {
  return cachedCategories
}

export async function getAllTags(): Promise<{ id: number; name: string }[]> {
  return cachedTags
}
