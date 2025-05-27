import { IArticle } from "@/types/article";
import { Calendar, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticleHeaderProps {
  article: IArticle;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  // Calculate estimated reading time (roughly 200 words per minute)
  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="space-y-4 md:pl-30">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {article.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{article.publish_time}</span>
        </div>

        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{article.views} views</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{readingTime} min read</span>
        </div>

        <Link
          href={`/category/${article.category.id}`}
          className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          {article.category.name}
        </Link>
      </div>

      {article.cover && (
        <div className="relative aspect-video overflow-hidden rounded-lg border">
          <Image
            src={
              article.cover ||
              "https://kzmolcurk08fsa3stld2.lite.vusercontent.net/placeholder.svg"
            }
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}