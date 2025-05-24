"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { generateHeadingId } from "@/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}


export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Parse the markdown content to extract headings
  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const items: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2]
        .replace(/\[([^\]]+)\]$$[^)]+$$/g, "$1") // Remove markdown links but keep text
        .replace(/`([^`]+)`/g, "$1") // Remove code backticks but keep text
        .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold markers but keep text
        .replace(/\*([^*]+)\*/g, "$1") // Remove italic markers but keep text
        .trim()
      const id = generateHeadingId(text)
      // const id = text
      //   .toLowerCase()
      //   .replace(/[^\w\s-]/g, "")
      //   .replace(/\s+/g, "-")

      items.push({ id, text, level })
    }
    console.log(items, 'items')
    setTocItems(items)
  }, [content])

  // Track the active heading based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: [0, 1],
      },
    )

    // Observe all headings
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      tocItems.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [tocItems])

  // Scroll to section when TOC item is clicked
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 sticky top-24">
      <h3 className="text-xl font-semibold border-b pb-3">Table of Contents</h3>
      <nav className="space-y-1">
        {tocItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "group relative py-1 text-sm cursor-pointer transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground rounded",
              activeId === item.id && [
                "bg-accent text-accent-foreground",
                "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1",
                "before:bg-primary before:rounded-full",
              ],
              item.level === 1 && "font-medium",
            )}
            style={{
              paddingLeft: `${item.level * 0.75}rem`,
            }}
            onClick={() => scrollToSection(item.id)}
          >
            <span
              className={cn(
                "relative block transition-transform duration-200",
                "group-hover:translate-x-1",
                activeId === item.id && "translate-x-1",
              )}
            >
              {item.text}
            </span>
          </div>
        ))}
      </nav>
    </div>
  )
}