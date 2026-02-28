import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// OpenClaw Gateway 配置
const OPENCLAW_GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:18789/v1'
const OPENCLAW_GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN || '319065520f8b1fdcb808754eef1530e6f29133de6bc8b09f'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, model = 'moonshotai/Kimi-K2.5', stream = true } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      )
    }

    // 系统提示词
    const systemPrompt: ChatMessage = {
      role: 'system',
      content: `你是 Super Z AI 助手，一个友好、智能的聊天机器人。
你正在一个多人聊天室中与用户互动。
请用简洁、友好的方式回复用户。
如果用户问的问题很复杂，请给出结构化的回答。
你可以使用 markdown 格式来美化你的回复。
记住，你的名字是 Super Z，你是由 Z.ai 开发的 AI 助手。`
    }

    const allMessages = [systemPrompt, ...messages]

    // 创建流式响应
    const encoder = new TextEncoder()

    const streamResponse = new ReadableStream({
      async start(controller) {
        try {
          const zai = await ZAI.create()

          const completion = await zai.chat.completions.create({
            model: model,
            messages: allMessages.map(m => ({
              role: m.role as 'system' | 'user' | 'assistant',
              content: m.content
            })),
            stream: true,
            temperature: 0.7,
            max_tokens: 2000,
          })

          let fullContent = ''

          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              fullContent += content
              // 发送 SSE 格式的数据
              const data = JSON.stringify({ content, done: false })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }

          // 发送完成信号
          const doneData = JSON.stringify({ content: '', done: true, fullContent })
          controller.enqueue(encoder.encode(`data: ${doneData}\n\n`))
          controller.close()

        } catch (error) {
          console.error('AI Chat Error:', error)
          const errorData = JSON.stringify({
            error: 'AI 服务暂时不可用，请稍后重试',
            done: true
          })
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(streamResponse, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: '聊天服务暂时不可用' },
      { status: 500 }
    )
  }
}

// 非流式响应接口（备用）
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, model = 'moonshotai/Kimi-K2.5' } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      )
    }

    const systemPrompt: ChatMessage = {
      role: 'system',
      content: `你是 Super Z AI 助手，一个友好、智能的聊天机器人。
你正在一个多人聊天室中与用户互动。
请用简洁、友好的方式回复用户。`
    }

    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      model: model,
      messages: [systemPrompt, ...messages].map(m => ({
        role: m.role as 'system' | 'user' | 'assistant',
        content: m.content
      })),
      stream: false,
      temperature: 0.7,
      max_tokens: 2000,
    })

    const content = completion.choices[0]?.message?.content || '抱歉，我无法生成回复。'

    return NextResponse.json({
      success: true,
      content,
      model: completion.model,
      usage: completion.usage
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: '聊天服务暂时不可用' },
      { status: 500 }
    )
  }
}
