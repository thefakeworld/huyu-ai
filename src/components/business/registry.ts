/**
 * 业务组件展示模块 - 元数据注册系统
 */

// 业务组件分类
export type BusinessCategory =
  | 'auth'      // 认证组件
  | 'layout'    // 布局组件
  | 'page'      // 页面组件
  | 'shopping'  // 购物商城组件

// 业务组件属性定义
export interface BusinessProp {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

// 业务组件元数据
export interface BusinessComponentMeta {
  name: string
  slug: string
  category: BusinessCategory
  description: string
  docs: string
  props: BusinessProp[]
  dependencies: string[]
  tags: string[]
  path: string
}

// 分类信息
export const businessCategoryInfo: Record<BusinessCategory, { label: string; description: string; icon: string }> = {
  auth: { label: '认证组件', description: '用户认证和授权相关组件', icon: 'Shield' },
  layout: { label: '布局组件', description: '页面布局和导航组件', icon: 'Layout' },
  page: { label: '页面组件', description: '完整的页面级别组件', icon: 'FileText' },
  shopping: { label: '购物商城', description: '电商功能相关组件', icon: 'ShoppingCart' },
}

// 业务组件注册表
export const businessRegistry: BusinessComponentMeta[] = [
  // ========== 认证组件 ==========
  {
    name: 'LoginForm',
    slug: 'login-form',
    category: 'auth',
    description: '用户登录表单组件，支持邮箱密码登录和表单验证',
    docs: 'LoginForm 是一个完整的登录表单组件，集成了表单验证、错误提示和加载状态。支持邮箱密码登录模式，可配合 OAuth 按钮使用。基于 react-hook-form 和 zod 构建。',
    props: [
      { name: 'onSuccess', type: '() => void', required: true, description: '登录成功回调' },
      { name: 'onSwitchToRegister', type: '() => void', description: '切换到注册表单回调' },
    ],
    dependencies: ['Button', 'Input', 'Label', 'Card'],
    tags: ['认证', '登录', '表单'],
    path: '@/components/business/auth/login-form',
  },
  {
    name: 'RegisterForm',
    slug: 'register-form',
    category: 'auth',
    description: '用户注册表单组件，包含完整的注册流程',
    docs: 'RegisterForm 是用户注册表单组件，支持邮箱、密码、用户名等字段的输入和验证。包含密码强度提示和重复密码验证。',
    props: [
      { name: 'onSuccess', type: '() => void', required: true, description: '注册成功回调' },
      { name: 'onSwitchToLogin', type: '() => void', description: '切换到登录表单回调' },
    ],
    dependencies: ['Button', 'Input', 'Label', 'Card'],
    tags: ['认证', '注册', '表单'],
    path: '@/components/business/auth/login-form',
  },
  {
    name: 'OAuthButtons',
    slug: 'oauth-buttons',
    category: 'auth',
    description: '第三方登录按钮组件，支持 Google、GitHub 等',
    docs: 'OAuthButtons 提供第三方 OAuth 登录入口，目前支持 Google OAuth。按钮样式统一，可扩展支持更多平台。',
    props: [
      { name: 'onSuccess', type: '() => void', required: true, description: '登录成功回调' },
    ],
    dependencies: ['Button'],
    tags: ['认证', 'OAuth', '第三方登录'],
    path: '@/components/business/auth/oauth-buttons',
  },
  {
    name: 'AuthProvider',
    slug: 'auth-provider',
    category: 'auth',
    description: '认证上下文提供者，管理全局认证状态',
    docs: 'AuthProvider 是认证系统的核心组件，提供用户状态管理、登录/登出方法和用户头像组件。配合 Zustand 状态管理实现持久化。',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: '子组件' },
    ],
    dependencies: [],
    tags: ['认证', '上下文', '状态管理'],
    path: '@/components/business/auth/auth-provider',
  },
  {
    name: 'UserAvatar',
    slug: 'user-avatar',
    category: 'auth',
    description: '用户头像组件，显示用户头像和状态',
    docs: 'UserAvatar 显示用户头像，支持多种尺寸。当用户没有头像时显示默认头像或用户名首字母。',
    props: [
      { name: 'user', type: 'User | null', required: true, description: '用户对象' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '头像尺寸' },
    ],
    dependencies: ['Avatar'],
    tags: ['认证', '头像', '用户'],
    path: '@/components/business/auth/auth-provider',
  },

  // ========== 布局组件 ==========
  {
    name: 'Navbar',
    slug: 'navbar',
    category: 'layout',
    description: '顶部导航栏组件，包含品牌Logo和导航菜单',
    docs: 'Navbar 是应用的主要导航组件，包含 Logo、导航链接、用户信息和登录/登出按钮。支持响应式设计，移动端显示为汉堡菜单。',
    props: [],
    dependencies: ['Button', 'Avatar'],
    tags: ['布局', '导航', '顶部栏'],
    path: '@/components/business/layout/navbar',
  },
  {
    name: 'Footer',
    slug: 'footer',
    category: 'layout',
    description: '页面底部组件，显示版权和链接信息',
    docs: 'Footer 是页面底部组件，显示品牌信息、版权声明和相关链接。',
    props: [],
    dependencies: [],
    tags: ['布局', '底部', '版权'],
    path: '@/components/business/layout/navbar',
  },

  // ========== 页面组件 ==========
  {
    name: 'HomePage',
    slug: 'home-page',
    category: 'page',
    description: '首页组件，展示项目介绍和功能入口',
    docs: 'HomePage 是应用的首页，展示项目介绍、技术栈、功能特性等内容。提供快速导航到案例广场和用户中心。',
    props: [],
    dependencies: ['Button', 'Card', 'Badge'],
    tags: ['页面', '首页', '介绍'],
    path: '@/components/business/pages/home-page',
  },
  {
    name: 'UserPage',
    slug: 'user-page',
    category: 'page',
    description: '用户中心页面，包含用户信息和个人设置',
    docs: 'UserPage 是用户中心页面，显示用户信息、账户状态和快捷操作。未登录时显示登录表单。',
    props: [],
    dependencies: ['Card', 'Badge', 'Button', 'Avatar'],
    tags: ['页面', '用户', '设置'],
    path: '@/components/business/pages/user-page',
  },
  {
    name: 'ExamplesPage',
    slug: 'examples-page',
    category: 'page',
    description: '案例广场页面，展示各种演示和组件入口',
    docs: 'ExamplesPage 是案例广场页面，提供组件展示、在线演示等功能的入口。',
    props: [],
    dependencies: ['Card', 'Badge', 'Button'],
    tags: ['页面', '案例', '演示'],
    path: '@/components/business/pages/examples-page',
  },
  {
    name: 'WebSocketDemo',
    slug: 'websocket-demo',
    category: 'page',
    description: 'WebSocket 聊天室演示页面',
    docs: 'WebSocketDemo 是一个实时聊天室演示，展示 WebSocket 连接、消息收发和在线用户列表功能。',
    props: [],
    dependencies: ['Card', 'Button', 'Input', 'Avatar', 'ScrollArea'],
    tags: ['页面', 'WebSocket', '聊天', '实时'],
    path: '@/components/business/pages/websocket-demo',
  },

  // ========== 购物商城组件 ==========
  {
    name: 'ShoppingPage',
    slug: 'shopping-page',
    category: 'shopping',
    description: '完整的电商购物商城页面，包含商品浏览、购物车、结账等功能',
    docs: 'ShoppingPage 是一个完整的电商解决方案，提供商品浏览、搜索、加入购物车、下单支付等全流程功能。界面现代化，用户体验流畅。',
    props: [],
    dependencies: ['Card', 'Button', 'Badge', 'Input', 'Tabs'],
    tags: ['电商', '购物', '商城', '零售'],
    path: '@/components/business/shopping/ShoppingPage',
  },
  {
    name: 'ProductList',
    slug: 'product-list',
    category: 'shopping',
    description: '商品列表展示组件，支持网格和列表两种视图模式',
    docs: 'ProductList 组件用于展示多个商品，每个商品卡片包含图片、名称、价格、评分等信息，并提供加入购物车和收藏功能。',
    props: [
      { name: 'products', type: 'Product[]', required: true, description: '商品数据数组' },
      { name: 'onProductClick', type: '(product: Product) => void', description: '点击商品回调' },
      { name: 'onAddToCart', type: '(product: Product) => void', description: '添加到购物车回调' },
      { name: 'onToggleFavorite', type: '(productId: string) => void', description: '切换收藏状态回调' },
    ],
    dependencies: ['Card', 'Button', 'Badge', 'Star'],
    tags: ['电商', '商品', '列表', '网格'],
    path: '@/components/business/shopping/ProductList',
  },
  {
    name: 'ProductDetail',
    slug: 'product-detail',
    category: 'shopping',
    description: '商品详情页组件，展示商品详细信息和规格选择',
    docs: 'ProductDetail 展示单个商品的完整信息，包括多角度图片、价格、规格选项、数量调整、购买按钮等。',
    props: [
      { name: 'product', type: 'Product', required: true, description: '商品数据' },
      { name: 'onAddToCart', type: '(product: Product, quantity: number, selectedSpecs?: any[]) => void', required: true, description: '添加到购物车回调' },
      { name: 'onBuyNow', type: '(product: Product, quantity: number, selectedSpecs?: any[]) => void', required: true, description: '立即购买回调' },
      { name: 'onToggleFavorite', type: '(productId: string) => void', required: true, description: '切换收藏状态回调' },
      { name: 'isFavorite', type: 'boolean', required: true, description: '是否已收藏' },
    ],
    dependencies: ['Card', 'Button', 'Badge', 'Input', 'Star'],
    tags: ['电商', '商品', '详情', '规格'],
    path: '@/components/business/shopping/ProductDetail',
  },
  {
    name: 'CartPage',
    slug: 'cart-page',
    category: 'shopping',
    description: '购物车页面组件，管理用户选购的商品',
    docs: 'CartPage 显示用户已添加到购物车的所有商品，支持修改数量、删除商品、全选等功能，并计算总价。',
    props: [
      { name: 'initialItems', type: 'CartItem[]', required: true, description: '初始购物车商品数组' },
      { name: 'onRemoveItem', type: '(itemId: string) => void', required: true, description: '移除商品回调' },
      { name: 'onUpdateQuantity', type: '(itemId: string, newQuantity: number) => void', required: true, description: '更新商品数量回调' },
      { name: 'onCheckout', type: '(selectedItems: CartItem[]) => void', required: true, description: '去结算回调' },
    ],
    dependencies: ['Card', 'Button', 'Checkbox'],
    tags: ['电商', '购物车', '结算', '订单'],
    path: '@/components/business/shopping/CartPage',
  },
  {
    name: 'CheckoutPage',
    slug: 'checkout-page',
    category: 'shopping',
    description: '订单结算页面组件，处理收货地址、支付方式等信息',
    docs: 'CheckoutPage 处理用户的订单结算流程，包括选择收货地址、配送方式、优惠券、支付方式等，并汇总订单金额。',
    props: [
      { name: 'cartItems', type: 'CartItem[]', required: true, description: '购物车商品数组' },
      { name: 'subtotal', type: 'number', required: true, description: '商品小计' },
      { name: 'onOrderSubmit', type: '(orderData: any) => void', required: true, description: '提交订单回调' },
      { name: 'onBack', type: '() => void', description: '返回回调' },
    ],
    dependencies: ['Card', 'Button', 'Input', 'RadioGroup', 'Textarea'],
    tags: ['电商', '结算', '订单', '支付'],
    path: '@/components/business/shopping/CheckoutPage',
  },
]


// 工具函数：获取所有分类
export function getBusinessCategories(): BusinessCategory[] {
  return [...new Set(businessRegistry.map(c => c.category))]
}

// 工具函数：按分类获取组件
export function getBusinessByCategory(category: BusinessCategory): BusinessComponentMeta[] {
  return businessRegistry.filter(c => c.category === category)
}

// 工具函数：根据slug获取组件
export function getBusinessBySlug(slug: string): BusinessComponentMeta | undefined {
  return businessRegistry.find(c => c.slug === slug)
}

// 工具函数：搜索组件
export function searchBusiness(query: string): BusinessComponentMeta[] {
  const lowerQuery = query.toLowerCase()
  return businessRegistry.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.tags.some(t => t.toLowerCase().includes(lowerQuery))
  )
}
