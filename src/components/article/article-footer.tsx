import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IArticle } from "@/types/article";

interface ArticleFooterProps {
  article: IArticle;
  prevArticle?: { id: number; title: string };
  nextArticle?: { id: number; title: string };
}

export default function ArticleFooter({
  article,
  prevArticle,
  nextArticle,
}: ArticleFooterProps) {
  return (
    <div className="mt-12 space-y-8">
      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.id}`}
              className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* Copyright information */}
      <div className="p-4 border rounded-lg bg-muted/30">
        <div className="text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {article.author}. 保留所有权利.
          </p>
          <p className="mt-1">原始文章发表于 {article.publish_time}</p>
        </div>
      </div>

      {/* Navigation between articles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-8 border-t pt-8">
        {prevArticle && (
          <Link
            href={`/article/${prevArticle.id}`}
            className="group flex items-center p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div>
              <div className="text-xs text-muted-foreground mb-1">Previous</div>
              <div className="font-medium line-clamp-1">
                {prevArticle.title}
              </div>
            </div>
          </Link>
        )}

        {nextArticle && (
          <Link
            href={`/article/${nextArticle.id}`}
            className="group flex items-center justify-end p-4 border rounded-lg hover:bg-secondary/50 transition-colors text-right"
          >
            <div>
              <div className="text-xs text-muted-foreground mb-1">Next</div>
              <div className="font-medium line-clamp-1">
                {nextArticle.title}
              </div>
            </div>
            <ChevronRight className="h-5 w-5 ml-2 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        )}
      </div>
    </div>
  );
}