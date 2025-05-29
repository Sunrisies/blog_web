"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Home, Mail, RefreshCw } from "lucide-react"

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application error:", error)
    }, [error])

    // Determine if this is a 500 error or another type
    const isServerError = error.message.includes("500") || error.digest
    const errorCode = isServerError ? "500" : "Error"
    const errorTitle = isServerError ? "Internal Server Error" : "Something Went Wrong"
    const errorMessage = isServerError
        ? "We're experiencing some technical difficulties on our end. Our team has been notified and is working to resolve the issue."
        : "An unexpected error occurred while processing your request. Please try again or contact support if the problem persists."

    return (
        <div className=" bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg border-red-200 !m-0 p-0">
                <CardContent className="p-8 text-center space-y-6">
                    {/* Error Icon and Code */}
                    <div className="space-y-3">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-red-600">{errorCode}</h1>
                        <div className="w-16 h-1 bg-red-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Error Message */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold text-slate-800">{errorTitle}</h2>
                        <p className="text-slate-600 leading-relaxed">{errorMessage}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                        <Button onClick={reset} className="w-full">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>

                        <div className="flex gap-2">
                            <Button variant="outline" asChild className="flex-1">
                                <Link href="/">
                                    <Home className="w-4 h-4 mr-2" />
                                    Homepage
                                </Link>
                            </Button>

                            <Button variant="outline" asChild className="flex-1">
                                <Link href="/contact">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Support
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Additional Help */}
                    <div className="pt-4 border-t border-red-200">
                        <p className="text-sm text-slate-500">
                            If this error persists, please{" "}
                            <Link href="/contact" className="text-red-600 hover:underline">
                                contact our support team
                            </Link>{" "}
                            with the error details above.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
