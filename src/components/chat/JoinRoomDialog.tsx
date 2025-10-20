
"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function JoinRoomDialog() {
    const [open, onOpenChange] = useState(true)
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

        // try {
        //     // 导航到聊天页面
        //     router.push(`/chat/${roomId}?nickname=${encodeURIComponent(nickname)}`)
        //     onOpenChange(false)
        // } catch (error) {
        //     console.error('加入房间失败:', error)
        //     alert('加入房间失败，请重试')
        // } finally {
        //     setLoading(false)
        // }
    }

    const handleClose = () => {
        setRoomId('')
        setNickname('')
        onOpenChange(false)
    }

    return (
        <Dialog open={ open } onOpenChange={ onOpenChange }>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">加入聊天室</DialogTitle>
                    <DialogDescription className="text-center">
                        输入房间号和昵称开始聊天
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={ handleJoinRoom } className="space-y-4 py-4">
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

                    <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={ handleClose }
                            className="w-full sm:w-auto"
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            disabled={ loading }
                            className="w-full sm:w-auto"
                        >
                            { loading ? '加入中...' : '加入房间' }
                        </Button>
                    </DialogFooter>
                </form>

                <div className="text-center text-xs text-muted-foreground">
                    <p>没有房间？输入任意房间号即可创建</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}