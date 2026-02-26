'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { Toast as ToastUI } from '@/components/ui/toast'
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react'

const codeExamples = {
  basic: `import { toast } from 'sonner'

// 显示 toast
toast('操作成功')

// 带 description
toast('消息标题', {
  description: '这是详细描述信息'
})`,
  types: `import { toast } from 'sonner'

// 成功
toast.success('操作成功！')

// 错误
toast.error('操作失败')

// 警告
toast.warning('请注意')

// 信息
toast.info('提示信息')`,
  action: `import { toast } from 'sonner'

toast('文件已删除', {
  action: {
    label: '撤销',
    onClick: () => console.log('撤销删除')
  }
})`,
  promise: `import { toast } from 'sonner'

const promise = () => new Promise(resolve => setTimeout(resolve, 2000))

toast.promise(promise, {
  loading: '加载中...',
  success: '加载成功！',
  error: '加载失败'
})`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function ToastDemo() {
  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>使用 sonner 库显示 toast 消息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => toast('这是一条消息')}>
              显示 Toast
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast('消息标题', { description: '这是详细描述信息' })}
            >
              带描述
            </Button>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 不同类型 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">不同类型</CardTitle>
          <CardDescription>成功、错误、警告、信息等类型</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => toast.success('操作成功！')}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />成功
            </Button>
            <Button 
              variant="destructive"
              onClick={() => toast.error('操作失败')}
            >
              <XCircle className="w-4 h-4 mr-2" />错误
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast.warning('请注意')}
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />警告
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast.info('提示信息')}
            >
              <Info className="w-4 h-4 mr-2" />信息
            </Button>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.types} />
        </CardContent>
      </Card>

      {/* 带操作 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">带操作按钮</CardTitle>
          <CardDescription>Toast 可以包含操作按钮</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => toast('文件已删除', {
              action: {
                label: '撤销',
                onClick: () => toast.success('已撤销删除')
              }
            })}
          >
            删除文件
          </Button>
          <Separator />
          <CodeBlock code={codeExamples.action} />
        </CardContent>
      </Card>

      {/* Promise */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Promise Toast</CardTitle>
          <CardDescription>根据 Promise 状态自动更新</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => {
              const promise = () => new Promise((resolve) => setTimeout(resolve, 2000))
              toast.promise(promise, {
                loading: '加载中...',
                success: '加载成功！',
                error: '加载失败'
              })
            }}
          >
            执行异步操作
          </Button>
          <Separator />
          <CodeBlock code={codeExamples.promise} />
        </CardContent>
      </Card>

      {/* 自定义持续时间 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">自定义持续时间</CardTitle>
          <CardDescription>设置 toast 显示时长</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={() => toast('5秒后消失', { duration: 5000 })}
            >
              5秒
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast('永久显示，需手动关闭', { duration: Infinity })}
            >
              永久
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
