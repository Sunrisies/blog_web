"use client"

import Link from "next/link"
import { Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link href="/" className="font-medium underline underline-offset-4">
              中文博客
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/yourusername/blog"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="https://github.com/yourusername/blog"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
      {/* 添加备案信息 */}
      <div className="container flex justify-center py-4 text-sm text-muted-foreground border-t">
        <Link
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          京ICP备XXXXXXXX号-1
        </Link>
      </div>
    </footer>
  )
}