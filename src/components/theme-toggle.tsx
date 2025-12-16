import { useState, useEffect, useRef } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // 使用函数形式初始化状态，避免同步渲染问题
        if (typeof window === "undefined") return false
        const savedTheme = localStorage.getItem("theme")
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        return savedTheme === "dark" || (!savedTheme && systemPrefersDark)
    })
    const [isAnimating, setIsAnimating] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        // 使用 setTimeout 将状态更新推迟到下一个事件循环
        const timer = setTimeout(() => {
            const savedTheme = localStorage.getItem("theme")
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            const initialTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark)

            setIsDarkMode(initialTheme)
            document.documentElement.classList.toggle("dark", initialTheme)
        }, 0)

        return () => clearTimeout(timer)
    }, [])

    const toggleTheme = (event: PointerEvent) => {
        if (isAnimating) return

        // 检查浏览器是否支持 View Transition API
        if (!document.startViewTransition) {
            // 降级方案：直接切换主题
            const newMode = !isDarkMode
            setIsDarkMode(newMode)
            document.documentElement.classList.toggle("dark", newMode)
            localStorage.setItem("theme", newMode ? "dark" : "light")
            return
        }

        setIsAnimating(true)
        const newMode = !isDarkMode

        // 获取点击位置
        const { clientX, clientY } = event

        // 使用 View Transition API
        const transition = document.startViewTransition(() => {
            setIsDarkMode(newMode)
            document.documentElement.classList.toggle("dark")
            localStorage.setItem("theme", newMode ? "dark" : "light")
        })

        // 在过渡准备完成后执行自定义动画
        transition.ready.then(() => {
            // 计算半径，以点击位置为圆心，到四个角的距离中最大的那个作为半径
            const radius = Math.hypot(
                Math.max(clientX, window.innerWidth - clientX),
                Math.max(clientY, window.innerHeight - clientY)
            )

            const clipPath = [
                `circle(0% at ${clientX}px ${clientY}px)`,
                `circle(${radius}px at ${clientX}px ${clientY}px)`
            ]

            // 执行自定义动画
            document.documentElement.animate(
                {
                    clipPath: newMode ? clipPath.reverse() : clipPath
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: newMode
                        ? '::view-transition-old(root)'
                        : '::view-transition-new(root)'
                }
            )
        })

        // 动画完成后重置状态
        transition.finished.finally(() => {
            setIsAnimating(false)
        })
    }

    return (
        <div className="flex items-center ml-auto md:ml-0">
            <Button
                ref={ buttonRef }
                variant="ghost"
                size="icon"
                onClick={ () => toggleTheme(event as PointerEvent) }
                className={ `relative mr-1 h-9 w-9 overflow-hidden cursor-pointer transition-transform duration-300 ${isAnimating ? "scale-90" : "scale-100 hover:scale-110"
                    }` }
                disabled={ isAnimating }
                aria-label="切换主题"
            >
                {/* 旋转背景效果 */ }
                <div className={ `absolute inset-0 rounded-full transition-all duration-500 ${isDarkMode
                    ? "bg-gradient-to-br from-slate-700 to-slate-900 scale-100"
                    : "bg-gradient-to-br from-amber-100 to-yellow-100 scale-100"
                    } ${isAnimating ? 'rotate-180' : ''}` } />

                {/* 太阳图标 */ }
                <Sun className={ `relative h-4 w-4 transition-all duration-500 ${isDarkMode
                    ? "rotate-90 scale-0 opacity-0 text-amber-200"
                    : "rotate-0 scale-100 opacity-100 text-amber-600"
                    }` } />

                {/* 月亮图标 */ }
                <Moon className={ `absolute h-4 w-4 transition-all duration-500 ${isDarkMode
                    ? "rotate-0 scale-100 opacity-100 text-slate-200"
                    : "-rotate-90 scale-0 opacity-0 text-slate-400"
                    }` } />
            </Button>
        </div>
    )
}
