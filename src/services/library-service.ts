import { faker } from '@faker-js/faker/locale/zh_CN'
import type { Category, Library, LibraryFilters, Tag } from "@/types/library"
// Sample data matching the required structure

// 预定义分类
const categories: Category[] = [
  { id: 1, name: "网站" },
  { id: 2, name: "语言学习" },
  { id: 3, name: "历史" },
  { id: 4, name: "文化" },
  { id: 5, name: "技术" }
]

// 预定义标签
const tags: Tag[] = [
  { id: 1, name: "frontend" },
  { id: 2, name: "backend" },
  { id: 3, name: "dictionary" },
  { id: 4, name: "learning" },
  { id: 5, name: "culture" },
  { id: 6, name: "history" },
  { id: 7, name: "arcgis" }
]

// 生成单个资源
function generateLibrary(id: number): Library {
  const categoryNames = ["网站", "语言学习", "历史", "文化", "技术", "开发工具", "开源", "代码托管", "协作"]
  const tagNames = ["frontend", "backend", "dictionary", "learning", "culture", "history", "arcgis", "开源", "代码托管", "协作"]
  const numTags = faker.number.int({ min: 1, max: 3 })
  const selectedTags = faker.helpers.arrayElements(tagNames, numTags)
  const url = faker.internet.url()
  const protocol = url.split("://")[0]

  return {
    id,
    uuid: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    url,
    protocol,
    icon_url: `${protocol}://${url.split("://")[1]}/favicon.ico`,
    category: faker.helpers.arrayElement(categoryNames),
    tags: selectedTags,
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString()
  }
}
export const sampleLibraries: Library[] = Array.from({ length: 20 }, (_, index) =>
  generateLibrary(index + 1)
)
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
      // 获取所有可能的分类名称
      const categoryNames = ["网站", "语言学习", "历史", "文化", "技术", "开发工具", "开源", "代码托管", "协作"]
      const categoryName = categoryNames[filters.categoryId - 1] || ""
      filteredLibraries = filteredLibraries.filter((lib) => lib.category === categoryName)
    }

    if (filters.tagId) {
      // 获取所有可能的标签名称
      const tagNames = ["frontend", "backend", "dictionary", "learning", "culture", "history", "arcgis", "开源", "代码托管", "协作"]
      const tagName = tagNames[filters.tagId - 1] || ""
      filteredLibraries = filteredLibraries.filter((lib) => lib.tags.includes(tagName))
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
  return [
    { id: 1, name: "网站" },
    { id: 2, name: "语言学习" },
    { id: 3, name: "历史" },
    { id: 4, name: "文化" },
    { id: 5, name: "技术" },
    { id: 6, name: "开发工具" },
    { id: 7, name: "开源" },
    { id: 8, name: "代码托管" },
    { id: 9, name: "协作" }
  ]
}

export async function getAllTags(): Promise<{ id: number; name: string }[]> {
  return [
    { id: 1, name: "frontend" },
    { id: 2, name: "backend" },
    { id: 3, name: "dictionary" },
    { id: 4, name: "learning" },
    { id: 5, name: "culture" },
    { id: 6, name: "history" },
    { id: 7, name: "arcgis" },
    { id: 8, name: "开源" },
    { id: 9, name: "代码托管" },
    { id: 10, name: "协作" }
  ]
}
