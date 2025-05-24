"use client";
import { IArticle } from "@/types/article";
import ArticleContent from "./article-content";
import ArticleActions from "./article-actions";
import ArticleFooter from "./article-footer";
import ArticleHeader from "./article-header";
import TableOfContents from "./table-of-contents";
import Http from "@/services/request";
import { useState } from "react";
import { ScrollToTopButton } from "../ScrollToTopButton";
const getTextCommentsApi = async <T,>(slug: number) =>
  await Http.get<T[]>(`/comments?articleId=${slug}`);

interface ArticleDetailProps {
  article: IArticle;
  prevArticle?: { id: number; title: string };
  nextArticle?: { id: number; title: string };
  id: number;
}

export default function ArticleDetail({
  article,
  prevArticle,
  nextArticle,
  id,
}: ArticleDetailProps) {
  return (
    <div className="container px-4 py-8 mx-auto">
      <ArticleHeader article={article} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mt-6">
        <div className="hidden lg:block lg:col-span-1">
          <ArticleActions article={article} />
        </div>

        <div className="lg:col-span-8">
          <ArticleContent content={article.content} />
          <ArticleFooter
            article={article}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
          />
         
        </div>

        <div className="hidden lg:block lg:col-span-3">
          <TableOfContents content={article.content} />
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}