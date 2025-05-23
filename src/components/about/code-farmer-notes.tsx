import Link from "next/link"
import { Calendar, ArrowRight, BookOpen, Code2, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const recentNotes = [
    {
        id: 1,
        title: "React 18 并发特性深度解析",
        excerpt: "探索 React 18 的并发渲染机制，以及如何在实际项目中应用这些新特性...",
        category: "前端开发",
        date: "2025-01-15",
        readTime: "8 分钟",
        tags: ["React", "JavaScript", "性能优化"],
    },
    {
        id: 2,
        title: "Node.js 微服务架构实践",
        excerpt: "从单体应用到微服务的演进过程，以及在 Node.js 环境下的最佳实践...",
        category: "后端开发",
        date: "2025-01-10",
        readTime: "12 分钟",
        tags: ["Node.js", "微服务", "架构设计"],
    },
    {
        id: 3,
        title: "TypeScript 高级类型系统指南",
        excerpt: "深入理解 TypeScript 的类型系统，掌握高级类型技巧和最佳实践...",
        category: "编程语言",
        date: "2025-01-05",
        readTime: "15 分钟",
        tags: ["TypeScript", "类型系统", "最佳实践"],
    },
]

const noteCategories = [
    {
        icon: Code2,
        title: "技术教程",
        description: "详细的技术教程和实践指南",
        count: 24,
    },
    {
        icon: Lightbulb,
        title: "开发心得",
        description: "开发过程中的思考和总结",
        count: 18,
    },
    {
        icon: BookOpen,
        title: "学习笔记",
        description: "技术书籍和课程的学习记录",
        count: 12,
    },
]

export function CodeFarmerNotes() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">代码农夫笔记</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    记录我在软件开发路上的思考、学习和成长。这里有技术教程、开发心得、学习笔记， 以及我对技术趋势的观察和思考。
                </p>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {noteCategories.map((category) => (
                    <Card key={category.title} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <category.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{category.title}</h3>
                                    <p className="text-sm text-muted-foreground">{category.count} 篇文章</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Notes */}
            <Card>
                <CardHeader>
                    <CardTitle>最新笔记</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {recentNotes.map((note) => (
                        <div key={note.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">{note.category}</Badge>
                                    <span className="text-sm text-muted-foreground">{note.readTime}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>{note.date}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">{note.title}</h3>

                            <p className="text-muted-foreground mb-3">{note.excerpt}</p>

                            <div className="flex flex-wrap gap-2">
                                {note.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="text-center pt-4">
                        <Button asChild>
                            <Link href="/blog" className="flex items-center gap-2">
                                查看所有笔记
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
