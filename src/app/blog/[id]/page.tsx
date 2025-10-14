import BlogDetail from "@/components/blog/blog-detail"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import Http, { PaginatedResponseDto } from "@/services/request"
import { CategoriesType, IBlog, ICategories, ITag, TagType } from "@/types/blog"

//获取分类数据
const getCategoriesApi = async <T,>() => (await (await Http.get("v1/categories")).json<PaginatedResponseDto<T[]>>()).data
const getTagsApi = async <T,>() => (await (await Http.get("v1/tags?page=1&limit=100")).json<PaginatedResponseDto<T[]>>()).data

const getPostApi = async <T,>(slug: number) => {
    return (await (await Http.get<T[]>(`v1/posts?page=${slug}&limit=8`)).json<PaginatedResponseDto<T[]>>()).data
}


interface ArticleListProps {
    params: Promise<{ id: string }>
}
const Blog = async ({ params }: ArticleListProps) => {
    const { id } = await params
    const { data: blog, pagination } = await getPostApi<IBlog>(+id)
    const { data: list } = await getCategoriesApi<ICategories>()
    console.log(list, 'categories')
    const categories = list.map(item => ({
        value: item.id + "",
        label: item.name
    })) as CategoriesType[]
    const tags = await (await getTagsApi<ITag>()).data?.map(item => ({
        value: item.id + "",
        label: item.name
    })) as TagType[]
    return (
        <>
            <BlogDetail
                blog={ blog }
                pagination={ pagination! }
                categories={ categories }
                tags={ tags }
                id={ +id }
            />
            <ScrollToTopButton />
        </>
    )
}

export default Blog
