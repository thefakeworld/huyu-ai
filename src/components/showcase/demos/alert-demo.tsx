'use client'

import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check, AlertCircle, CheckCircle2, Info, AlertTriangle, Terminal } from 'lucide-react'

const codeExamples = {
  variants: `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'

<Alert>
  <AlertTitle>提示</AlertTitle>
  <AlertDescription>这是一条普通提示信息</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="w-4 h-4" />
  <AlertTitle>错误</AlertTitle>
  <AlertDescription>操作失败，请重试</AlertDescription>
</Alert>`,
  withIcon: `import { Alert, AlertDescription } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

<Alert>
  <Terminal className="w-4 h-4" />
  <AlertDescription>带图标的提示信息</AlertDescription>
</Alert>`,
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

export function AlertDemo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">变体样式</CardTitle>
          <CardDescription>Alert 支持 default 和 destructive 两种变体</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Alert>
              <AlertTitle>提示</AlertTitle>
              <AlertDescription>这是一条普通提示信息，用于向用户展示一般性说明。</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>错误</AlertTitle>
              <AlertDescription>操作失败，请检查输入后重试。</AlertDescription>
            </Alert>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.variants} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">带图标</CardTitle>
          <CardDescription>配合 lucide-react 图标增强语义</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Alert>
              <Terminal className="w-4 h-4" />
              <AlertTitle>终端提示</AlertTitle>
              <AlertDescription>运行 npm install 安装依赖包</AlertDescription>
            </Alert>
            <Alert className="border-green-200 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 [&>svg]:text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <AlertTitle>成功</AlertTitle>
              <AlertDescription>您的更改已保存成功！</AlertDescription>
            </Alert>
            <Alert className="border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200 [&>svg]:text-blue-600">
              <Info className="w-4 h-4" />
              <AlertTitle>信息</AlertTitle>
              <AlertDescription>系统将于今晚 10:00 进行维护更新。</AlertDescription>
            </Alert>
            <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 [&>svg]:text-yellow-600">
              <AlertTriangle className="w-4 h-4" />
              <AlertTitle>警告</AlertTitle>
              <AlertDescription>您的存储空间即将用尽，请及时清理。</AlertDescription>
            </Alert>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.withIcon} />
        </CardContent>
      </Card>
    </div>
  )
}
