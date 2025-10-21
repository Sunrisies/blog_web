'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { useWebSocket } from '@/utils/websocket'
import { IRoomInfo, IRoomMessage } from '@/types/room'

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


export default function ChatRoom({ room, roomMessages }: { room: IRoomInfo, roomMessages: IRoomMessage[] }) {
    const { id: roomId, name: roomName } = room
    const [messages, setMessages] = useState<Message[]>([])
    const searchParams = useSearchParams()
    const userNickname = searchParams.get('nickname') || '匿名用户'
    const [userId] = useState(() => `user_${Math.random().toString(36).substr(2, 9)}`)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { lastMessage, sendMessage, isConnected } = useWebSocket(roomId, roomName, userId, userNickname)
    useEffect(() => {
        if (roomMessages && roomMessages.length > 0) {
            const convertedMessages: Message[] = roomMessages.map(msg => ({
                id: msg.id,
                room_id: msg.room_id.toString(), // 转换为字符串
                user_id: 'system', // 系统消息没有具体用户
                user_nickname: userNickname || '系统消息',
                message_type: msg.message_type,
                content: msg.content,
                file_url: msg.file_url || undefined,
                file_name: msg.file_name || undefined,
                file_size: msg.file_size ? parseInt(msg.file_size) : undefined,
                retention_hours: msg.retention_hours,
                timestamp: msg.created_at // 使用 created_at 作为时间戳
            }))

            setMessages(convertedMessages)
        }
    }, [roomMessages])
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
                // 房间的id
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