import { componentRegistry } from '@/components/docs/component-registry'
import ComponentDetailClient from './client'

// 静态生成所有组件页面
export function generateStaticParams() {
  return componentRegistry.map((component) => ({
    slug: component.slug,
  }))
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ComponentDetailClient slug={slug} />
}
