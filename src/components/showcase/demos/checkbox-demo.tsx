'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check } from 'lucide-react'

const codeExamples = {
  basic: `import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">同意服务条款</Label>
</div>`,
  states: `import { Checkbox } from '@/components/ui/checkbox'

<Checkbox checked /> 选中
<Checkbox /> 未选中
<Checkbox checked="indeterminate" /> 半选
<Checkbox disabled /> 禁用`,
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

export function CheckboxDemo() {
  const [selected, setSelected] = useState<string[]>(['react'])

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>Checkbox 用于多选场景</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="cursor-pointer">同意服务条款</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" defaultChecked />
              <Label htmlFor="newsletter" className="cursor-pointer">订阅新闻邮件</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled" className="cursor-pointer text-muted-foreground">禁用选项</Label>
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">状态展示</CardTitle>
          <CardDescription>Checkbox 支持选中、未选中和半选状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox id="checked" checked />
              <Label htmlFor="checked">选中</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="unchecked" />
              <Label htmlFor="unchecked">未选中</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="indeterminate" checked="indeterminate" />
              <Label htmlFor="indeterminate">半选</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="disabled-checked" disabled checked />
              <Label htmlFor="disabled-checked" className="text-muted-foreground">禁用选中</Label>
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.states} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">多选列表</CardTitle>
          <CardDescription>实际应用场景</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {['React', 'Vue', 'Angular', 'Svelte'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Checkbox
                  id={item}
                  checked={selected.includes(item)}
                  onCheckedChange={(checked) => {
                    setSelected(checked ? [...selected, item] : selected.filter(i => i !== item))
                  }}
                />
                <Label htmlFor={item} className="cursor-pointer">{item}</Label>
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            已选择: {selected.length > 0 ? selected.join(', ') : '无'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
