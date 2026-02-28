import { NextRequest } from 'next/server'

/**
 * OpenClaw Gateway SSE 代理 - 带心跳
 * 
 * 功能：
 * - 将 WebSocket Gateway 转换为 SSE 接口
 * - 自动进行 Gateway 认证
 * - 每 10 秒发送心跳保持连接
 * - 双向消息转发
 */
export async function GET(request: NextRequest) {
  const GATEWAY_URL = process.env.GATEWAY_URL || 'ws://127.0.0.1:18789'
  const GATEWAY_TOKEN = process.env.GATEWAY_TOKEN || ''

  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  // 启动连接
  ;(async () => {
    let ws: WebSocket | null = null
    let heartbeatInterval: Timer | null = null
    let messageCount = 0

    const cleanup = async () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval)
        heartbeatInterval = null
      }
      if (ws) {
        ws.close()
        ws = null
      }
    }

    const startHeartbeat = () => {
      heartbeatInterval = setInterval(async () => {
        try {
          messageCount++
          await writer.write(encoder.encode(': heartbeat\n\n'))
          await writer.write(encoder.encode(`data: ${JSON.stringify({
            type: 'ping',
            count: messageCount,
            timestamp: new Date().toISOString()
          })}\n\n`))
          console.log(`[Gateway SSE] Heartbeat #${messageCount} sent`)
        } catch {
          console.log('[Gateway SSE] Heartbeat failed')
          cleanup()
        }
      }, 10000)
    }

    const connect = async () => {
      try {
        console.log('[Gateway SSE] Connecting to:', GATEWAY_URL)
        ws = new WebSocket(GATEWAY_URL)

        ws.onopen = async () => {
          console.log('[Gateway SSE] Connected to Gateway')
          await writer.write(encoder.encode(`data: ${JSON.stringify({
            type: 'connected',
            timestamp: new Date().toISOString()
          })}\n\n`))

          if (GATEWAY_TOKEN) {
            ws?.send(JSON.stringify({
              jsonrpc: '2.0',
              method: 'auth',
              params: { token: GATEWAY_TOKEN }
            }))
          }

          startHeartbeat()
        }

        ws.onmessage = async (event) => {
          try {
            const data = typeof event.data === 'string' ? event.data : JSON.stringify(event.data)
            await writer.write(encoder.encode(`data: ${data}\n\n`))
          } catch (e) {
            console.error('[Gateway SSE] Failed to forward message:', e)
          }
        }

        ws.onerror = async () => {
          console.error('[Gateway SSE] WebSocket error')
          await writer.write(encoder.encode(`data: ${JSON.stringify({
            type: 'error',
            message: 'WebSocket error'
          })}\n\n`))
        }

        ws.onclose = async () => {
          console.log('[Gateway SSE] WebSocket closed')
          await writer.write(encoder.encode(`data: ${JSON.stringify({
            type: 'disconnected',
            timestamp: new Date().toISOString()
          })}\n\n`))
          cleanup()
        }

      } catch (error) {
        console.error('[Gateway SSE] Connection failed:', error)
        await writer.write(encoder.encode(`data: ${JSON.stringify({
          type: 'error',
          message: 'Connection failed'
        })}\n\n`))
        cleanup()
      }
    }

    request.signal.addEventListener('abort', async () => {
      console.log('[Gateway SSE] Client disconnected')
      await cleanup()
      try {
        await writer.close()
      } catch {
        // Ignore close errors
      }
    })

    await connect()
  })()

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'X-Accel-Buffering': 'no',
    },
  })
}
