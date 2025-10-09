// components/VersionIndicator.tsx
'use client';

import { useState, useEffect } from 'react';

interface VersionInfo {
    version: string;
    buildDate: string;
}

export default function VersionIndicator() {
    const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 从public下面的version.json获取版本信息
        fetch('/version.json').then(response => response.json()).then(data => {
            setVersionInfo(data);
        }).catch(error => {
            console.error('无法获取版本信息:', error);
        });


        // setVersionInfo(info);
    }, []);

    if (!versionInfo) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* 版本徽章 */}
            <div
                className={`bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${isVisible ? 'w-auto opacity-100' : 'w-8 opacity-70'
                    }`}
                onClick={() => setIsVisible(!isVisible)}
                title="点击查看版本信息"
            >
                {isVisible ? (
                    <div className="flex items-center space-x-2">
                        <span>✅ 已发布</span>
                        <span>v{versionInfo.version}</span>
                    </div>
                ) : (
                    <div className="w-full text-center">✓</div>
                )}
            </div>

            {/* 详细信息面板 */}
            {isVisible && (
                <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-64">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        发布状态
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between">
                            <span>版本:</span>
                            <span className="font-mono">v{versionInfo.version}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>构建时间:</span>
                            <span>{new Date(versionInfo.buildDate).toLocaleString()}</span>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}