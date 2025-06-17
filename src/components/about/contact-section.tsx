import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, MessageCircle, Twitter } from "lucide-react"

const contactMethods = [
    {
        icon: Mail,
        label: "邮箱",
        value: "3266420686@qq.com",
        href: "mailto:3266420686@qq.com",
        description: "工作合作或技术交流",
    },
    {
        icon: Github,
        label: "GitHub",
        value: "Sunrisies",
        href: "https://github.com/Sunrisies",
        description: "查看我的开源项目",
    },

]

export function ContactSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    联系我
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">
                    欢迎与我交流技术话题、工作机会或任何有趣的想法。我很乐意与同行开发者分享经验， 也期待学习新的知识和观点。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    { contactMethods.map((method) => (
                        <div
                            key={ method.label }
                            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <method.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{ method.label }</span>
                                    <Button variant="ghost" size="sm" asChild>
                                        <a href={ method.href } target="_blank" rel="noopener noreferrer">
                                            { method.value }
                                        </a>
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">{ method.description }</p>
                            </div>
                        </div>
                    )) }
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2">合作意向</h3>
                    <p className="text-sm text-muted-foreground">
                        我对以下类型的合作特别感兴趣：技术咨询、开源项目贡献、技术写作、 演讲分享以及有挑战性的全栈开发项目。
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
