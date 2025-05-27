import { ChaoyanProfile } from "@/components/about/chaoyang-profile"
import { CodeFarmerNotes } from "@/components/about/code-farmer-notes"
import { ContactSection } from "@/components/about/contact-section"
import { SkillsSection } from "@/components/about/skills-section"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "关于朝阳 | 码农札记与个人简介",
    description: "深入了解朝阳的成长经历、技术专长与个人故事，探索一位热爱编程与分享的前端开发者的札记与成长之路。",
    keywords: [
        "关于朝阳",
        "个人简介",
        "前端开发者",
        "技术博客",
        "成长故事",
        "编程札记",
        "码农札记"
    ],
    openGraph: {
        title: "关于朝阳 | 码农札记与个人简介",
        description: "深入了解朝阳的成长经历、技术专长与个人故事，探索一位热爱编程与分享的前端开发者的札记与成长之路。",
        url: "https://your-domain.com/about",
        type: "profile",
        locale: "zh_CN",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "关于朝阳 | 码农札记与个人简介"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "关于朝阳 | 码农札记与个人简介",
        description: "深入了解朝阳的成长经历、技术专长与个人故事，探索一位热爱编程与分享的前端开发者的札记与成长之路。",
        images: [
            "/og-image.png"
        ]
    },
    robots: {
        index: true,
        follow: true
    }
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
            <div className="container mx-auto px-4 py-8">
                <ChaoyanProfile />
                <div className="mt-12 space-y-12">
                    <SkillsSection />
                    <CodeFarmerNotes />
                    <ContactSection />
                </div>
            </div>
        </div>
    )
}
