"use client"

import { Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';

const SITE_START_TIME = new Date('2024-01-01T00:00:00'); // 替换为你的网站上线时间

function getDuration() {
  const now = new Date();
  const diff = now.getTime() - SITE_START_TIME.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}天${hours}小时${minutes}分${seconds}秒`;
}

export function SiteFooter() {
  const [duration, setDuration] = useState("");
  useEffect(() => {
    setDuration(getDuration()); // 首次挂载时立即设置
    const timer = setInterval(() => {
      setDuration(getDuration());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container flex flex-col items-center gap-4 py-6 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-2 md:px-0 w-full md:w-auto">
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
            {duration && <span className="block md:inline ml-0 md:ml-2 mt-2 md:mt-0">本站已运行：{duration}</span>}
          </p>
        </div>
        <div className="flex items-center gap-4 md:ml-auto">
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