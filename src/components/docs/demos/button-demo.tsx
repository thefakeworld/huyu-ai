'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check, Loader2, Mail, ChevronRight, Heart } from 'lucide-react'

const codeExamples = {
  variants: `import { Button } from '@/components/ui/button'

// 变体样式
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
  sizes: `import { Button } from '@/components/ui/button'

// 尺寸
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Heart className="w-4 h-4" /></Button>`,
  states: `import { Button } from '@/components/ui/button'

// 状态
<Button disabled>禁用状态</Button>
<Button><Loader2 className="w-4 h-4 mr-2 animate-spin" />加载中</Button>`,
  withIcon: `import { Button } from '@/components/ui/button'
import { Mail, ChevronRight } from 'lucide-react'

// 带图标
<Button><Mail className="w-4 h-4 mr-2" />发送邮件</Button>
<Button>继续<ChevronRight className="w-4 h-4 ml-2" /></Button>`,
}

function CodeBlock({ code, id }: { code: string; id: string }) {
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyCode}
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  )
}

export function ButtonDemo() {
  return (
    <div className="space-y-8">
      {/* 变体演示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">变体样式</CardTitle>
          <CardDescription>Button 支持 6 种预设变体样式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.variants} id="variants" />
        </CardContent>
      </Card>

      {/* 尺寸演示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">尺寸规格</CardTitle>
          <CardDescription>Button 支持 4 种尺寸规格</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Heart className="w-4 h-4" /></Button>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.sizes} id="sizes" />
        </CardContent>
      </Card>

      {/* 状态演示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">交互状态</CardTitle>
          <CardDescription>Button 支持禁用和加载状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button disabled>禁用状态</Button>
            <Button><Loader2 className="w-4 h-4 mr-2 animate-spin" />加载中</Button>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.states} id="states" />
        </CardContent>
      </Card>

      {/* 带图标演示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">带图标</CardTitle>
          <CardDescription>Button 可以配合 lucide-react 图标使用</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button><Mail className="w-4 h-4 mr-2" />发送邮件</Button>
            <Button>继续<ChevronRight className="w-4 h-4 ml-2" /></Button>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.withIcon} id="withIcon" />
        </CardContent>
      </Card>
    </div>
  )
}
