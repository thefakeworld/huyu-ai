'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const codeExamples = {
  basic: `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">选项一</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">选项二</Label>
  </div>
</RadioGroup>`,
  disabled: `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

<RadioGroup defaultValue="option-one" disabled>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="r1" />
    <Label htmlFor="r1">禁用选项</Label>
  </div>
</RadioGroup>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function RadioGroupDemo() {
  const [selected, setSelected] = useState('comfortable')

  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>单选按钮组的基础使用方式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">选项一</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">选项二</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-three" />
              <Label htmlFor="option-three">选项三</Label>
            </div>
          </RadioGroup>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 受控组件 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">受控组件</CardTitle>
          <CardDescription>通过 value 和 onValueChange 控制</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={selected} onValueChange={setSelected}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r-default" />
              <Label htmlFor="r-default">默认</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r-comfortable" />
              <Label htmlFor="r-comfortable">舒适</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r-compact" />
              <Label htmlFor="r-compact">紧凑</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">当前选择: {selected}</p>
        </CardContent>
      </Card>

      {/* 禁用状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">禁用状态</CardTitle>
          <CardDescription>RadioGroup 组件的禁用状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="option-one" disabled>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="r-dis-1" />
              <Label htmlFor="r-dis-1">禁用选项一</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="r-dis-2" />
              <Label htmlFor="r-dis-2">禁用选项二</Label>
            </div>
          </RadioGroup>
          <Separator />
          <CodeBlock code={codeExamples.disabled} />
        </CardContent>
      </Card>
    </div>
  )
}
