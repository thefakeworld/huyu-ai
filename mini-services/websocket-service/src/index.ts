/**
 * WebSocket Chat Room Service
 * 
 * A real-time chat service built with Socket.io
 * Provides: user join/leave notifications, message broadcasting, online user list
 * 
 * Port: 3003
 */

import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = process.env.WS_PORT || 3003

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
}

interface Message {
  id: string
  username: string
  content: string
  timestamp: Date
  type: 'user' | 'system'
}

const users = new Map<string, User>()

const generateMessageId = () => Math.random().toString(36).substr(2, 9)

const createSystemMessage = (content: string): Message => ({
  id: generateMessageId(),
  username: 'System',
  content,
  timestamp: new Date(),
  type: 'system'
})

const createUserMessage = (username: string, content: string): Message => ({
  id: generateMessageId(),
  username,
  content,
  timestamp: new Date(),
  type: 'user'
})

io.on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}] User connected: ${socket.id}`)

  // Test event handler
  socket.on('test', (data) => {
    console.log('Received test message:', data)
    socket.emit('test-response', {
      message: 'Server received test message',
      data: data,
      timestamp: new Date().toISOString()
    })
  })

  // User join event
  socket.on('join', (data: { username: string }) => {
    const { username } = data

    const user: User = {
      id: socket.id,
      username
    }

    users.set(socket.id, user)

    const joinMessage = createSystemMessage(`${username} joined the chat room`)
    io.emit('user-joined', { user, message: joinMessage })

    const usersList = Array.from(users.values())
    socket.emit('users-list', { users: usersList })

    console.log(`[${new Date().toISOString()}] ${username} joined, online users: ${users.size}`)
  })

  // Message event
  socket.on('message', (data: { content: string; username: string }) => {
    const { content, username } = data
    const user = users.get(socket.id)

    if (user && user.username === username) {
      const message = createUserMessage(username, content)
      io.emit('message', message)
      console.log(`[${new Date().toISOString()}] ${username}: ${content}`)
    }
  })

  // Disconnect event
  socket.on('disconnect', () => {
    const user = users.get(socket.id)

    if (user) {
      users.delete(socket.id)
      const leaveMessage = createSystemMessage(`${user.username} left the chat room`)
      io.emit('user-left', { user: { id: socket.id, username: user.username }, message: leaveMessage })
      console.log(`[${new Date().toISOString()}] ${user.username} left, online users: ${users.size}`)
    } else {
      console.log(`[${new Date().toISOString()}] User disconnected: ${socket.id}`)
    }
  })

  // Error event
  socket.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] Socket error (${socket.id}):`, error)
  })
})

// Start server
httpServer.listen(PORT, () => {
  console.log(``)
  console.log(`🚀 WebSocket Chat Service Started`)
  console.log(`📡 Listening on port ${PORT}`)
  console.log(`🔗 WebSocket URL: ws://localhost:${PORT}`)
  console.log(``)
})

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`\n[${new Date().toISOString()}] Received ${signal}, shutting down...`)
  httpServer.close(() => {
    console.log(`[${new Date().toISOString()}] WebSocket server closed`)
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
