'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { useWebSocket } from '@/utils/websocket'

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

interface ChatRoomProps {
    roomId: string
}

export default function ChatRoom({ roomId }: ChatRoomProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const searchParams = useSearchParams()
    const userNickname = searchParams.get('nickname') || '匿名用户'
    const [userId] = useState(() => `user_${Math.random().toString(36).substr(2, 9)}`)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { lastMessage, sendMessage, isConnected } = useWebSocket(roomId, userId, userNickname)

    // 处理接收到的WebSocket消息
    useEffect(() => {
        if (lastMessage) {
            try {
                const newMessage = JSON.parse(lastMessage.data) as Message
                console.log('收到新消息:', newMessage)

                setMessages(prev => {
                    // 避免重复消息
                    const isDuplicate = prev.some(msg =>
                        msg.timestamp === newMessage.timestamp &&
                        msg.user_id === newMessage.user_id
                    )

                    if (!isDuplicate) {
                        return [newMessage, ...prev]
                    }
                    return prev
                })
            } catch (error) {
                console.error('解析消息失败:', error)
            }
        }
    }, [lastMessage])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async (content: string, messageType: string = 'text') => {
        if (content.trim()) {
            sendMessage({
                message_type: messageType,
                content: content.trim(),
                retention_hours: 24
            })
        }
    }

    const handleFileUpload = (fileUrl: string, fileName: string, fileSize: number) => {
        sendMessage({
            message_type: 'file',
            file_url: fileUrl,
            file_name: fileName,
            file_size: fileSize,
            retention_hours: 24
        })
    }

    return (
        <div className="flex-1 flex flex-col">
            {/* 连接状态指示器 */ }
            <div className={ `px-4 py-2 text-sm border-b ${isConnected
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-yellow-50 text-yellow-800 border-yellow-200'
                }` }>
                <div className="flex items-center justify-between">
                    <span>
                        { isConnected ? '🟢 已连接' : '🟡 连接中...' }
                    </span>
                    <span className="text-xs">
                        房间: { roomId } | 用户: { userNickname }
                    </span>
                </div>
            </div>

            {/* 消息列表 */ }
            <div className="flex-1 overflow-hidden">
                <MessageList
                    messages={ messages }
                    currentUserNickname={ userNickname }
                />
                <div ref={ messagesEndRef } />
            </div>

            {/* 消息输入框 */ }
            <div className="border-t bg-white p-4">
                <MessageInput
                    onSendMessage={ handleSendMessage }
                    onFileUpload={ handleFileUpload }
                    disabled={ !isConnected }
                />
            </div>
        </div>
    )
}