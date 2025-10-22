// components/VersionIndicator.tsx
'use client'

import { useState, useEffect } from 'react'

interface VersionInfo {
    name: string
    version: string
    previousVersion: string
    build: string
    buildDate: string
    buildTimestamp: string
    gitHash: string
    gitBranch: string
    environment: string
    language: string
    runtime: string
    nodeVersion: string
}

export default function VersionIndicator() {
    const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 从 .docker/version.json 获取版本信息
        fetch('/version.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('版本信息文件不存在')
                }
                return response.json()
            })
            .then(data => {
                setVersionInfo(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('无法获取版本信息:', error)
                setLoading(false)

                // 如果获取失败，尝试从环境变量或其他地方获取基本信息
                const fallbackInfo: Partial<VersionInfo> = {
                    version: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
                    buildDate: new Date().toISOString(),
                }
                setVersionInfo(fallbackInfo as VersionInfo)
            })
    }, [])

    if (loading) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium opacity-70">
                    <div className="w-8 text-center">⏳</div>
                </div>
            </div>
        )
    }

    if (!versionInfo) return null

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* 版本徽章 */ }
            <div
                className={ `bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${isVisible ? 'w-auto opacity-100' : 'w-8 opacity-70'
                    }` }
                onClick={ () => setIsVisible(!isVisible) }
                title="点击查看版本信息"
            >
                { isVisible ? (
                    <div className="flex items-center space-x-2">
                        <span>✅ 已发布</span>
                        <span>v{ versionInfo.version }</span>
                    </div>
                ) : (
                    <div className="w-full text-center">✓</div>
                ) }
            </div>

            {/* 详细信息面板 */ }
            { isVisible && (
                <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-80">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        发布状态
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between">
                            <span>应用:</span>
                            <span className="font-mono">{ versionInfo.name }</span>
                        </div>
                        <div className="flex justify-between">
                            <span>版本:</span>
                            <span className="font-mono">v{ versionInfo.version }</span>
                        </div>
                        <div className="flex justify-between">
                            <span>构建:</span>
                            <span className="font-mono text-xs">{ versionInfo.build }</span>
                        </div>
                        <div className="flex justify-between">
                            <span>构建时间:</span>
                            <span>{ new Date(versionInfo.buildDate).toLocaleString('zh-CN') }</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Git 提交:</span>
                            <span className="font-mono text-xs">{ versionInfo.gitHash }</span>
                        </div>
                        <div className="flex justify-between">
                            <span>环境:</span>
                            <span className="capitalize">{ versionInfo.environment }</span>
                        </div>
                        <div className="flex justify-between">
                            <span>运行时:</span>
                            <span>{ versionInfo.runtime } ({ versionInfo.nodeVersion })</span>
                        </div>
                        { versionInfo.previousVersion && versionInfo.previousVersion !== 'unknown' && (
                            <div className="flex justify-between">
                                <span>上一版本:</span>
                                <span className="font-mono">v{ versionInfo.previousVersion }</span>
                            </div>
                        ) }
                    </div>
                </div>
            ) }
        </div>
    )
}