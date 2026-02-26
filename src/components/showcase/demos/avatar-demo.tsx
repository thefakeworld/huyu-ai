'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check, User } from 'lucide-react'

const codeExamples = {
  basic: `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  sizes: `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

<Avatar className="h-8 w-8"><AvatarFallback>SM</AvatarFallback></Avatar>
<Avatar className="h-10 w-10"><AvatarFallback>MD</AvatarFallback></Avatar>
<Avatar className="h-14 w-14"><AvatarFallback>LG</AvatarFallback></Avatar>`,
  group: `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

<div className="flex -space-x-4">
  <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>+3</AvatarFallback></Avatar>
</div>`,
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group">
      <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={copyCode}>
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  )
}

export function AvatarDemo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>Avatar 用于展示用户头像，支持图片和 fallback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/invalid-url.png" />
              <AvatarFallback>USER</AvatarFallback>
            </Avatar>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">尺寸规格</CardTitle>
          <CardDescription>通过 className 自定义头像大小</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">XS</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-sm">SM</AvatarFallback>
            </Avatar>
            <Avatar className="h-10 w-10">
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg">LG</AvatarFallback>
            </Avatar>
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">XL</AvatarFallback>
            </Avatar>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.sizes} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">头像组</CardTitle>
          <CardDescription>多个头像堆叠显示</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex -space-x-4">
            <Avatar className="border-2 border-background">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background bg-muted">
              <AvatarFallback className="text-xs">+5</AvatarFallback>
            </Avatar>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.group} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">用户列表</CardTitle>
          <CardDescription>实际应用场景</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: '张三', email: 'zhangsan@example.com', role: '管理员' },
              { name: '李四', email: 'lisi@example.com', role: '编辑' },
              { name: '王五', email: 'wangwu@example.com', role: '用户' },
            ].map((user) => (
              <div key={user.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                <Avatar>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">{user.role}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
