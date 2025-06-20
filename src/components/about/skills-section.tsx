import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skills = [
    { name: "JavaScript/TypeScript", level: 95, category: "前端" },
    { name: "React/Next.js", level: 90, category: "前端" },
    { name: "Vue.js", level: 85, category: "前端" },
    { name: "Node.js", level: 88, category: "后端" },
    { name: "Python", level: 80, category: "后端" },
    { name: "PostgreSQL/MongoDB", level: 85, category: "数据库" },
    { name: "Docker/Kubernetes", level: 75, category: "DevOps" },
    { name: "AWS/云服务", level: 82, category: "云计算" },
]
const workflows = [
    "敏捷开发 & Scrum",
    "测试驱动开发 (TDD)",
    "持续集成/持续部署 (CI/CD)",
    "代码审查 & 结对编程"
]
const tools = ["VS Code", "Git", "Docker", "JavaScript", "ApiFox", "Vue 全家桶", "Webpack", "Vite", "React", "Next.js", "Node.js", "Nestjs", "PostgreSQL", "MongoDB", "Redis", "Nginx"]

export function SkillsSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span>技术技能</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    { skills.map((skill) => (
                        <div key={ skill.name } className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{ skill.name }</span>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                        { skill.category }
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">{ skill.level }%</span>
                                </div>
                            </div>
                            <Progress value={ skill.level } className="h-2" />
                        </div>
                    )) }
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>开发工具</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        { tools.map((tool) => (
                            <Badge key={ tool } variant="secondary">
                                { tool }
                            </Badge>
                        )) }
                    </div>

                    <div className="mt-6 space-y-4">
                        <h3 className="font-medium">工作流程</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            { workflows.map((workflow) => (
                                <div key={ workflow } className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span>{ workflow }</span>
                                </div>
                            )) }
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}
