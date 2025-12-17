"use client"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    // 使用状态管理主题
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const [mounted, setMounted] = useState(false)
    // 只在客户端初始化主题
    useEffect(() => {
        setMounted(true)

        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
        if (savedTheme) {
            setTheme(savedTheme)
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
        }
    }, [])

    // 应用主题到DOM
    useEffect(() => {
        if (!mounted) return

        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme", theme)
    }, [theme, mounted])

    // 切换主题处理函数
    const handleThemeChange = async (event: React.MouseEvent) => {
        // 获取点击位置
        const x = event.clientX
        const y = event.clientY

        // 计算过渡半径（从点击位置到最远角落的距离）
        const transitionRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        )

        // 判断主题切换方向
        const isDarkToLight = theme === 'dark'
        console.log(theme, 'isDarkToLight')
        // 检查是否支持 View Transition API
        if (document.startViewTransition) {
            const transition = document.startViewTransition(() => {
                setTheme(isDarkToLight ? 'light' : 'dark')
            })

            // 等待过渡准备就绪
            transition.ready.then(() => {
                // 从亮到暗：使用裁切半径从小到大实现扩散效果
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0 at ${x}px ${y}px)`,
                            `circle(${transitionRadius}px at ${x}px ${y}px)`
                        ]
                    },
                    {
                        duration: 1000,
                        easing: 'ease-in-out',
                        pseudoElement: '::view-transition-new(root)'
                    }
                )
            })
        } else {
            // 降级方案：直接切换主题
            setTheme(isDarkToLight ? 'light' : 'dark')
        }
    }

    return (
        <button
            onClick={ handleThemeChange }
            className="theme-toggle-button relative h-7 w-14 rounded-full bg-slate-200 transition-colors duration-300 ease-in-out dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
            aria-label="切换主题"
        >
            <div
                className={ `absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out flex items-center justify-center ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                    } hover:shadow-lg` }
            >
                { theme === 'dark' ? (
                    <Moon className="h-4 w-4 text-slate-700" />
                ) : (
                    <Sun className="h-4 w-4 text-amber-400" />
                ) }
            </div>
        </button>
    )
}
