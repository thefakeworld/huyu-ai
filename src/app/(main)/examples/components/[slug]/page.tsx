import { componentRegistry } from '@/components/docs/component-registry'
import ComponentDetailClient from './client'

// 静态生成所有组件页面
export function generateStaticParams() {
  return componentRegistry.map((component) => ({
    slug: component.slug,
  }))
}

export default function ComponentDetailPage({ params }: { params: { slug: string } }) {
  return <ComponentDetailClient slug={params.slug} />
}
