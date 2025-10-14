"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

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
    icon?: React.ReactNode
  }
  isMobile?: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function NavItem({ item, isMobile = false, setIsOpen }: NavItemProps) {
  const pathname = usePathname()
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
  }, [setIsOpen])
  if (isMobile) {
    return (
      <Link
        href={ item.href || "#" }
        className={ cn(
          "text-sm font-medium transition-colors hover:text-primary relative",
        ) }
      >
        <div className={ cn(
          "border py-2 px-4 rounded-md text-center relative",          // 需要 relative 让伪元素定位参考这里
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px]",
          "after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
          "hover:after:scale-x-100 flex items-center gap-2 py-3",
          pathname === item.href
            ? "text-primary after:scale-x-100"
            : "text-muted-foreground"
        ) } onClick={ () => {
          setIsOpen(false)
        } }>
          { item.icon }
          { item.name }
        </div>
      </Link >
    )
  }


  // Handle direct navigation items
  if (!item.subItems) {
    return (
      <Link

        href={ item.href || "#" }
        className={ cn(
          "text-sm font-medium transition-colors hover:text-primary relative",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100",
          pathname === item.href ? "text-primary after:scale-x-100" : "text-muted-foreground",
        ) }

      >
        { item.name }
      </Link >
    )
  }
}