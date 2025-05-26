"use client";
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';



const Comment = () => {
    const { theme } = useTheme();
    const giscusConfigs = {
        repo: process.env.NEXT_PUBLIC_REPO,
        repoId: process.env.NEXT_PUBLIC_REPO_ID,
        category: process.env.NEXT_PUBLIC_CATEGORY,
        categoryId: process.env.NEXT_PUBLIC_CATEGORY_ID,
    }
    return (
        <div id="comment" className="mx-auto max-w-prose py-6">
            <Giscus
                repo={giscusConfigs.repo}
                repoId={giscusConfigs.repoId}
                category={giscusConfigs.category}
                categoryId={giscusConfigs.categoryId}
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme === 'dark' ? 'transparent_dark' : 'light'}
                loading="lazy"
            />
        </div>
    );
};

export default Comment;