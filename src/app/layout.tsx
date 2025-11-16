import { SiteFooter } from "@/components/footer"
import { FPSCounter } from "@/components/fps-counter"
import { SiteHeader } from "@/components/header"
import "./globals.css"
import { Toaster } from "sonner"
import VersionIndicator from "@/components/versionIndicator"
import { Viewport } from 'next'
import Script from 'next/script'
import { GlobalAudioPlayer } from "@/components/music/global-audio-player"
import { MusicPlayer } from "@/components/music/draggable-music-player"

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
        <GlobalAudioPlayer />
        <MusicPlayer defaultPosition="bottom-right" />
      </body>
      { process.env.NODE_ENV === 'production' && (
        <Script
          src="https://umami.sunrise1024.top/script.js"
          strategy="afterInteractive"
          data-website-id="01579b78-c4a6-4a5a-b60f-01fb76d7f588"
        />
      ) }
    </html>
  )
}
