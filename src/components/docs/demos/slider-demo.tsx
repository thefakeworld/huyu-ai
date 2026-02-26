'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'

const codeExamples = {
  basic: `import { Slider } from '@/components/ui/slider'

<Slider defaultValue={[50]} max={100} step={1} />`,
  range: `import { Slider } from '@/components/ui/slider'

<Slider defaultValue={[25, 75]} max={100} step={1} />`,
  steps: `import { Slider } from '@/components/ui/slider'

<Slider defaultValue={[50]} max={100} step={10} />`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function SliderDemo() {
  const [singleValue, setSingleValue] = useState([50])
  const [rangeValue, setRangeValue] = useState([25, 75])

  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>滑块组件的基础使用方式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Slider defaultValue={[50]} max={100} step={1} />
            <p className="text-sm text-muted-foreground">拖动滑块选择数值</p>
          </div>
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
          <div className="space-y-4">
            <Slider value={singleValue} onValueChange={setSingleValue} max={100} step={1} />
            <p className="text-sm text-muted-foreground">当前值: {singleValue[0]}</p>
          </div>
        </CardContent>
      </Card>

      {/* 范围选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">范围选择</CardTitle>
          <CardDescription>双滑块实现范围选择</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Slider value={rangeValue} onValueChange={setRangeValue} max={100} step={1} />
            <p className="text-sm text-muted-foreground">
              选择范围: {rangeValue[0]} - {rangeValue[1]}
            </p>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.range} />
        </CardContent>
      </Card>

      {/* 步进 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">步进设置</CardTitle>
          <CardDescription>通过 step 属性设置步进值</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Slider defaultValue={[50]} max={100} step={10} />
            <p className="text-sm text-muted-foreground">每次移动增加/减少 10</p>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.steps} />
        </CardContent>
      </Card>

      {/* 禁用状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">禁用状态</CardTitle>
          <CardDescription>Slider 组件的禁用状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider defaultValue={[50]} max={100} step={1} disabled />
        </CardContent>
      </Card>
    </div>
  )
}
