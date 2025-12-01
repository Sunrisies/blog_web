"use client"

import { Github } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from 'react'

const SITE_START_TIME = new Date('2024-01-01T00:00:00') // 替换为你的网站上线时间

function getDuration() {
  const now = new Date()
  const diff = now.getTime() - SITE_START_TIME.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return `${days}天${hours}小时${minutes}分${seconds}秒`
}

export function SiteFooter() {
  const [duration, setDuration] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setDuration(getDuration())

    const timer = setInterval(() => {
      setDuration(getDuration())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isMounted) {
    return (
      <footer className="w-full border-t bg-background mt-auto">
        <div className="container py-6">
          <div className="animate-pulse flex justify-center">
            <div className="h-4 bg-muted rounded w-48"></div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="w-full border-t bg-gradient-to-b from-background to-muted/20 mt-auto">
      <div className="container flex flex-col items-center gap-6 py-8 pc:py-6">
        {/* 主要内容和社交链接 */ }
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
          {/* 品牌和描述 */ }
          <div className="flex flex-col items-center md:items-start gap-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">博</span>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                技术博客
              </span>
            </div>

            <p className="text-center md:text-left text-sm text-muted-foreground leading-relaxed">
              分享前沿技术、开发经验与编程心得
              <br />
              探索数字世界的无限可能
            </p>

            { duration && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span>已稳定运行 { duration }</span>
              </div>
            ) }
          </div>

          {/* 导航链接 */ }
          <div className="flex sm:flex-col sm:flex-row gap-6 sm:gap-10">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-center">探索</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/blog/1" className="hover:text-foreground transition-colors">
                  文章列表
                </Link>
                <Link href="/tags" className="hover:text-foreground transition-colors">
                  标签云
                </Link>
                <Link href="/archives" className="hover:text-foreground transition-colors">
                  文章归档
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-center">支持</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-foreground transition-colors">
                  关于本站
                </Link>
                <Link href="/api/rss" className="hover:text-foreground transition-colors">
                  RSS订阅
                </Link>
                <Link
                  href="https://github.com/yourusername/blog"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  源码仓库
                </Link>
              </div>
            </div>
          </div>

          {/* 社交链接 */ }
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/yourusername/blog"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="/api/rss"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-200"
              >
                <Rss className="h-4 w-4" />
                <span className="sr-only">RSS</span>
              </Link>
              <Link
                href="mailto:3266420686@qq.com"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </div>

            <div className="text-xs text-muted-foreground text-center md:text-right">
              <p>有想法？欢迎交流</p>
              <p>3266420686@qq.com</p>
            </div>
          </div>
        </div>

        {/* 分割线 */ }
        <div className="w-full border-t" />

        {/* 底部信息 */ }
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
            <span>© 2024 技术博客</span>
            <span className="hidden sm:inline">•</span>
            <span>用心创作每一篇内容</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              豫ICP备2025154392号-1
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// 需要添加的图标组件（如果你还没有的话）
function Rss(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      { ...props }
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  )
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      { ...props }
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}