import ArticleDetail from "@/components/article/article-detail"
import Http, { ResponseDto } from "@/services/request"
import type { IArticle } from "@/types/article"
import type { Metadata } from "next"
interface IPrevNext {
  prevArticle?: { uuid: string; title: string }
  nextArticle?: { uuid: string; title: string }
}
interface Props {
  params: Promise<{ uuid: string }>
}
// 获取文章详情的接口
const articleApi = async <T,>(uuid: string) => {
  return await Http.get(`v1/posts/${uuid}`).json<ResponseDto<T>>()
}

// 获取上一篇和下一篇文章的接口
const getPrevNextArticleApi = async <T,>(uuid: string) =>
  (await Http.get(`v1/posts/prevNext/${uuid}`).json<ResponseDto<T>>())

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
  const { data: article } = await articleApi<IArticle>(uuid)
  const { data: { prevArticle, nextArticle } } = await getPrevNextArticleApi<IPrevNext>(uuid)
  return (
    <ArticleDetail
      article={ article }
      prevArticle={ prevArticle }
      nextArticle={ nextArticle }
    />
  )
}