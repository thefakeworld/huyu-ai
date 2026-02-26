'use client'

import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Copy, Check } from 'lucide-react'

const codeExamples = {
  basic: `import { Skeleton } from '@/components/ui/skeleton'

<Skeleton className="h-4 w-48" />  // 文本
<Skeleton className="h-12 w-12 rounded-full" />  // 头像
<Skeleton className="h-32 w-full" />  // 图片`,
  card: `import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

<Card>
  <CardHeader className="gap-2">
    <Skeleton className="h-5 w-1/3" />
    <Skeleton className="h-4 w-1/2" />
  </CardHeader>
  <CardContent className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </CardContent>
</Card>`,
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

export function SkeletonDemo() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>Skeleton 用于内容加载时的占位显示</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">卡片骨架屏</CardTitle>
          <CardDescription>模拟卡片加载状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button variant="outline" size="sm" onClick={() => setLoading(true)}>
              加载中
            </Button>
            <Button variant="outline" size="sm" onClick={() => setLoading(false)}>
              已加载
            </Button>
          </div>

          <Card className="max-w-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              {loading ? (
                <>
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </>
              ) : (
                <>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">shadcn</CardTitle>
                    <CardDescription>@shadcn_ui</CardDescription>
                  </div>
                </>
              )}
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  这是一个卡片组件的示例内容，用于展示加载前后的状态变化。
                </p>
              )}
            </CardContent>
          </Card>
          <Separator />
          <CodeBlock code={codeExamples.card} />
        </CardContent>
      </Card>
    </div>
  )
}
