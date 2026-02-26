'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check, X, Plus } from 'lucide-react'

const codeExamples = {
  variants: `import { Badge } from '@/components/ui/badge'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
  usage: `import { Badge } from '@/components/ui/badge'

// 状态标签
<Badge>进行中</Badge>
<Badge variant="secondary">待审核</Badge>
<Badge variant="destructive">已拒绝</Badge>

// 计数标签
<Badge variant="secondary">12</Badge>
<Badge variant="destructive">99+</Badge>`,
  interactive: `import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

// 可关闭标签
<Badge className="gap-1 pr-1">
  标签 <X className="w-3 h-3 cursor-pointer" />
</Badge>`,
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

export function BadgeDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Next.js'])

  return (
    <div className="space-y-8">
      {/* 变体 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">变体样式</CardTitle>
          <CardDescription>Badge 支持 4 种预设变体</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.variants} />
        </CardContent>
      </Card>

      {/* 使用场景 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">使用场景</CardTitle>
          <CardDescription>常见的 Badge 应用场景</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">状态标签</p>
              <div className="flex flex-wrap gap-2">
                <Badge>进行中</Badge>
                <Badge variant="secondary">待审核</Badge>
                <Badge variant="destructive">已拒绝</Badge>
                <Badge variant="outline">草稿</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">计数标签</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">12</Badge>
                <Badge variant="destructive">99+</Badge>
                <Badge>New</Badge>
              </div>
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.usage} />
        </CardContent>
      </Card>

      {/* 交互式 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">交互式标签</CardTitle>
          <CardDescription>可删除的标签列表</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                {tag}
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setTags(tags.filter(t => t !== tag))} />
              </Badge>
            ))}
            {tags.length === 0 && (
              <span className="text-sm text-muted-foreground">所有标签已删除</span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => setTags(['React', 'TypeScript', 'Next.js'])} disabled={tags.length === 3}>
            <Plus className="w-4 h-4 mr-1" />重置标签
          </Button>
          <Separator />
          <CodeBlock code={codeExamples.interactive} />
        </CardContent>
      </Card>
    </div>
  )
}
