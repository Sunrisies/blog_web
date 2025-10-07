import { SiteFooter } from "@/components/footer";
import { FPSCounter } from "@/components/fps-counter";
import { SiteHeader } from "@/components/header";
import type { Metadata } from "next";
import "./globals.css";
import VersionIndicator from "@/components/versionIndicator";
export const metadata: Metadata = {
  title: "朝阳的码农札记 | 全栈开发者的技术分享与经验总结",
  description: "这是一个专注于全栈开发、Web技术、云原生和DevOps的技术博客。在这里，我分享实用的编程技巧、项目经验和技术见解，帮助开发者解决实际问题，提升编程技能。欢迎加入我的学习社区！",
  keywords: ["全栈开发", "Web开发", "React", "Node.js", "云原生", "DevOps", "技术博客", "编程学习", "最佳实践"],
  authors: [{ name: "朝阳", url: "https://github.com/Sunrisies" }],
  creator: "朝阳",
  publisher: "朝阳的码农札记",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://sunrise1024.top",
    title: "朝阳的码农札记 | 全栈开发者的技术分享与经验总结",
    description: "这是一个专注于全栈开发、Web技术、云原生和DevOps的技术博客。在这里，我分享实用的编程技巧、项目经验和技术见解，帮助开发者解决实际问题，提升编程技能。",
    siteName: "朝阳的码农札记",
    images: [{
      url: "https://sunrise1024.top/og-image.png",
      width: 1200,
      height: 630,
      alt: "朝阳的码农札记"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "朝阳的码农札记 | 全栈开发者的技术分享与经验总结",
    description: "这是一个专注于全栈开发、Web技术、云原生和DevOps的技术博客。在这里，我分享实用的编程技巧、项目经验和技术见解。",
    images: ["https://sunrise1024.top/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://sunrise1024.top"
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(process.env.NEXT_PUBLIC_API_URL, '===')
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <FPSCounter />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <VersionIndicator />}
      </body>
    </html>
  );
}
