'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Paperclip, Smile } from 'lucide-react'

interface MessageInputProps {
    onSendMessage: (content: string, messageType?: string) => void
    onFileUpload: (fileUrl: string, fileName: string, fileSize: number) => void
    disabled?: boolean
}

export default function MessageInput({ onSendMessage, onFileUpload, disabled }: MessageInputProps) {
    const [message, setMessage] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim() && !disabled) {
            onSendMessage(message, 'text')
            setMessage('')
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && !disabled) {
            // 这里应该实现文件上传逻辑
            // 暂时模拟上传成功
            const fileUrl = URL.createObjectURL(file)
            onFileUpload(fileUrl, file.name, file.size)

            // 重置文件输入
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    return (
        <form onSubmit={ handleSubmit } className="flex items-end gap-2">
            <div className="flex-1 flex items-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={ () => fileInputRef.current?.click() }
                    disabled={ disabled }
                    className="flex-shrink-0"
                >
                    <Paperclip className="h-4 w-4" />
                </Button>

                <div className="flex-1 relative">
                    <Input
                        value={ message }
                        onChange={ (e) => setMessage(e.target.value) }
                        placeholder={ disabled ? "连接中..." : "输入消息..." }
                        disabled={ disabled }
                        className="pr-12 resize-none"
                        onKeyDown={ (e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSubmit(e)
                            }
                        } }
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={ disabled }
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    >
                        <Smile className="h-4 w-4" />
                    </Button>
                </div>

                <input
                    type="file"
                    ref={ fileInputRef }
                    onChange={ handleFileSelect }
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                />

                <Button
                    type="submit"
                    size="icon"
                    disabled={ !message.trim() || disabled }
                    className="flex-shrink-0 bg-blue-600 hover:bg-blue-700"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </form>
    )
}