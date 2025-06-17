"use client"
import React from 'react'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
interface Props {
    className?: string
}
const Comment: React.FC<Props> = ({ className }) => {
    const { theme } = useTheme()
    const giscusConfigs = {
        repo: process.env.NEXT_PUBLIC_REPO,
        repoId: process.env.NEXT_PUBLIC_REPO_ID,
        category: process.env.NEXT_PUBLIC_CATEGORY,
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_ID,
    }
    return (
        <div id="comment"
            className={ cn("mx-10", className) }>
            <Giscus

                repo={ giscusConfigs.repo }
                repoId={ giscusConfigs.repoId }
                category={ giscusConfigs.category }
                categoryId={ giscusConfigs.categoryId }
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={ theme === 'dark' ? 'transparent_dark' : 'light' }
                loading="lazy"
            />
        </div>
    )
}

export default Comment