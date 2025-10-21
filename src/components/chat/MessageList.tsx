'use client'

import { useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Image, FileText, Download } from 'lucide-react'

interface Message {
    id?: number
    room_id: string
    user_id: string
    user_nickname: string
    message_type: string
    content?: string
    file_url?: string
    file_name?: string
    file_size?: number
    retention_hours: number
    timestamp: string
}

interface MessageListProps {
    messages: Message[]
    currentUserNickname: string
}

export default function MessageList({ messages, currentUserNickname }: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // 自动滚动到底部显示最新消息
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages])

    const formatTime = (dateString: string) => {
        try {
            return format(new Date(dateString), 'HH:mm', { locale: zhCN })
        } catch {
            return '未知时间'
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const renderMessageContent = (message: Message) => {
        switch (message.message_type) {
            case 'system':
                return (
                    <div className="text-center py-2">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                            { message.content }
                        </span>
                    </div>
                )

            case 'image':
                return (
                    <div className="mt-1">
                        <div className="relative group">
                            <img
                                src={ message.file_url }
                                alt="共享图片"
                                className="max-w-xs rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={ () => window.open(message.file_url, '_blank') }
                            />
                            <a
                                href={ message.file_url }
                                download
                                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Download className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                )

            case 'file':
                return (
                    <div className="mt-1">
                        <a
                            href={ message.file_url }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors group"
                        >
                            <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    { message.file_name }
                                </p>
                                <p className="text-xs text-gray-500">
                                    { formatFileSize(message.file_size || 0) }
                                </p>
                            </div>
                            <Download className="h-4 w-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                        </a>
                    </div>
                )

            default:
                return (
                    <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
                        <p className="text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
                            { message.content }
                        </p>
                    </div>
                )
        }
    }

    const isSystemMessage = (message: Message) => message.message_type === 'system'
    const isCurrentUserMessage = (message: Message) =>
        !isSystemMessage(message) && message.user_nickname === currentUserNickname

    // 按时间戳排序，确保最新的消息在底部
    const sortedMessages = [...messages].sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )

    return (
        <div className="relative h-full">
            <div
                ref={ scrollContainerRef }
                className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-blue-50/50 to-white p-4"
            >
                { sortedMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Image className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium mb-2">还没有消息</p>
                            <p className="text-sm">发送第一条消息开始对话</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        { sortedMessages.map((message, index) => (
                            <div
                                key={ `${message.timestamp}-${message.user_id}-${index}` }
                                className={ `flex ${isCurrentUserMessage(message)
                                    ? 'justify-end'
                                    : 'justify-start'
                                    }` }
                            >
                                { isSystemMessage(message) ? (
                                    <div className="w-full">
                                        { renderMessageContent(message) }
                                    </div>
                                ) : (
                                    <div className={ `max-w-xs lg:max-w-md ${isCurrentUserMessage(message) ? 'ml-auto' : ''
                                        }` }>
                                        {/* 对方消息显示头像和昵称 */ }
                                        { !isCurrentUserMessage(message) && (
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-medium">
                                                    { message.user_nickname.charAt(0).toUpperCase() }
                                                </div>
                                                <span className="text-xs font-medium text-gray-700">
                                                    { message.user_nickname }
                                                </span>
                                                <p className={ `text-xs mt-1 ${isCurrentUserMessage(message)
                                                    ? 'text-blue-600'
                                                    : 'text-gray-500'
                                                    }` }>
                                                    { formatTime(message.timestamp) }
                                                </p>
                                            </div>
                                        ) }

                                        <div className={ `flex gap-2 ${isCurrentUserMessage(message) ? 'flex-row-reverse' : 'flex-row'
                                            }` }>
                                            {/* 自己消息显示头像 */ }
                                            <div>
                                                { isCurrentUserMessage(message) && (
                                                    <>
                                                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                                                            { message.user_nickname.charAt(0).toUpperCase() }
                                                        </div>
                                                        <p className={ `text-xs mt-1 ${isCurrentUserMessage(message)
                                                            ? 'text-blue-600'
                                                            : 'text-gray-500'
                                                            }` }>
                                                            { formatTime(message.timestamp) }
                                                        </p>
                                                    </>
                                                ) }
                                            </div>

                                            <div className={ `flex flex-col ${isCurrentUserMessage(message) ? 'items-end' : 'items-start'
                                                }` }>
                                                {/* 消息内容 */ }
                                                { renderMessageContent(message) }
                                            </div>
                                        </div>
                                    </div>
                                ) }
                            </div>
                        )) }
                    </div>
                ) }
                <div ref={ messagesEndRef } />
            </div>
        </div>
    )
}