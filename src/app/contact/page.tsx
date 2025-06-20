import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="bg-gradient-to-br h-full from-slate-50 to-slate-100 pt-6 pb-7.5 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">联系支持</h1>
                    <p className="text-xl text-slate-600">我们随时准备帮助您。请联系我们的支持团队。</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* 联系表单 */ }
                    <Card>
                        <CardHeader>
                            <CardTitle>发送消息给我们</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700 mb-2 block">名</label>
                                    <Input placeholder="张" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700 mb-2 block">姓</label>
                                    <Input placeholder="伟" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">电子邮件</label>
                                <Input type="email" placeholder="zhangwei@example.com" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">主题</label>
                                <Input placeholder="我们如何帮助您？" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">消息</label>
                                <Textarea placeholder="请描述您的问题或疑问..." className="h-24" rows={ 5 } />
                            </div>

                            <Button className="w-full">
                                <Mail className="w-4 h-4 mr-2" />
                                发送消息
                            </Button>
                        </CardContent>
                    </Card>

                    {/* 联系信息 */ }
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800">电子邮件支持</h3>
                                        <p className="text-slate-600">3266420686@qq.com</p>
                                        <p className="text-sm text-slate-500">我们将在24小时内回复</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800">电话支持</h3>
                                        <p className="text-slate-600">13839063614</p>
                                        <p className="text-sm text-slate-500">周一至周五，上午9点至下午6点（EST）</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800">办公室地址</h3>
                                        <p className="text-slate-600">M78星云</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
