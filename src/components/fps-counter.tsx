"use client"

import { useEffect, useState } from "react"

export function FPSCounter() {
  const [fps, setFps] = useState(0)
  
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    
    const updateFPS = () => {
      const currentTime = performance.now()
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount)
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(updateFPS)
    }
    
    const animationId = requestAnimationFrame(updateFPS)
    
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <div className="fixed top-2 left-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-sm text-muted-foreground z-[9999]">
      FPS: {fps}
    </div>
  )
}