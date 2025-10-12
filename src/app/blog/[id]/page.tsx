import BlogDetail from "@/components/blog/blog-detail"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import Http from "@/services/request"
import { CategoriesType, IBlog, ICategories, ITag, TagType } from "@/types/blog"
import { getClientInfo } from "@/utils/get-client-info"

// 获取博客仓库数据
// const getWarehouseApi = async <T,>() =>
//     await Http.get<T>("/article/uploadTime");
//获取分类数据
const getCategoriesApi = async <T,>() => (await Http.get<T[]>("/v1/categories")).data
const getTagsApi = async <T,>() => (await Http.get<T[]>("/v1/tags?page=1&limit=100")).data

const getPostApi = async <T,>(slug: number) => {
    const headers = await getClientInfo()
    return (await Http.get<T[]>(`/v1/posts?page=${slug}&limit=8`, { headers })).data
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
