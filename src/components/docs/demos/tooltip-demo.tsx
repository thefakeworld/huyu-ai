'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const codeExamples = {
  basic: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>悬停显示</TooltipTrigger>
    <TooltipContent>
      <p>这是提示内容</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  button: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">按钮</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>按钮提示</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  positions: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>上方</TooltipTrigger>
    <TooltipContent side="top">顶部提示</TooltipContent>
  </Tooltip>
  
  <Tooltip>
    <TooltipTrigger>右方</TooltipTrigger>
    <TooltipContent side="right">右侧提示</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* 基础用法 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">基础用法</CardTitle>
            <CardDescription>鼠标悬停显示提示信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tooltip>
              <TooltipTrigger className="cursor-pointer underline decoration-dashed">
                悬停显示提示
              </TooltipTrigger>
              <TooltipContent>
                <p>这是提示内容</p>
              </TooltipContent>
            </Tooltip>
            <Separator />
            <CodeBlock code={codeExamples.basic} />
          </CardContent>
        </Card>

        {/* 按钮提示 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">按钮提示</CardTitle>
            <CardDescription>为按钮添加提示信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">保存</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>保存当前内容 (Ctrl+S)</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">删除</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>删除选中项</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator />
            <CodeBlock code={codeExamples.button} />
          </CardContent>
        </Card>

        {/* 不同位置 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">不同位置</CardTitle>
            <CardDescription>设置提示框显示位置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">上方</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>顶部提示</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">右方</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>右侧提示</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">下方</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>底部提示</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">左方</Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>左侧提示</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator />
            <CodeBlock code={codeExamples.positions} />
          </CardContent>
        </Card>

        {/* 延迟设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">延迟设置</CardTitle>
            <CardDescription>设置显示和隐藏延迟</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="outline">立即显示</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>无延迟</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild>
                  <Button variant="outline">延迟1秒</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>延迟显示</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
