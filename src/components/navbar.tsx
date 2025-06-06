"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface SubNavItem {
  name: string
  href: string
  description?: string
}

interface NavItemProps {
  item: {
    name: string
    href?: string
    subItems?: SubNavItem[]
  }
  isMobile?: boolean
}

export function NavItem({ item, isMobile = false }: NavItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle direct navigation items
  if (!item.subItems) {
    return (
      <Link
        href={item.href || "#"}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100",
          pathname === item.href ? "text-primary after:scale-x-100" : "text-muted-foreground",
        )}
      >
        {item.name}
      </Link>
    )
  }

  // Handle dropdown items
  if (isMobile) {
    // Mobile dropdown (click to expand)
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
            isOpen ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.name}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="mt-2 space-y-2 pl-4">
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.href}
                className="block text-sm text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Desktop dropdown (hover to expand)
  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
          isOpen ? "text-primary" : "text-muted-foreground",
        )}
      >
        {item.name}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-md border bg-background p-2 shadow-md">
          {item.subItems.map((subItem) => (
            <Link key={subItem.name} href={subItem.href} className="block rounded-sm p-2 text-sm hover:bg-muted">
              <div className="font-medium">{subItem.name}</div>
              {subItem.description && <div className="text-xs text-muted-foreground">{subItem.description}</div>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
