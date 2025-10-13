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
  params: Promise<{ uuid: string }>
}
// 获取文章详情的接口
const articleApi = async <T,>(uuid: string) => {
  const headers = await getClientInfo()
  return await Http.get<T, ResponseDto<T>>(`/v1/posts/${uuid}`, { headers })
}

// 获取上一篇和下一篇文章的接口
const getPrevNextArticleApi = async <T,>(uuid: string) =>
  await Http.get<T, ResponseDto<T>>(`/article/prevNext/${uuid}`)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params
  const { data: article } = await articleApi<IArticle>(uuid)
  console.log(article, 'article')
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
  const { uuid } = await params
  console.log(uuid)
  const { data: article } = await articleApi<IArticle>(uuid)
  console.log(article, 'article')
  // const { data: { prevArticle, nextArticle } } = await getPrevNextArticleApi<IPrevNext>(uuid)
  return (
    <ArticleDetail
      article={ article }
    // prevArticle={ prevArticle }
    // nextArticle={ nextArticle }
    />
  )
}