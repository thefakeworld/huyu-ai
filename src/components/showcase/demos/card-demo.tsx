'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Copy, Check, Star, ArrowRight, MoreHorizontal } from 'lucide-react'

const codeExamples = {
  basic: `import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述内容</CardDescription>
  </CardHeader>
  <CardContent>
    <p>卡片主体内容</p>
  </CardContent>
</Card>`,
  withFooter: `import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

<Card>
  <CardHeader>
    <CardTitle>确认操作</CardTitle>
  </CardHeader>
  <CardContent>
    <p>确定要执行此操作吗？</p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="outline">取消</Button>
    <Button>确认</Button>
  </CardFooter>
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

export function CardDemo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础卡片</CardTitle>
          <CardDescription>Card 组件包含多个子组件协同使用</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>简单卡片</CardTitle>
                <CardDescription>这是卡片的描述内容</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">卡片主体内容区域</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>带操作卡片</span>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">支持在标题栏添加操作按钮</p>
              </CardContent>
            </Card>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">带底部卡片</CardTitle>
          <CardDescription>CardFooter 用于放置操作按钮</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>确认操作</CardTitle>
              <CardDescription>此操作无法撤销</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">确定要删除这个项目吗？删除后将无法恢复。</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline">取消</Button>
              <Button variant="destructive">删除</Button>
            </CardFooter>
          </Card>
          <Separator />
          <CodeBlock code={codeExamples.withFooter} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">产品卡片示例</CardTitle>
          <CardDescription>实际应用场景</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="group hover:shadow-lg transition-all">
              <CardHeader>
                <Badge className="w-fit mb-2">热门</Badge>
                <CardTitle>高级版</CardTitle>
                <CardDescription>适合专业用户</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">¥99<span className="text-sm font-normal text-muted-foreground">/月</span></div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">立即订阅<ArrowRight className="w-4 h-4" /></Button>
              </CardFooter>
            </Card>
            <Card className="border-primary group hover:shadow-lg transition-all">
              <CardHeader>
                <Badge className="w-fit mb-2">推荐</Badge>
                <CardTitle>企业版</CardTitle>
                <CardDescription>适合团队协作</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">¥299<span className="text-sm font-normal text-muted-foreground">/月</span></div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">立即订阅<ArrowRight className="w-4 h-4" /></Button>
              </CardFooter>
            </Card>
            <Card className="group hover:shadow-lg transition-all">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">基础</Badge>
                <CardTitle>免费版</CardTitle>
                <CardDescription>适合个人使用</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">¥0<span className="text-sm font-normal text-muted-foreground">/永久</span></div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">开始使用</Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
