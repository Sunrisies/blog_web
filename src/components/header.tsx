"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, Sun, Moon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavItem } from "@/components/navbar"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "Home", href: "/" },
  // {
  //   name: "Categories",
  //   subItems: [
  //     {
  //       name: "Culture",
  //       href: "/category/culture",
  //       description: "Traditions, festivals, and cultural insights",
  //     },
  //     {
  //       name: "Language",
  //       href: "/category/language",
  //       description: "Learning resources and linguistic insights",
  //     },
  //     {
  //       name: "Food",
  //       href: "/category/food",
  //       description: "Recipes, culinary traditions, and food culture",
  //     },
  //     {
  //       name: "Arts",
  //       href: "/category/arts",
  //       description: "Literature, calligraphy, music, and visual arts",
  //     },
  //   ],
  // },
  { name: "文章", href: "/blog/1" },
  { name: "时光轴", href: "/timeline" },
  { name: "图库", href: "/image-gallery" },
  {name:'音乐库','href':'/music-player'},
  { name: '第三方库', href: "/libraries" },
  { name: "关于", href: "/about" },
]

export function SiteHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    // Check for system preference or saved preference
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle("dark", newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo - Always on the left */}
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold">中文博客</span>
          </Link>
        </div>

        {/* Search - On left for mobile, before menu for desktop */}
        <div className={cn("flex items-center", isMobile ? "flex-1" : "mr-6")}>
          {showSearch ? (
            <div className="relative flex items-center w-full">
              <Input
                type="search"
                placeholder="Search..."
                className={cn("w-full", isMobile ? "w-full" : "w-[200px] lg:w-[280px]")}
                autoFocus
              />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setShowSearch(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
        </div>

        {/* Desktop Navigation - Center/Right */}
        <nav className="hidden md:flex md:gap-6 flex-1 justify-center">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        {/* Theme Toggle - Always visible */}
        <div className="flex items-center ml-auto md:ml-0">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-1">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Mobile Menu Toggle - Right side on mobile */}
        <div className="md:hidden ml-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="py-4">
                  <span className="text-lg font-bold">中文博客</span>
                </div>
                <nav className="flex flex-col gap-4 flex-1">
                  {navItems.map((item) => (
                    <NavItem key={item.name} item={item} isMobile={true} />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
