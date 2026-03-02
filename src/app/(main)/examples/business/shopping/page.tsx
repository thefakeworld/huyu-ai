{`
// ShoppingExamplePage.tsx - 购物商城示例页面
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// 动态导入购物商城组件，避免SSR问题
const ShoppingPage = dynamic(() => import('@/components/business/shopping/ShoppingPage'), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-1/4" />
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
});

export default function ShoppingExamplePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">购物商城示例</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            这是一个完整的电商解决方案示例，展示了商品浏览、购物车管理、订单结算等核心功能。
            该组件提供了现代化的UI界面和流畅的用户体验。
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              电商
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              购物车
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              支付
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              订单管理
            </span>
          </div>
        </CardContent>
      </Card>

      <Suspense fallback={
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      }>
        <ShoppingPage />
      </Suspense>
    </div>
  );
}
`}