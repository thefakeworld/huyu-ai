'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/stores/app-store'
import { useAuthStore } from '@/stores/auth-store'
import { ArrowLeft, Send, Users, Wifi, WifiOff, MessageSquare, User as UserIcon, Circle } from 'lucide-react'

type User = { id: string; username: string }
type Message = { id: string; username: string; content: string; timestamp: Date | string; type: 'user' | 'system' }

export function WebSocketDemo() {
  const { setView, currentDemo } = useAppStore()
  const { user, isAuthenticated } = useAuthStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isUsernameSet, setIsUsernameSet] = useState(false)
  const [socket, setSocket] = useState<{ emit: (event: string, data: unknown) => void; disconnect: () => void } | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [connectionError, setConnectionError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated && user?.name && !username) setUsername(user.name)
  }, [isAuthenticated, user, username])

  useEffect(() => {
    const initSocket = async () => {
      try {
        const { io } = await import('socket.io-client')
        const socketInstance = io('/?XTransformPort=3003', { transports: ['websocket', 'polling'], forceNew: true, reconnection: true, reconnectionAttempts: 5, reconnectionDelay: 1000, timeout: 10000 })
        setSocket(socketInstance)
        socketInstance.on('connect', () => { setIsConnected(true); setConnectionError(null) })
        socketInstance.on('disconnect', () => setIsConnected(false))
        socketInstance.on('connect_error', () => { setConnectionError('无法连接到聊天服务器'); setIsConnected(false) })
        socketInstance.on('message', (msg: Message) => setMessages(prev => [...prev, msg]))
        socketInstance.on('user-joined', (data: { user: User; message: Message }) => {
          setMessages(prev => [...prev, data.message])
          setUsers(prev => prev.find(u => u.id === data.user.id) ? prev : [...prev, data.user])
        })
        socketInstance.on('user-left', (data: { user: User; message: Message }) => {
          setMessages(prev => [...prev, data.message])
          setUsers(prev => prev.filter(u => u.id !== data.user.id))
        })
        socketInstance.on('users-list', (data: { users: User[] }) => setUsers(data.users))
      } catch {
        setConnectionError('无法加载聊天组件')
      }
    }
    initSocket()
    return () => { if (socket) socket.disconnect() }
  }, [])

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

  const handleBack = () => {
    if (socket) socket.disconnect()
    setView('examples')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}><ArrowLeft className="w-5 h-5" /></Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />{currentDemo?.name || 'WebSocket 聊天室'}
            </h1>
            <p className="text-muted-foreground text-sm">实时多人聊天应用</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? 'default' : 'secondary'} className="gap-1">
            {isConnected ? <><Wifi className="w-3 h-3" />已连接</> : <><WifiOff className="w-3 h-3" />未连接</>}
          </Badge>
          <Badge variant="outline" className="gap-1"><Users className="w-3 h-3" />{users.length} 在线</Badge>
        </div>
      </div>

      {connectionError && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="py-3"><p className="text-destructive text-sm">{connectionError}</p></CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3"><CardTitle className="text-base">聊天室</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {!isUsernameSet ? (
              <div className="space-y-4 py-8">
                <div className="text-center space-y-2">
                  <UserIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                  <h3 className="font-medium">加入聊天室</h3>
                  <p className="text-sm text-muted-foreground">输入您的昵称开始聊天</p>
                </div>
                <div className="flex gap-2 max-w-sm mx-auto">
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入昵称..." disabled={!isConnected} />
                  <Button onClick={handleJoin} disabled={!isConnected || !username.trim()}>加入</Button>
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
                            <div className={`px-2 py-0.5 rounded text-xs font-medium ${msg.type === 'system' ? 'bg-blue-100 text-blue-700' : 'bg-muted'}`}>{msg.username}</div>
                            <div className="flex-1"><p className={`text-sm ${msg.type === 'system' ? 'text-blue-600 italic' : ''}`}>{msg.content}</p></div>
                            <span className="text-xs text-muted-foreground shrink-0">{new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <Separator className="my-2" />
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入消息..." disabled={!isConnected} className="flex-1" />
                  <Button onClick={sendMessage} disabled={!isConnected || !inputMessage.trim()}><Send className="w-4 h-4" /></Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Users className="w-4 h-4" />在线用户</CardTitle></CardHeader>
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

      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>技术栈: Socket.io + React</span><span>•</span><span>实时双向通信</span><span>•</span><span>自动重连</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
