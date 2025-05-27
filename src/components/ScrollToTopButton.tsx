"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <Button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 p-3 bg-primary text-white rounded-full shadow-lg transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Scroll to top"
    >
      ↑
    </Button>
  )
}