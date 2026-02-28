/**
 * WebSocket Chat Room Service with AI Integration
 *
 * A real-time chat service built with Socket.io
 * Features:
 * - User join/leave notifications
 * - Message broadcasting
 * - Online user list
 * - AI assistant integration (Super Z)
 * - Message persistence to database
 * - File attachment support
 *
 * Port: 3003
 */

import { createServer } from 'http'
import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'

const PORT = process.env.WS_PORT || 3003
const prisma = new PrismaClient()

const httpServer = createServer()
const io = new Server(httpServer, {
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  pingTimeout: 60000,
  pingInterval: 25000,
})

interface User {
  id: string
  username: string
  avatar?: string
}

interface FileAttachment {
  name: string
  url: string
  size: number
  mimeType: string
}

interface Message {
  id: string
  username: string
  content: string
  timestamp: Date
  type: 'user' | 'system' | 'ai'
  files?: FileAttachment[]
}

interface ChatHistory {
  role: 'user' | 'assistant'
  content: string
}

const users = new Map<string, User>()
const messageHistory: ChatHistory[] = []
const MAX_HISTORY = 20

const generateMessageId = () => Math.random().toString(36).substr(2, 9)

const createSystemMessage = (content: string): Message => ({
  id: generateMessageId(),
  username: 'System',
  content,
  timestamp: new Date(),
  type: 'system'
})

const createUserMessage = (username: string, content: string, files?: FileAttachment[]): Message => ({
  id: generateMessageId(),
  username,
  content,
  timestamp: new Date(),
  type: 'user',
  files
})

const createAIMessage = (content: string): Message => ({
  id: generateMessageId(),
  username: '🤖 Super Z',
  content,
  timestamp: new Date(),
  type: 'ai'
})

// AI API 调用函数
async function callAI(userMessage: string, history: ChatHistory[]): Promise<string> {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...history, { role: 'user', content: userMessage }]
      })
    })

    if (!response.ok) {
      throw new Error('AI API error')
    }

    const data = await response.json()
    return data.content || '抱歉，我暂时无法回复。'
  } catch (error) {
    console.error('AI call error:', error)
    return '抱歉，AI 服务暂时不可用，请稍后再试。'
  }
}

// 保存消息到数据库
async function saveMessageToDB(message: Message) {
  try {
    // 查找或创建默认聊天室
    let room = await prisma.chatRoom.findFirst({
      where: { name: 'general' }
    })

    if (!room) {
      room = await prisma.chatRoom.create({
        data: {
          name: 'general',
          description: 'Default chat room',
          isPublic: true
        }
      })
    }

    // 创建消息
    await prisma.chatMessage.create({
      data: {
        content: message.content,
        type: message.type.toUpperCase(),
        roomId: room.id,
        files: message.files ? {
          create: message.files.map(f => ({
            name: f.name,
            url: f.url,
            size: f.size,
            mimeType: f.mimeType
          }))
        } : undefined
      }
    })
  } catch (error) {
    console.error('Save message error:', error)
  }
}

// 加载历史消息
async function loadHistory(): Promise<Message[]> {
  try {
    let room = await prisma.chatRoom.findFirst({
      where: { name: 'general' }
    })

    if (!room) return []

    const messages = await prisma.chatMessage.findMany({
      where: { roomId: room.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { files: true }
    })

    return messages.reverse().map(m => ({
      id: m.id,
      username: m.type === 'AI' ? '🤖 Super Z' : m.type === 'SYSTEM' ? 'System' : 'User',
      content: m.content,
      timestamp: m.createdAt,
      type: m.type.toLowerCase() as 'user' | 'system' | 'ai',
      files: m.files.map(f => ({
        name: f.name,
        url: f.url,
        size: f.size,
        mimeType: f.mimeType
      }))
    }))
  } catch (error) {
    console.error('Load history error:', error)
    return []
  }
}

io.on('connection', async (socket) => {
  console.log(`[${new Date().toISOString()}] User connected: ${socket.id}`)

  // 发送历史消息
  const history = await loadHistory()
  socket.emit('history', history)

  // 测试事件
  socket.on('test', (data) => {
    console.log('Received test message:', data)
    socket.emit('test-response', {
      message: 'Server received test message',
      data: data,
      timestamp: new Date().toISOString()
    })
  })

  // 用户加入
  socket.on('join', async (data: { username: string }) => {
    const { username } = data

    const user: User = {
      id: socket.id,
      username
    }

    users.set(socket.id, user)

    const joinMessage = createSystemMessage(`🎉 ${username} 加入了聊天室`)
    io.emit('user-joined', { user, message: joinMessage })

    const usersList = Array.from(users.values())
    socket.emit('users-list', { users: usersList })

    // 保存系统消息
    await saveMessageToDB(joinMessage)

    console.log(`[${new Date().toISOString()}] ${username} joined, online users: ${users.size}`)
  })

  // 消息事件
  socket.on('message', async (data: { content: string; username: string; files?: FileAttachment[] }) => {
    const { content, username, files } = data
    const user = users.get(socket.id)

    if (user && user.username === username) {
      const message = createUserMessage(username, content, files)
      io.emit('message', message)

      // 保存用户消息
      await saveMessageToDB(message)

      // 更新聊天历史
      messageHistory.push({ role: 'user', content })
      if (messageHistory.length > MAX_HISTORY) {
        messageHistory.shift()
      }

      console.log(`[${new Date().toISOString()}] ${username}: ${content}`)

      // 检查是否需要 AI 回复
      const aiTriggers = ['@ai', '@super', '@z', 'super z', 'Super Z', 'AI', 'ai']
      const shouldReplyAI = aiTriggers.some(trigger =>
        content.toLowerCase().includes(trigger.toLowerCase())
      )

      if (shouldReplyAI) {
        // 发送 AI 正在输入提示
        io.emit('ai-typing', { isTyping: true })

        // 调用 AI
        const aiResponse = await callAI(content, messageHistory)
        const aiMessage = createAIMessage(aiResponse)

        io.emit('message', aiMessage)

        // 保存 AI 消息
        await saveMessageToDB(aiMessage)

        // 更新历史
        messageHistory.push({ role: 'assistant', content: aiResponse })

        // 停止输入提示
        io.emit('ai-typing', { isTyping: false })

        console.log(`[${new Date().toISOString()}] AI replied to ${username}`)
      }
    }
  })

  // 直接请求 AI 回复
  socket.on('ask-ai', async (data: { content: string; username: string }) => {
    const { content, username } = data

    io.emit('ai-typing', { isTyping: true })

    messageHistory.push({ role: 'user', content })
    const aiResponse = await callAI(content, messageHistory)
    const aiMessage = createAIMessage(aiResponse)

    io.emit('message', aiMessage)
    await saveMessageToDB(aiMessage)

    messageHistory.push({ role: 'assistant', content: aiResponse })
    io.emit('ai-typing', { isTyping: false })

    console.log(`[${new Date().toISOString()}] AI answered ${username}`)
  })

  // 断开连接
  socket.on('disconnect', async () => {
    const user = users.get(socket.id)

    if (user) {
      users.delete(socket.id)
      const leaveMessage = createSystemMessage(`👋 ${user.username} 离开了聊天室`)
      io.emit('user-left', { user: { id: socket.id, username: user.username }, message: leaveMessage })

      await saveMessageToDB(leaveMessage)

      console.log(`[${new Date().toISOString()}] ${user.username} left, online users: ${users.size}`)
    } else {
      console.log(`[${new Date().toISOString()}] User disconnected: ${socket.id}`)
    }
  })

  // 错误处理
  socket.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] Socket error (${socket.id}):`, error)
  })
})

// 启动服务器
httpServer.listen(PORT, () => {
  console.log(``)
  console.log(`🚀 WebSocket Chat Service Started`)
  console.log(`📡 Listening on port ${PORT}`)
  console.log(`🔗 WebSocket URL: ws://localhost:${PORT}`)
  console.log(`🤖 AI Assistant: Super Z`)
  console.log(``)
})

// 优雅关闭
const shutdown = async (signal: string) => {
  console.log(`\n[${new Date().toISOString()}] Received ${signal}, shutting down...`)
  await prisma.$disconnect()
  httpServer.close(() => {
    console.log(`[${new Date().toISOString()}] WebSocket server closed`)
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
