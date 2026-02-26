'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth-store'
import Link from 'next/link'
import { Send, Users, Wifi, WifiOff, MessageSquare, User as UserIcon, Circle, LogIn, AlertTriangle } from 'lucide-react'

type User = { id: string; username: string }
type Message = { id: string; username: string; content: string; timestamp: Date | string; type: 'user' | 'system' }

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
        socketInstance = io('/?XTransformPort=3003', {
          transports: ['websocket', 'polling'],
          forceNew: true,
          reconnection: true,
          reconnectionAttempts: 3,
          reconnectionDelay: 1000,
          timeout: 8000
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

  const handleJoin = () => {
    if (socket && username.trim() && isConnected) {
      socket.emit('join', { username: username.trim() })
      setIsUsernameSet(true)
    }
  }

  const sendMessage = () => {
    if (socket && inputMessage.trim() && username.trim()) {
      socket.emit('message', { content: inputMessage.trim(), username: username.trim() })
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isUsernameSet) {
        sendMessage()
      } else {
        handleJoin()
      }
    }
  }

  // 未登录状态
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="w-8 h-8 text-primary" />
            </div>
            <CardTitle>需要登录</CardTitle>
            <CardDescription>使用聊天室功能需要先登录账户</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              登录后您可以体验实时多人聊天功能，与其他用户互动交流
            </p>
            <Button asChild className="w-full">
              <Link href="/login"><LogIn className="w-4 h-4 mr-2" />前往登录</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
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
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full space-y-4">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
              <CardTitle className="text-yellow-800">服务暂时不可用</CardTitle>
              <CardDescription className="text-yellow-700">聊天服务器当前未启动</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-yellow-700 text-center">
                这是一个演示案例，WebSocket服务器需要单独启动。
              </p>
              <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/examples">返回案例广场</Link>
                </Button>
                <Button className="flex-1" onClick={() => window.location.reload()}>
                  重新连接
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">如何启动聊天服务器</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-sm bg-muted p-3 rounded block">
                cd examples/websocket && bun run server.ts
              </code>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // 正常聊天界面
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/examples"><MessageSquare className="w-5 h-5" /></Link>
            </Button>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                WebSocket 聊天室
              </h1>
              <p className="text-xs text-muted-foreground">实时多人聊天应用</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? 'default' : 'secondary'} className="gap-1">
              {isConnected ? <><Wifi className="w-3 h-3" />已连接</> : <><WifiOff className="w-3 h-3" />连接中...</>}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Users className="w-3 h-3" />{users.length} 在线
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-4">
            <Card className="lg:col-span-3">
              <CardHeader className="pb-3"><CardTitle className="text-base">聊天室</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {!isUsernameSet ? (
                  <div className="space-y-4 py-8">
                    <div className="text-center space-y-2">
                      <UserIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                      <h3 className="font-medium">加入聊天室</h3>
                      <p className="text-sm text-muted-foreground">
                        欢迎 {user?.name || '用户'}，点击加入开始聊天
                      </p>
                    </div>
                    <div className="flex gap-2 max-w-sm mx-auto">
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="输入昵称..."
                        disabled={!isConnected}
                      />
                      <Button onClick={handleJoin} disabled={!isConnected || !username.trim()}>
                        加入
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="h-80 w-full border rounded-md p-4">
                      <div className="space-y-3">
                        {messages.length === 0 ? (
                          <div className="text-center py-8">
                            <MessageSquare className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">暂无消息，发送第一条消息吧！</p>
                          </div>
                        ) : (
                          messages.map((msg) => (
                            <div key={msg.id} className="space-y-1">
                              <div className="flex items-start gap-2">
                                <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  msg.type === 'system' ? 'bg-blue-100 text-blue-700' : 'bg-muted'
                                }`}>
                                  {msg.username}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm ${msg.type === 'system' ? 'text-blue-600 italic' : ''}`}>
                                    {msg.content}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0">
                                  {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <Separator className="my-2" />
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="输入消息..."
                        disabled={!isConnected}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} disabled={!isConnected || !inputMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />在线用户
                </CardTitle>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">暂无在线用户</p>
                ) : (
                  <div className="space-y-2">
                    {users.map((u) => (
                      <div key={u.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                        <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                        <span className="text-sm truncate">{u.username}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50 mt-4">
            <CardContent className="py-4">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>技术栈: Socket.io + React</span>
                <span>•</span>
                <span>实时双向通信</span>
                <span>•</span>
                <span>自动重连</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
