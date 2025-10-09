"use client"

import { cn } from "@/lib/utils"
import { IArticle } from "@/types/article"
import { Bookmark, Copy, Facebook, Heart, Twitter } from "lucide-react"
import { useCallback } from "react"

interface ArticleActionsProps {
    article: IArticle
    className?: string
}

export default function ArticleActions({ article, className }: ArticleActionsProps) {
    const copyLink = useCallback(() => {
        navigator.clipboard.writeText(window.location.href)
        // In a real app, you would show a toast notification here
    }, [])

    const shareOnSocial = useCallback(
        (platform: string) => {
            const url = encodeURIComponent(window.location.href)
            const title = encodeURIComponent(article.title)

            let shareUrl = ""
            if (platform === "facebook") {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
            } else if (platform === "twitter") {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
            }

            if (shareUrl) {
                window.open(shareUrl, "_blank", "width=600,height=400")
            }
        },
        [article.title],
    )

    return (
        <div className={cn("flex flex-col items-center space-y-6 sticky top-24", className)}>
            <LikeButton articleId={article.id} />

            <div className="space-y-4">
                <div className="text-center text-xs text-muted-foreground">Share</div>
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={() => shareOnSocial("facebook")}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        aria-label="Share on Facebook"
                    >
                        <Facebook className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => shareOnSocial("twitter")}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        aria-label="Share on Twitter"
                    >
                        <Twitter className="h-5 w-5" />
                    </button>

                    <button
                        onClick={copyLink}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        aria-label="Copy link"
                    >
                        <Copy className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Bookmark this article"
            >
                <Bookmark className="h-5 w-5" />
            </button>
        </div>
    )
}

function LikeButton() {
    const hasLiked = false
    return (
        <div className="space-y-2">
            <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Like this article"
            >
                <Heart className={cn("h-5 w-5", hasLiked && "fill-destructive text-destructive")} />
            </button>
            <div className="text-center text-xs text-muted-foreground">
                {/* This would be the actual like count from the backend */}
                42
            </div>
        </div>
    )
}