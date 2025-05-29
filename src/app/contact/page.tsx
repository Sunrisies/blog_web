import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
    return (
        <div className=" bg-gradient-to-br h-full from-slate-50 to-slate-100 pt-6 pb-7.5 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact Support</h1>
                    <p className="text-xl text-slate-600">We're here to help. Get in touch with our support team.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700 mb-2 block">First Name</label>
                                    <Input placeholder="John" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700 mb-2 block">Last Name</label>
                                    <Input placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                                <Input type="email" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">Subject</label>
                                <Input placeholder="How can we help?" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
                                <Textarea placeholder="Please describe your issue or question..." rows={5} />
                            </div>

                            <Button className="w-full">
                                <Mail className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800">Email Support</h3>
                                        <p className="text-slate-600">support@yourcompany.com</p>
                                        <p className="text-sm text-slate-500">We'll respond within 24 hours</p>
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
                                        <h3 className="font-semibold text-slate-800">Phone Support</h3>
                                        <p className="text-slate-600">+1 (555) 123-4567</p>
                                        <p className="text-sm text-slate-500">Mon-Fri, 9AM-6PM EST</p>
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
                                        <h3 className="font-semibold text-slate-800">Office Location</h3>
                                        <p className="text-slate-600">123 Business Ave</p>
                                        <p className="text-slate-600">Suite 100, City, ST 12345</p>
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
