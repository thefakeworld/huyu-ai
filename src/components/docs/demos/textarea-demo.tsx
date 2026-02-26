'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const codeExamples = {
  basic: `import { Textarea } from '@/components/ui/textarea'

<Textarea placeholder="请输入内容..." />`,
  withLabel: `import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">消息</Label>
  <Textarea placeholder="输入您的消息..." id="message" />
</div>`,
  disabled: `import { Textarea } from '@/components/ui/textarea'

<Textarea placeholder="禁用状态" disabled />`,
  rows: `import { Textarea } from '@/components/ui/textarea'

<Textarea placeholder="5 行高度" rows={5} />`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function TextareaDemo() {
  const [value, setValue] = useState('')

  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>多行文本输入框的基础使用方式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="请输入内容..." />
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 带标签 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">带标签</CardTitle>
          <CardDescription>配合 Label 组件使用</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">消息</Label>
            <Textarea placeholder="输入您的消息..." id="message" />
          </div>
          <Separator />
          <CodeBlock code={codeExamples.withLabel} />
        </CardContent>
      </Card>

      {/* 禁用状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">禁用状态</CardTitle>
          <CardDescription>Textarea 组件的禁用状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="禁用状态" disabled />
          <Separator />
          <CodeBlock code={codeExamples.disabled} />
        </CardContent>
      </Card>

      {/* 指定行数 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">指定行数</CardTitle>
          <CardDescription>通过 rows 属性控制高度</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="5 行高度" rows={5} />
          <Separator />
          <CodeBlock code={codeExamples.rows} />
        </CardContent>
      </Card>

      {/* 受控组件 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">受控组件</CardTitle>
          <CardDescription>通过 value 和 onChange 控制输入</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="输入内容..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              字符数: {value.length}
            </p>
            <Button variant="outline" size="sm" onClick={() => setValue('')}>
              清空
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
