import BlogDetail from "@/components/blog/blog-detail"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import Http, { PaginatedResponseDto } from "@/services/request"
import { CategoriesType, IBlog, ICategories, ITag, TagType } from "@/types/blog"
import { Metadata } from "next"

//获取分类数据
const getCategoriesApi = async <T,>() => (await (await Http.get("v1/categories")).json<PaginatedResponseDto<T[]>>()).data
const getTagsApi = async <T,>() => (await (await Http.get("v1/tags?page=1&limit=100")).json<PaginatedResponseDto<T[]>>()).data
export const metadata: Metadata = {
    title: "博客文章 | 朝阳的码农札记 - 全栈技术文章合集",
    description: "探索朝阳的码农札记中的所有技术博客文章。这里汇集了全栈开发、Web技术、云原生、DevOps等领域的深度技术文章、教程和实践经验分享。",
    keywords: ["技术博客", "编程教程", "全栈开发", "React教程", "Node.js教程", "云原生", "DevOps实践", "代码示例"],
    authors: [{ name: "朝阳", url: "https://github.com/Sunrisies" }],
    creator: "朝阳",
    publisher: "朝阳的码农札记",
    openGraph: {
        type: "website",
        locale: "zh_CN",
        url: "https://sunrise1024.top/blog", // 根据实际路由调整
        title: "博客文章 | 朝阳的码农札记 - 全栈技术文章合集",
        description: "探索朝阳的码农札记中的所有技术博客文章。这里汇集了全栈开发、Web技术、云原生等领域的深度技术文章和教程。",
        siteName: "朝阳的码农札记",
        images: [{
            url: "https://sunrise1024.top/og-blog.png", // 可考虑使用专门的博客列表OG图片
            width: 1200,
            height: 630,
            alt: "朝阳的码农札记 - 博客文章列表"
        }]
    },
    twitter: {
        card: "summary_large_image",
        title: "博客文章 | 朝阳的码农札记 - 全栈技术文章合集",
        description: "探索朝阳的码农札记中的所有技术博客文章，涵盖全栈开发、Web技术、云原生等领域的深度内容。",
        images: ["https://sunrise1024.top/og-blog.png"]
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: "https://sunrise1024.top/blog" // 根据实际路由调整
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png"
    }
}
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
