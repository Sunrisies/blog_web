'use client'

import ChatRoom from '@/components/chat/ChatRoom'
import { Button } from '@/components/ui/button'
import Http, { ResponseDto } from "@/services/request"
import { IRoomInfo, IRoomMessage } from '@/types/room'
import { MessageCircle, Users } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


const getRoomMessages = async (roomId: number) => {
    return await Http.get(`v1/rooms/${roomId}/messages`).json<ResponseDto<IRoomMessage[]>>()
}
const getRoomInfo = async (roomId: string) => {
    return await Http.get(`v1/rooms/${roomId}`).json<ResponseDto<IRoomInfo>>()
}


export default function ChatPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const roomName = params.roomId as string
    const nickname = searchParams.get('nickname') || '匿名用户'


    const [room, setRoom] = useState<IRoomInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [roomMessages, setRoomMessages] = useState<IRoomMessage[]>([])

    useEffect(() => {
        const loadRoomData = async () => {
            try {
                const roomInfo = await getRoomInfo(roomName)
                console.log(roomInfo, 'roomInfo')
                setRoom(roomInfo.data)
                const { data } = await getRoomMessages(roomInfo.data.id)
                setRoomMessages(data)
                // 模拟房间数据
                // setRoom({
                //     id: roomName,
                //     name: `房间 ${roomId}`,
                //     description: '欢迎来到聊天室',
                //     max_users: 100,
                //     created_at: new Date().toISOString(),
                // })
            } catch (error) {
                console.error('加载房间失败:', error)
                setError('房间加载失败')
            } finally {
                setLoading(false)
            }
        }

        if (roomName) {
            loadRoomData()
        }
    }, [roomName])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">加载中...</p>
                </div>
            </div>
        )
    }

    if (error || !room) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <MessageCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">房间不存在</h2>
                    <p className="text-gray-600 mb-6">请检查房间号是否正确</p>
                    <Button onClick={ () => window.location.href = '/' }>
                        返回首页
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="xs:min-h-[calc(100vh-3rem)] tb:min-h-[calc(100vh-21rem)]  flex flex-col bg-gray-50">
            {/* 顶部导航栏 */ }
            <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <MessageCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">{ room.name }</h1>
                            <p className="text-sm text-gray-500 flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                房间号: { room.id }
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{ nickname }</p>
                            <p className="text-xs text-gray-500">在线</p>
                        </div>
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                                { nickname.charAt(0).toUpperCase() }
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* 聊天区域 */ }
            <div className="flex-1 flex overflow-hidden">
                <ChatRoom room={ room } roomMessages={ roomMessages } />
            </div>
        </div>
    )
}