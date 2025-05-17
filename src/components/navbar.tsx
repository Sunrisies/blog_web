import { useState } from 'react'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronDownIcon } from 'lucide-react'

interface MenuItem {
  label: string
  href?: string
  children?: {
    title: string
    href: string
  }[]
}

const menuItems: MenuItem[] = [
  {
    label: '首页',
    href: '/'
  },
  {
    label: "技术笔记",
    children: [
      {
        title: "前端框架",
        href: "/frontend"
      },
      {
        title: "后端开发",
        href: "/backend"
      }
    ]
  },
  {
    label: "计算机基础",
    children: [
      {
        title: "操作系统",
        href: "/os"
      },
      {
        title: "计算机网络",
        href: "/network"
      }
    ]
  },
  {
    label: '关于',
    href: '/about'
  }
]

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex space-x-6">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative inline-block"
              onMouseEnter={() => setActiveItem(item.label)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className="flex items-center">
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                      activeItem === item.label ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                      activeItem === item.label ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                )}
                {item.children && (
                  <ChevronDownIcon
                    className={cn(
                      "relative top-[1px] ml-1 size-3 transition duration-300",
                      activeItem === item.label ? "rotate-180" : ""
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>

              {activeItem === item.label && item.children && (
                <div className="absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 transform rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95">
                  <div >
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className="block whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}