import { useState } from 'react'
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from 'lucide-react'

interface MenuItem {
  label: string
  children?: {
    title: string
    href: string
  }[]
}

const menuItems: MenuItem[] = [
  {
    label: "备战春秋",
    children: [
      {
        title: "面试题",
        href: "/interview"
      },
      {
        title: "算法训练",
        href: "/algorithm"
      }
    ]
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
              className="relative"
              onMouseEnter={() => setActiveItem(item.label)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <button
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  activeItem === item.label ? "text-primary" : "text-muted-foreground"
                )}
              >
                <ChevronDownIcon
                  className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
                {item.label}
              </button>
              {activeItem !== item.label && item.children && (
                <div className="absolute left-0 top-full z-10 rounded-md border bg-popover py-4 shadow-md animate-in fade-in-0 zoom-in-95">
                  <div className="grid gap-4">
                    {item.children.map((child) => (
                      <a
                        key={child.title}
                        href={child.href}
                        className="block space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="text-sm font-medium">{child.title}</div>

                      </a>
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