"use client"
import Http, { ResponseDto } from "@/services/request"

const createRoom = async (roomId: string) => {
    return await Http.post('v1/rooms', {
        json: { name: roomId },
    }).json<ResponseDto<null>>()
}

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function JoinRoomForm() {
    const [roomId, setRoomId] = useState('')
    const [nickname, setNickname] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleJoinRoom = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!roomId.trim() || !nickname.trim()) {
            alert('请填写房间号和昵称')
            return
        }
        setLoading(true)
        const { code, data } = await createRoom(roomId)
        if (code === 200 && !data) {
            try {
                // 导航到聊天页面
                router.push(`/chat/${roomId}?nickname=${encodeURIComponent(nickname)}`)
            } catch (error) {
                console.error('加入房间失败:', error)
                alert('加入房间失败，请重试')
            } finally {
                setLoading(false)
            }
        }
    }

    const handleReset = () => {
        setRoomId('')
        setNickname('')
    }

    return (
        <div className="xs:min-h-[calc(100vh-3rem)] tb:min-h-[calc(100vh-21rem)] flex justify-center items-center h-full">
            <div className="max-w-md flex-1   border border-gray-300 p-6 bg-white rounded-lg shadow-md">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-center">加入聊天室</h2>
                    <p className="text-center text-gray-600 mt-2">
                        输入房间号和昵称开始聊天
                    </p>
                </div>

                <form onSubmit={ handleJoinRoom } className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="nickname" className="text-sm font-medium leading-none">
                            昵称
                        </label>
                        <Input
                            id="nickname"
                            type="text"
                            value={ nickname }
                            onChange={ (e) => setNickname(e.target.value) }
                            placeholder="请输入您的昵称"
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="roomId" className="text-sm font-medium leading-none">
                            房间号
                        </label>
                        <Input
                            id="roomId"
                            type="text"
                            value={ roomId }
                            onChange={ (e) => setRoomId(e.target.value) }
                            placeholder="请输入房间号"
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={ handleReset }
                            className="w-full sm:w-auto"
                        >
                            重置
                        </Button>
                        <Button
                            type="submit"
                            disabled={ loading }
                            className="w-full sm:w-auto"
                        >
                            { loading ? '加入中...' : '加入房间' }
                        </Button>
                    </div>
                </form>

                <div className="text-center text-xs text-gray-500 mt-4">
                    <p>没有房间？输入任意房间号即可创建</p>
                </div>
            </div>
        </div>

    )
}
