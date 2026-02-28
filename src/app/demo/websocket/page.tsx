'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/auth-store'
import Link from 'next/link'
import {
  Send, Users, Wifi, WifiOff, MessageSquare, User as UserIcon, Circle,
  LogIn, AlertTriangle, Paperclip, X, FileText, Image, File, Loader2,
  Bot, Sparkles, Settings, MoreVertical, Smile, Mic
} from 'lucide-react'

type User = { id: string; username: string; avatar?: string }
type FileAttachment = { name: string; url: string; size: number; mimeType: string }

interface Message {
  id: string
  username: string
  content: string
  timestamp: Date | string
  type: 'user' | 'system' | 'ai'
  files?: FileAttachment[]
}

export default function WebSocketDemoPage() {
  const { user, isAuthenticated } = useAuthStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isUsernameSet, setIsUsernameSet] = useState(false)
  const [socket, setSocket] = useState<{ emit: (event: string, data: unknown) => void; disconnect: () => void } | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting')
  const [files, setFiles] = useState<FileAttachment[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [aiTyping, setAiTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isAuthenticated && user?.name && !username) {
      setUsername(user.name)
    }
  }, [isAuthenticated, user, username])

  useEffect(() => {
    if (!isAuthenticated) {
      setConnectionStatus('disconnected')
      return
    }

    let socketInstance: { on: (event: string, callback: (data: unknown) => void) => void; emit: (event: string, data: unknown) => void; disconnect: () => void } | null = null

    const initSocket = async () => {
      try {
        setConnectionStatus('connecting')
        const { io } = await import('socket.io-client')

        const isLocalhost = typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

        const wsUrl = isLocalhost
          ? 'http://localhost:3003'
          : 'https://mathematical-emperor-replaced-jelsoft.trycloudflare.com'

        socketInstance = io(wsUrl, {
          transports: ['websocket', 'polling'],
          forceNew: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 10000
        })

        socketInstance.on('connect', () => {
          setConnectionStatus('connected')
          setIsConnected(true)
        })

        socketInstance.on('disconnect', () => {
          setIsConnected(false)
          setConnectionStatus('disconnected')
        })

        socketInstance.on('connect_error', () => {
          setConnectionStatus('error')
          setIsConnected(false)
        })

        // 历史消息
        socketInstance.on('history', (history: Message[]) => {
          setMessages(history)
        })

        socketInstance.on('message', (msg: Message) => {
          setMessages(prev => [...prev, msg])
        })

        socketInstance.on('user-joined', (data: { user: User; message: Message }) => {
          setMessages(prev => [...prev, data.message])
          setUsers(prev => prev.find(u => u.id === data.user.id) ? prev : [...prev, data.user])
        })

        socketInstance.on('user-left', (data: { user: User; message: Message }) => {
          setMessages(prev => [...prev, data.message])
          setUsers(prev => prev.filter(u => u.id !== data.user.id))
        })

        socketInstance.on('users-list', (data: { users: User[] }) => {
          setUsers(data.users)
        })

        socketInstance.on('ai-typing', (data: { isTyping: boolean }) => {
          setAiTyping(data.isTyping)
        })

        setSocket(socketInstance)
      } catch {
        setConnectionStatus('error')
      }
    }

    initSocket()

    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
      }
    }
  }, [isAuthenticated])

  // 文件上传
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    setIsUploading(true)
    const formData = new FormData()
    Array.from(selectedFiles).forEach(file => {
      formData.append('files', file)
    })

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()

      if (data.success && data.files) {
        setFiles(prev => [...prev, ...data.files])
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleJoin = () => {
    if (socket && username.trim() && isConnected) {
      socket.emit('join', { username: username.trim() })
      setIsUsernameSet(true)
    }
  }

  const sendMessage = () => {
    if (socket && (inputMessage.trim() || files.length > 0) && username.trim()) {
      socket.emit('message', {
        content: inputMessage.trim(),
        username: username.trim(),
        files: files.length > 0 ? files : undefined
      })
      setInputMessage('')
      setFiles([])
    }
  }

  const askAI = () => {
    if (socket && inputMessage.trim() && username.trim()) {
      socket.emit('ask-ai', {
        content: inputMessage.trim(),
        username: username.trim()
      })
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isUsernameSet) {
        handleJoin()
      } else {
        sendMessage()
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-4 h-4" />
    if (mimeType.includes('pdf') || mimeType.includes('document')) return <FileText className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  const formatTime = (timestamp: Date | string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  // 未登录状态
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-800/50 border-slate-700 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">需要登录</CardTitle>
            <CardDescription className="text-slate-400">使用聊天室功能需要先登录账户</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-400 text-center">
              登录后您可以体验实时多人聊天功能，与 AI 助手互动
            </p>
            <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Link href="/user"><LogIn className="w-4 h-4 mr-2" />前往登录</Link>
            </Button>
            <Button variant="outline" asChild className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
              <Link href="/examples">返回案例广场</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 连接错误状态
  if (connectionStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-800/50 border-yellow-500/50 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl text-yellow-500">服务暂时不可用</CardTitle>
            <CardDescription className="text-slate-400">聊天服务器当前未启动</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" asChild className="flex-1 border-slate-600 text-slate-300">
                <Link href="/examples">返回</Link>
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600" onClick={() => window.location.reload()}>
                重试
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 未设置昵称
  if (!isUsernameSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-800/50 border-slate-700 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">加入聊天室</CardTitle>
            <CardDescription className="text-slate-400">设置您的昵称开始聊天</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入昵称..."
                disabled={!isConnected}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
              <Button
                onClick={handleJoin}
                disabled={!isConnected || !username.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                加入
              </Button>
            </div>
            {user?.name && (
              <p className="text-sm text-slate-400 text-center">
                当前账户: {user.name}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // 主聊天界面
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white hover:bg-slate-700">
              <Link href="/examples"><MessageSquare className="w-5 h-5" /></Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                实时聊天室
              </h1>
              <p className="text-xs text-slate-400">与 AI 助手和其他用户实时互动</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {aiTyping && (
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                AI 正在回复...
              </Badge>
            )}
            <Badge variant={isConnected ? 'default' : 'secondary'} className={`gap-1 ${isConnected ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-slate-700 text-slate-400'}`}>
              {isConnected ? <><Wifi className="w-3 h-3" />已连接</> : <><WifiOff className="w-3 h-3" />连接中</>}
            </Badge>
            <Badge variant="outline" className="gap-1 border-slate-600 text-slate-300">
              <Users className="w-3 h-3" />{users.length} 在线
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-4 flex gap-4 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Messages */}
          <Card className="flex-1 bg-slate-800/50 border-slate-700/50 backdrop-blur-xl overflow-hidden">
            <ScrollArea className="h-[calc(100vh-320px)] p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-indigo-400" />
                    </div>
                    <p className="text-slate-400">暂无消息，发送第一条消息开始聊天！</p>
                    <p className="text-sm text-slate-500 mt-2">输入 @ai 或点击 ✨ 按钮召唤 AI 助手</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.type === 'ai' ? 'justify-start' : msg.type === 'system' ? 'justify-center' : 'justify-end'}`}
                    >
                      {msg.type === 'ai' && (
                        <Avatar className="w-8 h-8 ring-2 ring-indigo-500/30">
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[75%] ${msg.type === 'system' ? 'w-auto' : ''}`}>
                        <div className={`text-xs mb-1 ${msg.type === 'ai' ? 'text-indigo-400' : msg.type === 'system' ? 'text-slate-500' : 'text-slate-400'}`}>
                          {msg.username} · {formatTime(msg.timestamp)}
                        </div>
                        <div className={`rounded-2xl px-4 py-2 ${
                          msg.type === 'ai'
                            ? 'bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 text-white'
                            : msg.type === 'system'
                            ? 'bg-slate-700/50 text-slate-300 text-center text-sm italic'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                        }`}>
                          <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                          {msg.files && msg.files.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {msg.files.map((file, i) => (
                                <a
                                  key={i}
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg text-xs hover:bg-black/30 transition-colors"
                                >
                                  {getFileIcon(file.mimeType)}
                                  <span>{file.name}</span>
                                  <span className="text-slate-400">({formatFileSize(file.size)})</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {msg.type === 'user' && (
                        <Avatar className="w-8 h-8 ring-2 ring-slate-600">
                          <AvatarFallback className="bg-slate-700 text-white text-xs">
                            {msg.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))
                )}
                {aiTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 ring-2 ring-indigo-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-700/50 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </Card>

          {/* Input Area */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4 space-y-3">
              {/* File Preview */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-700">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 rounded-lg">
                      {getFileIcon(file.mimeType)}
                      <span className="text-sm text-slate-300 max-w-[150px] truncate">{file.name}</span>
                      <button
                        onClick={() => removeFile(i)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt,.md,.json"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!isConnected || isUploading}
                  className="text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
                </Button>
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入消息... (@ai 召唤 AI 助手)"
                  disabled={!isConnected}
                  className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500"
                />
                <Button
                  onClick={askAI}
                  disabled={!isConnected || !inputMessage.trim()}
                  variant="ghost"
                  size="icon"
                  className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                  title="向 AI 提问"
                >
                  <Sparkles className="w-5 h-5" />
                </Button>
                <Button
                  onClick={sendMessage}
                  disabled={!isConnected || (!inputMessage.trim() && files.length === 0)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Online Users */}
        <Card className="w-64 bg-slate-800/50 border-slate-700/50 backdrop-blur-xl hidden lg:block">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              在线用户 ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {users.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">暂无在线用户</p>
            ) : (
              users.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
                      {u.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">{u.username}</div>
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <Circle className="w-2 h-2 fill-green-400" />
                      在线
                    </div>
                  </div>
                </div>
              ))
            )}

            <Separator className="my-4 bg-slate-700" />

            {/* AI Assistant */}
            <div className="flex items-center gap-3 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">🤖 Super Z</div>
                <div className="flex items-center gap-1 text-xs text-indigo-400">
                  <Sparkles className="w-3 h-3" />
                  AI 助手
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              输入 @ai 或点击 ✨ 与 AI 互动
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
