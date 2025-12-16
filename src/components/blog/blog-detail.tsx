"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CategoriesType, IBlog, TagType } from "@/types/blog"
import { checkDeviceType } from "@/utils"
import { ChevronRight, Clock, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { formatChineseDateTime } from "sunrise-utils"
interface PageProps {
  blog: IBlog[]
  categories: CategoriesType[]
  pagination: { total: number, limit: number }
  id: number
  tags: TagType[]
}

// const getPostApi = async <T,>(id: number) =>
//   await Http.get<T[]>(`/article?page=${id}&limit=8`)
const BlogDetail = ({ blog, categories, pagination, id, tags }: PageProps) => {
  const [newArticles, setNewArticles] = useState<IBlog[]>(blog)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  const [deviceType, setDeviceType] = useState<string>("")
  useEffect(() => {
    // 初始检查
    const device = checkDeviceType()
    setDeviceType(() => device)
  }, [])
  const loadArticles = (page: number) => {
    // 获取数据的逻辑
    // getPostApi<IBlog>(page).then(() => {
    //   setNewArticles((prevArticles) => [...prevArticles])
    // })
  }
  const { ref } = useInView({
    threshold: 0,
  })

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    // 实现分类筛选逻辑
  }

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag)
    // 实现标签筛选逻辑
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">文章列表</h1>
        {/* 搜索、分类和标签 - 在移动设备上隐藏 */ }
        <div className="hidden md:flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Select
              value={ selectedCategory }
              onValueChange={ handleCategorySelect }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="所有分类" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-auto">
                <SelectItem
                  value="all"
                  className="hover:bg-accent/50 transition-colors"
                >
                  所有分类
                </SelectItem>
                { categories.map((category) => (
                  <SelectItem
                    key={ category.value }
                    value={ category.value }
                    className="hover:bg-accent/50 transition-colors"
                  >
                    { category.label }
                  </SelectItem>
                )) }
              </SelectContent>
            </Select>

            <Select value={ selectedTag } onValueChange={ handleTagSelect }>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="所有标签" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-auto">
                <SelectItem
                  value="all"
                  className="hover:bg-accent/50 transition-colors"
                >
                  所有标签
                </SelectItem>
                { tags.map((tag) => (
                  <SelectItem
                    key={ tag.value }
                    value={ tag.value }
                    className="hover:bg-accent/50 transition-colors"
                  >
                    { tag.label }
                  </SelectItem>
                )) }
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* 新增 H2 标题，提升内容层级结构 */ }
      <h2 className="text-2xl font-semibold mb-2">最新文章</h2>
      {/* 文章列表 */ }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        { newArticles.map((article) => (
          <Link href={ `/article/${article.uuid}` } key={ article.id } passHref>
            <Card
              className="flex flex-col py-0 gap-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <CardHeader className="p-0">
                <div className="relative h-32 w-full">
                  <Image
                    src={
                      article.cover ||
                      "https://kzmolcurk08fsa3stld2.lite.vusercontent.net/placeholder.svg"
                    }
                    alt={ article.title }
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  { article.is_top && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                      置顶
                    </Badge>
                  ) }
                </div>
              </CardHeader>
              <CardContent className="grow p-4">
                {/* 新增 H3 标题，突出文章标题 */ }

                <h3 className="text-lg  font-bold mb-2 line-clamp-1" title={ article.title }>{ article.title }</h3>
                <p
                  className="text-sm text-muted-foreground mb-4 line-clamp-2 cursor-pointer"
                  title={ article.description }
                >
                  { article.description }
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  { article.tags.map((tag) => (
                    <Badge key={ tag.id } variant="secondary" className="text-xs">
                      { tag.name }
                    </Badge>
                  )) }
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0 pr-0">
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <div className="flex items-center shrink-0 overflow-hidden">
                    <Eye className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{ article.views }</span>
                  </div>
                  <div className="flex items-center shrink-0 overflow-hidden">
                    <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">
                      { formatChineseDateTime(article.publish_time).split(" ")[0] }
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary cursor-pointer m-0 pr-2"
                >
                  阅读更多
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>

        )) }
      </div>
      {/* 加载更多触发器 */ }
      { deviceType === "mobile" && newArticles.length < pagination.total && (
        <div ref={ ref } className="flex justify-center mt-8 ">
          <Button onClick={ () => loadArticles(id + 1) } variant="outline">
            加载更多
          </Button>
        </div>
      ) }
      {/* 加载指示器 */ }
      {/* {(
        <div className="flex justify-center mt-8 md:hidden">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )} */}
      {/* 分页 - 在移动设备上隐藏 */ }
      { deviceType === "desktop" && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="1"
                  className={ id === 1 ? "opacity-50 cursor-not-allowed" : "" }
                />
              </PaginationItem>
              { Array.from(
                { length: Math.ceil(pagination.total / pagination.limit) },
                (_, index) => index + 1
              )
                .map((newPage) => {
                  return (
                    <PaginationItem key={ newPage }>
                      <PaginationLink
                        href={ newPage.toString() }
                        className={
                          newPage === id ? "bg-blue-600 text-white" : ""
                        } // 为当前页添加特殊样式
                      >
                        { newPage }
                      </PaginationLink>
                    </PaginationItem>
                  )
                }) }
              <PaginationItem>
                <PaginationNext
                  href={ (id + 1).toString() }
                  className={
                    id === Math.ceil(pagination.total / pagination.limit)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) }
    </div>
  )
}

export default BlogDetail
