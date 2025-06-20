import ArticleDetail from "@/components/article/article-detail"
import Http, { ResponseDto } from "@/services/request"
import type { IArticle } from "@/types/article"
import { getClientInfo } from "@/utils/get-client-info"
import type { Metadata } from "next"
interface IPrevNext {
  prevArticle?: { id: number; title: string }
  nextArticle?: { id: number; title: string }
}
interface Props {
  params: Promise<{ id: string }>
}
// 获取文章详情的接口
const articleApi = async <T,>(id: number) => {
  const headers = await getClientInfo()
  return await Http.get<T, ResponseDto<T>>(`/article/${id}`, { headers })
}

// 获取上一篇和下一篇文章的接口
const getPrevNextArticleApi = async <T,>(id: number) =>
  await Http.get<T, ResponseDto<T>>(`/article/prevNext/${id}`)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const { data: article } = await articleApi<IArticle>(+id)
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: article.cover }],
    },
  }

}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  const { data: article } = await articleApi<IArticle>(+id)

  const { data: { prevArticle, nextArticle } } = await getPrevNextArticleApi<IPrevNext>(+id)
  return (
    <ArticleDetail
      article={ article }
      prevArticle={ prevArticle }
      nextArticle={ nextArticle }
      id={ +id }
    />
  )
}