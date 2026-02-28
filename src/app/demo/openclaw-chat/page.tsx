'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/**
 * OpenClaw Chat - SSE 心跳测试页面
 * 
 * 功能：
 * - 实时显示 SSE 连接状态
 * - 显示心跳消息计数
 * - 消息日志滚动显示
 * - 支持手动连接/断开
 */
export default function OpenClawChatPage() {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const [messages, setMessages] = useState<string[]>([])
  const [heartbeatCount, setHeartbeatCount] = useState(0)
  const eventSourceRef = useRef<EventSource | null>(null)

  const addMessage = useCallback((msg: string) => {
    setMessages(prev => [...prev.slice(-50), `[${new Date().toLocaleTimeString()}] ${msg}`])
  }, [])

  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }

    setStatus('connecting')
    addMessage('🔄 正在连接 SSE...')

    const eventSource = new EventSource('/demo/openclaw-chat/api/sse')
    eventSourceRef.current = eventSource

    eventSource.onopen = () => {
      setStatus('connected')
      addMessage('✅ SSE 连接已建立')
    }

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data.type === 'ping') {
          setHeartbeatCount(data.counter)
          addMessage(`💓 心跳 #${data.counter} - ${new Date(data.timestamp).toLocaleTimeString()}`)
        } else if (data.type === 'connected') {
          addMessage(`🚀 连接成功 - ${new Date(data.timestamp).toLocaleTimeString()}`)
        } else {
          addMessage(`📨 ${JSON.stringify(data)}`)
        }
      } catch {
        addMessage(`📨 原始消息: ${event.data}`)
      }
    }

    eventSource.onerror = () => {
      addMessage('❌ SSE 连接错误')
      setStatus('disconnected')
      eventSource.close()
    }
  }, [addMessage])

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    setStatus('disconnected')
    addMessage('🔌 已断开连接')
  }, [addMessage])

  useEffect(() => {
    const timer = setTimeout(() => {
      connectSSE()
    }, 0)

    return () => {
      clearTimeout(timer)
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    }
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'bg-green-500'
      case 'connecting': return 'bg-yellow-500'
      default: return 'bg-red-500'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'connected': return '已连接'
      case 'connecting': return '连接中...'
      default: return '已断开'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🦞</span>
          <h1 className="text-3xl font-bold">OpenClaw Chat</h1>
        </div>
        <p className="text-muted-foreground">
          SSE 心跳测试 - 每 10 秒自动发送心跳消息保持连接活跃
        </p>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">连接状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`} />
              <span className="font-medium">{getStatusText()}</span>
              <Badge variant="secondary">心跳: {heartbeatCount}</Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={connectSSE} 
                disabled={status === 'connected'}
                size="sm"
              >
                连接
              </Button>
              <Button 
                onClick={disconnect} 
                disabled={status !== 'connected'}
                variant="destructive"
                size="sm"
              >
                断开
              </Button>
              <Button 
                onClick={() => setMessages([])} 
                variant="outline"
                size="sm"
              >
                清空
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">消息日志</CardTitle>
          <CardDescription>实时显示 SSE 消息流</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900 rounded-lg p-4 min-h-[400px] max-h-[500px] overflow-auto">
            <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap break-all">
              {messages.length === 0 ? '等待消息...' : messages.join('\n')}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="pt-4">
          <div className="text-sm space-y-1">
            <p><strong>SSE 端点:</strong> <code className="bg-muted px-1 rounded">/demo/openclaw-chat/api/sse</code></p>
            <p><strong>心跳间隔:</strong> 10 秒</p>
            <p><strong>Gateway 代理:</strong> <code className="bg-muted px-1 rounded">/demo/openclaw-chat/api/gateway</code></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
