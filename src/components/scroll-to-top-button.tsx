"use client"
import { ArrowUp } from "lucide-react"
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
      onClick={ scrollToTop }
      className={ `fixed bottom-4 right-4  bg-primary text-white rounded-full shadow-lg  h-12 w-12 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}` }
      aria-label="Scroll to top"
    >
      <ArrowUp className="!w-6 !h-6" strokeWidth={ 2.25 } absoluteStrokeWidth />
    </Button>
  )
}