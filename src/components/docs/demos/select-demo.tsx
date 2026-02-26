'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const codeExamples = {
  basic: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="选择一个选项" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">浅色</SelectItem>
    <SelectItem value="dark">深色</SelectItem>
    <SelectItem value="system">系统</SelectItem>
  </SelectContent>
</Select>`,
  disabled: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select disabled>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="禁用状态" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">选项 1</SelectItem>
  </SelectContent>
</Select>`,
  groups: `import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="选择水果" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>亚洲水果</SelectLabel>
      <SelectItem value="apple">苹果</SelectItem>
      <SelectItem value="banana">香蕉</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>热带水果</SelectLabel>
      <SelectItem value="mango">芒果</SelectItem>
      <SelectItem value="pineapple">菠萝</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function SelectDemo() {
  const [selected, setSelected] = useState('')

  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>下拉选择框的基础使用方式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择一个选项" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">浅色</SelectItem>
                <SelectItem value="dark">深色</SelectItem>
                <SelectItem value="system">系统</SelectItem>
              </SelectContent>
            </Select>
            {selected && <span className="text-sm text-muted-foreground">已选择: {selected}</span>}
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 禁用状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">禁用状态</CardTitle>
          <CardDescription>Select 组件的禁用状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select disabled>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="禁用状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">选项 1</SelectItem>
            </SelectContent>
          </Select>
          <Separator />
          <CodeBlock code={codeExamples.disabled} />
        </CardContent>
      </Card>

      {/* 分组 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">分组选项</CardTitle>
          <CardDescription>使用 SelectGroup 对选项进行分组</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="选择水果" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">🍎 苹果</SelectItem>
              <SelectItem value="banana">🍌 香蕉</SelectItem>
              <SelectItem value="mango">🥭 芒果</SelectItem>
              <SelectItem value="pineapple">🍍 菠萝</SelectItem>
            </SelectContent>
          </Select>
          <Separator />
          <CodeBlock code={codeExamples.groups} />
        </CardContent>
      </Card>
    </div>
  )
}
