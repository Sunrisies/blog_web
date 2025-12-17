"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, X, FileText, History, Image as ImageUI, Music, Library, User, House, Folder } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavItem } from "@/components/navbar"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "./theme-toggle"
import { Avatar } from "./avatar"

const navItems = [
  { name: "Home", href: "/", icon: <House /> },
  { name: "文章", href: "/blog/1", icon: <FileText /> },
  { name: "时光轴", href: "/timeline", icon: <History /> },
  {
    name: "影像长廊", href: "/album", icon: <ImageUI />
  },
  { name: '音乐库', 'href': '/music-player', icon: <Music /> },
  { name: '第三方库', href: "/libraries", icon: <Library /> },
  { name: "资源库", href: "/chat", icon: <Folder /> },
  { name: "关于", href: "/about", icon: <User /> },
]

export function SiteHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo - Always on the left */ }
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold">中文博客</span>
          </Link>
        </div>
        {/* Search - On left for mobile, before menu for desktop */ }
        <div className={ cn("flex items-center", isMobile ? "flex-1" : "mr-6") }>
          { showSearch ? (
            <div className="relative flex items-center w-full">
              <Input
                type="search"
                placeholder="Search..."
                className={ cn("w-full", isMobile ? "w-full" : "w-[200px] lg:w-[280px]") }
                autoFocus
              />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={ () => setShowSearch(false) }>
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={ () => setShowSearch(true) }>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          ) }
        </div>

        {/* Desktop Navigation - Center/Right */ }
        <nav className="hidden md:flex md:gap-6 flex-1 justify-center">
          { navItems.map((item) => (
            <NavItem key={ item.name } item={ item } setIsOpen={ () => { } } />
          )) }
        </nav>

        <ThemeToggle></ThemeToggle>
        <div className="md:hidden ml-2">

          <Sheet open={ isOpen } onOpenChange={ setIsOpen }>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px] text-white">
              <div className="h-32">
                <div className="h-full relative flex ">
                  <Image src="/navbar-bg.jpg" alt="Logo" fill className="object-cover -z-1" />
                  <div className="flex flex-col gap-2 justify-center items-center py-2 px-4 text-white z-10">
                    <Avatar size={ 24 } />
                    <h2>朝阳</h2>
                  </div>
                </div>
                <nav className="flex flex-col flex-1 px-4 py-4">
                  { navItems.map((item) => (
                    <NavItem key={ item.name } item={ item } isMobile={ true } setIsOpen={ setIsOpen } />
                  )) }
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header >
  )
}
