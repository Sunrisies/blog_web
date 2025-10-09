import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Code, Coffee, MapPin } from "lucide-react"
import { Avatar } from "@/components/avatar"

export function ChaoYangProfile() {
    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                    <Avatar size={40} />
                    <div className="absolute -bottom-2 right-3 bg-primary text-primary-foreground rounded-full p-2">
                        <Code className="h-4 w-4" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold mb-2">朝阳</h1>
                <p className="text-xl text-muted-foreground mb-4">全栈开发工程师 & 代码农夫</p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>北京, 中国</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>5年+ 开发经验</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Coffee className="h-4 w-4" />
                        <span>咖啡爱好者</span>
                    </div>
                </div>
            </div>

            {/* Biography Section */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">关于我</h2>
                    <div className="prose prose-gray max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            你好！我是朝阳，一名热爱技术的全栈开发工程师。我在软件开发领域已经耕耘了5年多，
                            专注于现代Web技术栈，包括React、Node、js、TypeScript等。我喜欢将自己称为 &quot;代码农夫&ldquo;，
                            因为我相信编程就像种田一样，需要耐心、细心和持续的努力才能收获丰硕的成果。
                        </p>

                        <p className="text-muted-foreground leading-relaxed mb-4">
                            我的技术之路始于大学时期对计算机科学的浓厚兴趣。毕业后，我加入了一家初创公司，
                            从前端开发做起，逐渐扩展到后端和全栈开发。在这个过程中，我不仅积累了丰富的技术经验，
                            也培养了解决复杂问题的能力和团队协作精神。
                        </p>

                        <p className="text-muted-foreground leading-relaxed">
                            除了编程，我还热爱阅读技术书籍、参与开源项目，以及在技术社区分享我的经验和见解。
                            我相信知识的分享能够推动整个技术社区的进步，这也是我创建这个博客的初衷。
                            在这里，我会分享我的 &quot;代码农夫笔记&quot;，记录我在开发过程中的思考、学习和成长。
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Interests & Values */}
            <Card>
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">兴趣与价值观</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium mb-3">技术兴趣</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">前端开发</Badge>
                                <Badge variant="secondary">后端架构</Badge>
                                <Badge variant="secondary">云计算</Badge>
                                <Badge variant="secondary">DevOps</Badge>
                                <Badge variant="secondary">开源项目</Badge>
                                <Badge variant="secondary">技术写作</Badge>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-3">个人爱好</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">摄影</Badge>
                                <Badge variant="outline">阅读</Badge>
                                <Badge variant="outline">旅行</Badge>
                                <Badge variant="outline">咖啡</Badge>
                                <Badge variant="outline">音乐</Badge>
                                <Badge variant="outline">健身</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">我的座右铭</h3>
                        <blockquote className="text-muted-foreground italic">
                            代码如诗，架构如画。用心编写每一行代码，用爱构建每一个系统。
                        </blockquote>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
