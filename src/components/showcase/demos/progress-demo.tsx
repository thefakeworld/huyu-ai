'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check } from 'lucide-react'

const codeExamples = {
  basic: `import { Progress } from '@/components/ui/progress'

<Progress value={33} />
<Progress value={66} />
<Progress value={100} />`,
  dynamic: `import { Progress } from '@/components/ui/progress'
import { useState, useEffect } from 'react'

const [progress, setProgress] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setProgress(prev => prev >= 100 ? 0 : prev + 10)
  }, 500)
  return () => clearInterval(timer)
}, [])

<Progress value={progress} />`,
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

export function ProgressDemo() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (progress < 100 && progress > 0) {
      const timer = setTimeout(() => setProgress(progress + 10), 300)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>Progress 显示任务或操作的完成进度</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Progress value={25} />
              <p className="text-xs text-muted-foreground">25%</p>
            </div>
            <div className="space-y-2">
              <Progress value={50} />
              <p className="text-xs text-muted-foreground">50%</p>
            </div>
            <div className="space-y-2">
              <Progress value={75} />
              <p className="text-xs text-muted-foreground">75%</p>
            </div>
            <div className="space-y-2">
              <Progress value={100} />
              <p className="text-xs text-muted-foreground">100%</p>
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">动态进度</CardTitle>
          <CardDescription>模拟文件上传或任务进度</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Progress value={progress} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{progress}% 完成</span>
              <Button
                size="sm"
                onClick={() => setProgress(10)}
                disabled={progress > 0 && progress < 100}
              >
                {progress === 100 ? '完成' : progress > 0 ? '处理中...' : '开始'}
              </Button>
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.dynamic} />
        </CardContent>
      </Card>
    </div>
  )
}
