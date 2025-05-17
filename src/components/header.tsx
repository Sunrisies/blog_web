'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import NavBar from './navbar'

export default function Header() {
  const pathname = usePathname()

  const mainNav = [
    { name: '首页', href: '/' },
    { name: '文章', href: '/articles/1' },
    { name: '图库', href: '/gallery' },
    { name: '分类', href: '#' },
  ]

  const secondaryNav = [
    { name: '时光轴', href: '/timeline' },
    { name: '关于', href: '/about' },
    { name: '留言', href: '/message' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-xs">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-linear-to-r from-primary to-teal-600 bg-clip-text text-transparent">码农札记</div>
          <span className="text-muted-foreground text-sm hidden sm:inline">| 分享生活的点滴</span>
        </div>

        {/* 统一导航 - 大屏幕显示 */}
        {/* <nav className="hidden lg:flex items-center space-x-8">
          {[...mainNav, ...secondaryNav].map((item) => {
            const isActive = pathname === item.href
            return (
              <Link href={item.href} key={item.name} className={cn(
                'relative py-2 text-foreground hover:text-primary transition-colors duration-300',
                isActive && 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
              )}>
                {item.name}
              </Link>
            )
          })}
        </nav> */}
        <NavBar></NavBar>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Input
              type="text"
              placeholder="搜索文章..."
              className="w-40 lg:w-56 pl-9 pr-4 py-2 rounded-full border-border focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
          {/* <ThemeToggle /> */}

          {/* 移动端菜单 */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-accent rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[340px] p-0">
              <div className="h-full flex flex-col">
                <SheetHeader className="px-6 py-4 border-b">
                  <SheetTitle className="text-lg">导航菜单</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 py-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="搜索文章..."
                        className="w-full pl-9 pr-4 py-2 rounded-full border-border focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    </div>
                  </div>

                  <div className="px-3">
                    <div className="mb-6">
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        主导航
                      </div>
                      <nav className="space-y-1">
                        {mainNav.map((item) => {
                          const isActive = pathname === item.href
                          return (
                            <Link
                              href={item.href}
                              key={item.name}
                              className={cn(
                                'flex items-center px-3 py-3 rounded-lg transition-colors duration-200',
                                isActive
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'hover:bg-accent/50'
                              )}
                            >
                              {item.name}
                            </Link>
                          )
                        })}
                      </nav>
                    </div>

                    <div>
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        更多导航
                      </div>
                      <nav className="space-y-1">
                        {secondaryNav.map((item) => {
                          const isActive = pathname === item.href
                          return (
                            <Link
                              href={item.href}
                              key={item.name}
                              className={cn(
                                'flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200',
                                isActive
                                  ? 'text-primary bg-primary/5 font-medium'
                                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                              )}
                            >
                              {item.name}
                            </Link>
                          )
                        })}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
