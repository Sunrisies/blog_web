import { SiteFooter } from "@/components/footer"
import { FPSCounter } from "@/components/fps-counter"
import { SiteHeader } from "@/components/header"
import "./globals.css"
import { Toaster } from "sonner"
import VersionIndicator from "@/components/versionIndicator"
import { Viewport } from 'next'
export function generateViewport(): Viewport {
  return {
    themeColor: [{ media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log(process.env.NEXT_PUBLIC_API_URL, '===')
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Toaster />
        <FPSCounter />
        <SiteHeader />
        <main className="flex-1">{ children }</main>
        <SiteFooter />
        { process.env.NODE_ENV === 'production' && <VersionIndicator /> }
      </body>
    </html>
  )
}
