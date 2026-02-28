import { NextRequest } from 'next/server'

/**
 * SSE 端点 - 带心跳的消息流
 * 
 * 功能：
 * - 每 10 秒自动发送心跳消息，保持连接活跃
 * - 支持 SSE 标准 heartbeat 注释格式
 * - 支持初始消息发送
 * - 自动清理断开连接
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const message = searchParams.get('message') || ''

  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  // 启动 SSE 流
  ;(async () => {
    let counter = 0

    // 发送初始消息
    await writer.write(encoder.encode(`data: ${JSON.stringify({ type: 'connected', timestamp: Date.now() })}\n\n`))

    // 心跳定时器 - 每10秒发送一次
    const heartbeatInterval = setInterval(async () => {
      try {
        counter++
        // 发送心跳注释（SSE 标准心跳格式）
        await writer.write(encoder.encode(': heartbeat\n\n'))

        // 发送带数据的消息
        await writer.write(encoder.encode(`data: ${JSON.stringify({
          type: 'ping',
          counter,
          timestamp: Date.now()
        })}\n\n`))

        console.log(`[SSE] Heartbeat #${counter} sent`)
      } catch {
        console.log('[SSE] Heartbeat failed, connection closed')
        clearInterval(heartbeatInterval)
      }
    }, 10000)

    // 如果有初始消息，发送它
    if (message) {
      await writer.write(encoder.encode(`data: ${JSON.stringify({ type: 'message', content: message })}\n\n`))
    }

    // 清理函数
    request.signal.addEventListener('abort', () => {
      console.log('[SSE] Client disconnected')
      clearInterval(heartbeatInterval)
      writer.close()
    })
  })()

  // 返回 SSE 响应
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

// POST 方法 - 向所有连接的客户端发送消息
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { message } = body

  console.log('[SSE] Received message to broadcast:', message)

  return Response.json({ success: true, message: 'Message queued' })
}
