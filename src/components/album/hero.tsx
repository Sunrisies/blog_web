"use client"

import { useEffect, useState } from "react"
import Image from 'next/image'
interface Bubble {
    id: number
    left: number
    size: number
    duration: number
    delay: number
}

export function AlbumHero() {
    const [bubbles, setBubbles] = useState<Bubble[]>([])

    useEffect(() => {
        const generateBubbles = () => {
            const newBubbles: Bubble[] = []
            for (let i = 0; i < 15; i++) {
                newBubbles.push({
                    id: i,
                    left: Math.random() * 100, // Random position from 0-100%
                    size: Math.random() * 20 + 10, // Size between 10-30px
                    duration: Math.random() * 3 + 4, // Duration between 4-7 seconds
                    delay: Math.random() * 5, // Delay between 0-5 seconds
                })
            }
            setBubbles(newBubbles)
        }

        generateBubbles()
    }, [])

    return (
        <div className="relative mb-8 rounded-lg overflow-hidden">
            <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
                <Image
                    src="/city-skyline-with-modern-buildings-and-blue-sky.jpg"
                    alt="网络相册横幅"
                    fill
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white text-center">网络相册</h1>
                </div>

                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    { bubbles.map((bubble) => (
                        <div
                            key={ bubble.id }
                            className="absolute bottom-0 rounded-full bg-white bg-opacity-20 animate-bubble"
                            style={ {
                                left: `${bubble.left}%`,
                                width: `${bubble.size}px`,
                                height: `${bubble.size}px`,
                                animationDuration: `${bubble.duration}s`,
                                animationDelay: `${bubble.delay}s`,
                            } }
                        />
                    )) }
                </div>
            </div>
        </div>
    )
}
