'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check, Search, Mail, Lock, Eye, EyeOff } from 'lucide-react'

const codeExamples = {
  basic: `import { Input } from '@/components/ui/input'

<Input placeholder="请输入内容..." />
<Input type="email" placeholder="邮箱地址" />
<Input type="password" placeholder="密码" />`,
  withIcon: `import { Input } from '@/components/ui/input'
import { Search, Mail } from 'lucide-react'

// 搜索框
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <Input placeholder="搜索..." className="pl-10" />
</div>`,
  states: `import { Input } from '@/components/ui/input'

<Input disabled placeholder="禁用状态" />
<Input value="只读内容" readOnly className="bg-muted" />`,
  withLabel: `import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="email">邮箱</Label>
  <Input id="email" type="email" placeholder="your@email.com" />
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

export function InputDemo() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-8">
      {/* 基础类型 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础类型</CardTitle>
          <CardDescription>Input 支持所有原生 HTML input 类型</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 max-w-md">
            <Input placeholder="默认文本输入" />
            <Input type="email" placeholder="邮箱地址 (email)" />
            <Input type="number" placeholder="数字输入 (number)" />
            <Input type="password" placeholder="密码输入 (password)" />
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 带图标 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">带图标输入框</CardTitle>
          <CardDescription>配合图标增强用户体验</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="搜索..." className="pl-10" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="邮箱地址" className="pl-10" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type={showPassword ? "text" : "password"} placeholder="密码" className="pl-10 pr-10" />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.withIcon} />
        </CardContent>
      </Card>

      {/* 状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">交互状态</CardTitle>
          <CardDescription>Input 支持禁用和只读状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 max-w-md">
            <Input disabled placeholder="禁用状态" />
            <Input value="只读内容" readOnly className="bg-muted" />
          </div>
          <Separator />
          <CodeBlock code={codeExamples.states} />
        </CardContent>
      </Card>

      {/* 带标签 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">配合 Label</CardTitle>
          <CardDescription>表单中的标准用法</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="name">用户名</Label>
              <Input id="name" placeholder="请输入用户名" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.withLabel} />
        </CardContent>
      </Card>
    </div>
  )
}
