import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// 支持的文件类型
const ALLOWED_TYPES: Record<string, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  text: ['text/plain', 'text/markdown', 'text/csv'],
  code: ['application/json', 'text/javascript', 'text/typescript', 'text/html', 'text/css'],
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: '没有上传文件' },
        { status: 400 }
      )
    }

    // 确保上传目录存在
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadedFiles = []
    const errors = []

    for (const file of files) {
      // 检查文件大小
      if (file.size > MAX_FILE_SIZE) {
        errors.push({
          name: file.name,
          error: `文件大小超过限制 (最大 ${MAX_FILE_SIZE / 1024 / 1024}MB)`
        })
        continue
      }

      // 检查文件类型
      const allAllowedTypes = Object.values(ALLOWED_TYPES).flat()
      if (!allAllowedTypes.includes(file.type)) {
        errors.push({
          name: file.name,
          error: '不支持的文件类型'
        })
        continue
      }

      // 生成唯一文件名
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const ext = file.name.split('.').pop() || 'bin'
      const fileName = `${timestamp}-${randomStr}.${ext}`
      const filePath = path.join(uploadDir, fileName)

      // 写入文件
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      // 获取文件类型分类
      let fileType = 'other'
      for (const [type, mimes] of Object.entries(ALLOWED_TYPES)) {
        if (mimes.includes(file.type)) {
          fileType = type
          break
        }
      }

      uploadedFiles.push({
        name: file.name,
        url: `/uploads/${fileName}`,
        size: file.size,
        mimeType: file.type,
        type: fileType,
      })
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      errors: errors.length > 0 ? errors : undefined,
    })

  } catch (error) {
    console.error('Upload Error:', error)
    return NextResponse.json(
      { error: '文件上传失败' },
      { status: 500 }
    )
  }
}

// 获取上传历史
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    if (!existsSync(uploadDir)) {
      return NextResponse.json({ files: [] })
    }

    // 这里可以扩展为从数据库读取
    return NextResponse.json({
      files: [],
      message: '请使用数据库查询上传历史'
    })

  } catch (error) {
    console.error('Get Uploads Error:', error)
    return NextResponse.json(
      { error: '获取上传文件失败' },
      { status: 500 }
    )
  }
}
