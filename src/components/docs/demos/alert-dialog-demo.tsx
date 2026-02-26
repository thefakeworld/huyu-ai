'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

const codeExamples = {
  basic: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">删除</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>确认删除？</AlertDialogTitle>
      <AlertDialogDescription>
        此操作无法撤销，将永久删除该数据。
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>取消</AlertDialogCancel>
      <AlertDialogAction>确认删除</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  custom: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>提示</AlertDialogTitle>
      <AlertDialogDescription>
        操作已完成！
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>确定</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  )
}

export function AlertDialogDemo() {
  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>用于需要用户确认的重要操作</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">删除项目</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除？</AlertDialogTitle>
                <AlertDialogDescription>
                  此操作无法撤销，将永久删除该数据。确定要继续吗？
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => toast.success('已删除')}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  确认删除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 不同场景 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">不同场景</CardTitle>
          <CardDescription>适用于各种确认场景</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* 退出确认 */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">退出登录</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认退出？</AlertDialogTitle>
                  <AlertDialogDescription>
                    退出后需要重新登录才能访问您的账户。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast.success('已退出')}>
                    确认退出
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* 清空数据 */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">清空缓存</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>清空缓存数据？</AlertDialogTitle>
                  <AlertDialogDescription>
                    这将清除所有本地缓存数据，不会影响您的账户信息。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast.success('缓存已清空')}>
                    确认清空
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* 发布确认 */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>发布内容</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>发布确认</AlertDialogTitle>
                  <AlertDialogDescription>
                    内容发布后将公开可见，确定要发布吗？
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast.success('已发布')}>
                    确认发布
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* 提示框 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">纯提示框</CardTitle>
          <CardDescription>仅用于信息提示，无取消按钮</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">查看详情</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>更新通知</AlertDialogTitle>
                <AlertDialogDescription>
                  新版本已发布！主要更新内容：
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>新增深色模式支持</li>
                    <li>优化性能体验</li>
                    <li>修复已知问题</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>知道了</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
