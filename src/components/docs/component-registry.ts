/**
 * 组件展示模块 - 元数据注册系统
 * 静态定义所有组件信息，确保快速响应
 */

// 组件分类
export type ComponentCategory =
  | 'basic'      // 基础组件
  | 'form'       // 表单组件
  | 'layout'     // 布局组件
  | 'navigation' // 导航组件
  | 'feedback'   // 反馈组件
  | 'data'       // 数据展示
  | 'advanced'   // 高级组件

// 组件属性定义
export interface ComponentProp {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

// 演示用例定义
export interface ComponentDemo {
  title: string
  description: string
  code: string
  preview: React.ComponentType
}

// 组件元数据
export interface ComponentMeta {
  name: string
  slug: string
  category: ComponentCategory
  description: string
  docs: string
  props: ComponentProp[]
  dependencies: string[]
  tags: string[]
  demoLoader?: () => Promise<{ default: React.ComponentType }>
}

// 分类信息
export const categoryInfo: Record<ComponentCategory, { label: string; description: string; icon: string }> = {
  basic: { label: '基础组件', description: '常用基础UI组件', icon: 'Box' },
  form: { label: '表单组件', description: '表单输入和交互组件', icon: 'FileText' },
  layout: { label: '布局组件', description: '页面布局和容器组件', icon: 'Layout' },
  navigation: { label: '导航组件', description: '导航和菜单组件', icon: 'Navigation' },
  feedback: { label: '反馈组件', description: '用户反馈和通知组件', icon: 'MessageCircle' },
  data: { label: '数据展示', description: '数据可视化组件', icon: 'Database' },
  advanced: { label: '高级组件', description: '复杂交互组件', icon: 'Settings' },
}

// 组件注册表 - 静态定义，编译时确定
export const componentRegistry: ComponentMeta[] = [
  // ========== 基础组件 ==========
  {
    name: 'Button',
    slug: 'button',
    category: 'basic',
    description: '可自定义样式的按钮组件，支持多种变体和尺寸',
    docs: 'Button组件是基于Radix UI Slot构建的可复用按钮组件，支持多种视觉变体（default、destructive、outline、secondary、ghost、link）和尺寸（default、sm、lg、icon）。使用class-variance-authority管理样式变体，确保一致的样式API。',
    props: [
      { name: 'variant', type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: 'default', description: '按钮变体样式' },
      { name: 'size', type: "'default' | 'sm' | 'lg' | 'icon'", default: 'default', description: '按钮尺寸' },
      { name: 'asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    ],
    dependencies: [],
    tags: ['交互', '表单', '按钮'],
  },
  {
    name: 'Badge',
    slug: 'badge',
    category: 'basic',
    description: '徽章组件，用于显示状态、标签或计数',
    docs: 'Badge组件是一个小巧的标签组件，常用于显示状态、分类标签或数量提示。支持多种变体样式，可自定义颜色和大小。',
    props: [
      { name: 'variant', type: "'default' | 'secondary' | 'destructive' | 'outline'", default: 'default', description: '徽章变体样式' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['标签', '状态', '计数'],
  },
  {
    name: 'Separator',
    slug: 'separator',
    category: 'basic',
    description: '分隔线组件，用于视觉分隔内容区域',
    docs: 'Separator组件用于在布局中创建视觉分隔，可以是水平或垂直方向。基于Radix UI Separator原语构建。',
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: '分隔线方向' },
      { name: 'decorative', type: 'boolean', default: 'true', description: '是否为装饰性元素' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['分隔', '布局', '视觉'],
  },
  {
    name: 'Skeleton',
    slug: 'skeleton',
    category: 'basic',
    description: '骨架屏组件，用于内容加载时的占位显示',
    docs: 'Skeleton组件在内容加载时显示占位动画，提升用户体验。可自定义形状和尺寸，常用于列表、卡片等场景。',
    props: [
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['加载', '占位', '动画'],
  },
  {
    name: 'AspectRatio',
    slug: 'aspect-ratio',
    category: 'basic',
    description: '宽高比容器组件，保持元素固定比例',
    docs: 'AspectRatio组件用于保持子元素的固定宽高比，常用于图片、视频等媒体元素的容器。',
    props: [
      { name: 'ratio', type: 'number', default: '1', description: '宽高比例' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['布局', '比例', '媒体'],
  },

  // ========== 表单组件 ==========
  {
    name: 'Input',
    slug: 'input',
    category: 'form',
    description: '基础输入框组件，支持多种输入类型',
    docs: 'Input组件是基础的文本输入框，支持所有原生HTML input属性。包含默认样式和焦点状态，支持文件上传和禁用状态。',
    props: [
      { name: 'type', type: 'string', default: 'text', description: '输入类型' },
      { name: 'placeholder', type: 'string', description: '占位文本' },
      { name: 'value', type: 'string', description: '输入值' },
      { name: 'onChange', type: 'function', description: '值变化回调' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['表单', '输入', '文本'],
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    category: 'form',
    description: '多行文本输入框组件',
    docs: 'Textarea组件是多行文本输入控件，适用于较长内容的输入场景。支持自动高度调整和禁用状态。',
    props: [
      { name: 'placeholder', type: 'string', description: '占位文本' },
      { name: 'value', type: 'string', description: '输入值' },
      { name: 'rows', type: 'number', default: '3', description: '可见行数' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['表单', '输入', '多行'],
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    category: 'form',
    description: '复选框组件，用于多选场景',
    docs: 'Checkbox组件基于Radix UI Checkbox构建，支持选中、未选中和半选状态。包含内置动画效果。',
    props: [
      { name: 'checked', type: 'boolean | "indeterminate"', description: '选中状态' },
      { name: 'onCheckedChange', type: 'function', description: '状态变化回调' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
      { name: 'id', type: 'string', description: '元素ID' },
    ],
    dependencies: ['Label'],
    tags: ['表单', '选择', '多选'],
  },
  {
    name: 'RadioGroup',
    slug: 'radio-group',
    category: 'form',
    description: '单选按钮组组件，用于单选场景',
    docs: 'RadioGroup组件基于Radix UI Radio Group构建，提供单选功能。包含RadioGroup和RadioItem两个组件。',
    props: [
      { name: 'value', type: 'string', description: '当前选中值' },
      { name: 'onValueChange', type: 'function', description: '值变化回调' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
      { name: 'name', type: 'string', description: '表单字段名' },
    ],
    dependencies: ['Label'],
    tags: ['表单', '选择', '单选'],
  },
  {
    name: 'Select',
    slug: 'select',
    category: 'form',
    description: '下拉选择组件，支持搜索和分组',
    docs: 'Select组件基于Radix UI Select构建，提供完整的下拉选择功能。支持分组、禁用选项和自定义触发器。',
    props: [
      { name: 'value', type: 'string', description: '当前选中值' },
      { name: 'onValueChange', type: 'function', description: '值变化回调' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
      { name: 'placeholder', type: 'string', description: '占位文本' },
    ],
    dependencies: [],
    tags: ['表单', '选择', '下拉'],
  },
  {
    name: 'Switch',
    slug: 'switch',
    category: 'form',
    description: '开关组件，用于切换二元状态',
    docs: 'Switch组件基于Radix UI Switch构建，提供开关切换功能。适用于设置项的启用/禁用场景。',
    props: [
      { name: 'checked', type: 'boolean', description: '开关状态' },
      { name: 'onCheckedChange', type: 'function', description: '状态变化回调' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
      { name: 'id', type: 'string', description: '元素ID' },
    ],
    dependencies: ['Label'],
    tags: ['表单', '开关', '切换'],
  },
  {
    name: 'Slider',
    slug: 'slider',
    category: 'form',
    description: '滑块组件，用于数值范围选择',
    docs: 'Slider组件基于Radix UI Slider构建，支持单滑块和双滑块模式。适用于数值范围选择场景。',
    props: [
      { name: 'value', type: 'number[]', description: '当前值' },
      { name: 'onValueChange', type: 'function', description: '值变化回调' },
      { name: 'min', type: 'number', default: '0', description: '最小值' },
      { name: 'max', type: 'number', default: '100', description: '最大值' },
      { name: 'step', type: 'number', default: '1', description: '步进值' },
      { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    ],
    dependencies: [],
    tags: ['表单', '范围', '数值'],
  },
  {
    name: 'Label',
    slug: 'label',
    category: 'form',
    description: '标签组件，用于表单控件标注',
    docs: 'Label组件用于为表单控件添加标签说明。支持点击标签聚焦对应控件。',
    props: [
      { name: 'htmlFor', type: 'string', description: '关联控件ID' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['表单', '标签', '标注'],
  },
  {
    name: 'Form',
    slug: 'form',
    category: 'form',
    description: '表单组件，集成表单验证',
    docs: 'Form组件基于react-hook-form和zod构建，提供完整的表单状态管理和验证功能。包含Form、FormField、FormItem、FormLabel、FormControl、FormDescription、FormMessage等子组件。',
    props: [
      { name: 'form', type: 'UseFormReturn', required: true, description: 'react-hook-form实例' },
      { name: 'onSubmit', type: 'function', required: true, description: '表单提交回调' },
      { name: 'children', type: 'ReactNode', required: true, description: '表单内容' },
    ],
    dependencies: ['Input', 'Label', 'Button'],
    tags: ['表单', '验证', '提交'],
  },

  // ========== 布局组件 ==========
  {
    name: 'Card',
    slug: 'card',
    category: 'layout',
    description: '卡片容器组件，用于内容分组展示',
    docs: 'Card组件是一个容器组件系列，包含Card、CardHeader、CardTitle、CardDescription、CardContent、CardFooter等子组件，用于构建卡片式布局。',
    props: [
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['布局', '容器', '卡片'],
  },
  {
    name: 'Tabs',
    slug: 'tabs',
    category: 'layout',
    description: '标签页组件，用于内容切换展示',
    docs: 'Tabs组件基于Radix UI Tabs构建，包含Tabs、TabsList、TabsTrigger、TabsContent等子组件，实现标签页切换功能。',
    props: [
      { name: 'value', type: 'string', description: '当前激活的标签' },
      { name: 'defaultValue', type: 'string', description: '默认激活的标签' },
      { name: 'onValueChange', type: 'function', description: '标签切换回调' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['布局', '导航', '切换'],
  },
  {
    name: 'Accordion',
    slug: 'accordion',
    category: 'layout',
    description: '手风琴组件，用于内容折叠展示',
    docs: 'Accordion组件基于Radix UI Accordion构建，支持单开和多开模式。包含Accordion、AccordionItem、AccordionTrigger、AccordionContent等子组件。',
    props: [
      { name: 'type', type: "'single' | 'multiple'", default: 'single', description: '展开模式' },
      { name: 'collapsible', type: 'boolean', default: 'false', description: '是否允许全部折叠' },
      { name: 'defaultValue', type: 'string | string[]', description: '默认展开项' },
    ],
    dependencies: [],
    tags: ['布局', '折叠', '内容'],
  },
  {
    name: 'Collapsible',
    slug: 'collapsible',
    category: 'layout',
    description: '可折叠组件，用于内容的显示隐藏',
    docs: 'Collapsible组件基于Radix UI Collapsible构建，提供简单的折叠展开功能。包含Collapsible、CollapsibleTrigger、CollapsibleContent等子组件。',
    props: [
      { name: 'open', type: 'boolean', description: '展开状态' },
      { name: 'onOpenChange', type: 'function', description: '状态变化回调' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: '默认是否展开' },
    ],
    dependencies: [],
    tags: ['布局', '折叠', '隐藏'],
  },
  {
    name: 'Resizable',
    slug: 'resizable',
    category: 'layout',
    description: '可调整大小组件，用于面板布局',
    docs: 'Resizable组件基于react-resizable-panels构建，支持创建可拖拽调整大小的面板布局。包含ResizablePanelGroup、ResizablePanel、ResizableHandle等子组件。',
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", required: true, description: '排列方向' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['布局', '面板', '拖拽'],
  },
  {
    name: 'ScrollArea',
    slug: 'scroll-area',
    category: 'layout',
    description: '滚动区域组件，自定义滚动条样式',
    docs: 'ScrollArea组件基于Radix UI Scroll Area构建，提供自定义滚动条样式的滚动容器。',
    props: [
      { name: 'className', type: 'string', description: '额外CSS类名' },
      { name: 'children', type: 'ReactNode', required: true, description: '滚动内容' },
    ],
    dependencies: [],
    tags: ['布局', '滚动', '容器'],
  },
  {
    name: 'Sidebar',
    slug: 'sidebar',
    category: 'layout',
    description: '侧边栏组件，用于应用侧边导航',
    docs: 'Sidebar组件是一套完整的侧边栏解决方案，包含Sidebar、SidebarProvider、SidebarTrigger等组件，支持折叠、响应式等特性。',
    props: [
      { name: 'side', type: "'left' | 'right'", default: 'left', description: '侧边栏位置' },
      { name: 'variant', type: "'sidebar' | 'floating' | 'inset'", default: 'sidebar', description: '侧边栏变体' },
      { name: 'collapsible', type: "'offcanvas' | 'icon' | 'none'", default: 'offcanvas', description: '折叠模式' },
    ],
    dependencies: ['Button'],
    tags: ['布局', '导航', '侧边栏'],
  },

  // ========== 导航组件 ==========
  {
    name: 'NavigationMenu',
    slug: 'navigation-menu',
    category: 'navigation',
    description: '导航菜单组件，支持多级菜单',
    docs: 'NavigationMenu组件基于Radix UI Navigation Menu构建，支持水平导航和多级下拉菜单。包含NavigationMenu、NavigationMenuList、NavigationMenuItem、NavigationMenuTrigger、NavigationMenuContent等子组件。',
    props: [
      { name: 'value', type: 'string', description: '当前激活项' },
      { name: 'defaultValue', type: 'string', description: '默认激活项' },
      { name: 'onValueChange', type: 'function', description: '值变化回调' },
    ],
    dependencies: [],
    tags: ['导航', '菜单', '多级'],
  },
  {
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    category: 'navigation',
    description: '面包屑组件，显示当前位置路径',
    docs: 'Breadcrumb组件用于显示用户的当前位置路径。包含Breadcrumb、BreadcrumbList、BreadcrumbItem、BreadcrumbLink、BreadcrumbSeparator等子组件。',
    props: [
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['导航', '路径', '位置'],
  },
  {
    name: 'Pagination',
    slug: 'pagination',
    category: 'navigation',
    description: '分页组件，用于列表分页导航',
    docs: 'Pagination组件提供分页导航功能。包含Pagination、PaginationContent、PaginationItem、PaginationLink、PaginationEllipsis等子组件。',
    props: [
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: ['Button'],
    tags: ['导航', '分页', '列表'],
  },
  {
    name: 'Menubar',
    slug: 'menubar',
    category: 'navigation',
    description: '菜单栏组件，类似桌面应用菜单',
    docs: 'Menubar组件基于Radix UI Menubar构建，提供类似桌面应用的菜单栏体验。包含Menubar、MenubarMenu、MenubarTrigger、MenubarContent、MenubarItem等子组件。',
    props: [
      { name: 'className', type: 'string', description: '额外CSS类名' },
      { name: 'value', type: 'string', description: '当前激活菜单' },
    ],
    dependencies: [],
    tags: ['导航', '菜单', '桌面'],
  },

  // ========== 反馈组件 ==========
  {
    name: 'Alert',
    slug: 'alert',
    category: 'feedback',
    description: '警告提示组件，用于信息展示',
    docs: 'Alert组件用于展示静态警告或提示信息。支持多种变体（default、destructive）。包含Alert、AlertTitle、AlertDescription等子组件。',
    props: [
      { name: 'variant', type: "'default' | 'destructive'", default: 'default', description: '警告类型' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['反馈', '提示', '警告'],
  },
  {
    name: 'Dialog',
    slug: 'dialog',
    category: 'feedback',
    description: '对话框组件，模态交互',
    docs: 'Dialog组件基于Radix UI Dialog构建，提供模态对话框功能。包含Dialog、DialogTrigger、DialogContent、DialogHeader、DialogTitle、DialogDescription等子组件。',
    props: [
      { name: 'open', type: 'boolean', description: '对话框打开状态' },
      { name: 'onOpenChange', type: 'function', description: '状态变化回调' },
      { name: 'modal', type: 'boolean', default: 'true', description: '是否为模态' },
    ],
    dependencies: ['Button'],
    tags: ['反馈', '模态', '弹窗'],
  },
  {
    name: 'AlertDialog',
    slug: 'alert-dialog',
    category: 'feedback',
    description: '警告对话框组件，用于确认操作',
    docs: 'AlertDialog组件基于Radix UI Alert Dialog构建，用于需要用户确认的重要操作。包含AlertDialog、AlertDialogTrigger、AlertDialogContent、AlertDialogHeader等子组件。',
    props: [
      { name: 'open', type: 'boolean', description: '对话框打开状态' },
      { name: 'onOpenChange', type: 'function', description: '状态变化回调' },
    ],
    dependencies: ['Button'],
    tags: ['反馈', '确认', '弹窗'],
  },
  {
    name: 'Drawer',
    slug: 'drawer',
    category: 'feedback',
    description: '抽屉组件，侧边滑出面板',
    docs: 'Drawer组件基于vaul构建，提供侧边滑出的抽屉面板。包含Drawer、DrawerTrigger、DrawerContent、DrawerHeader、DrawerTitle等子组件。',
    props: [
      { name: 'open', type: 'boolean', description: '抽屉打开状态' },
      { name: 'onOpenChange', type: 'function', description: '状态变化回调' },
      { name: 'direction', type: "'left' | 'right' | 'top' | 'bottom'", default: 'right', description: '滑出方向' },
    ],
    dependencies: ['Button'],
    tags: ['反馈', '侧边', '面板'],
  },
  {
    name: 'Sheet',
    slug: 'sheet',
    category: 'feedback',
    description: '浮层组件，侧边滑出内容',
    docs: 'Sheet组件基于Radix UI Dialog构建，提供侧边滑出的浮层内容。包含Sheet、SheetTrigger、SheetContent、SheetHeader、SheetTitle等子组件。',
    props: [
      { name: 'open', type: 'boolean', description: '浮层打开状态' },
      { name: 'onOpenChange', type: 'function', description: '状态变化回调' },
      { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: 'right', description: '滑出方向' },
    ],
    dependencies: ['Button'],
    tags: ['反馈', '侧边', '浮层'],
  },
  {
    name: 'Toast',
    slug: 'toast',
    category: 'feedback',
    description: '轻提示组件，短暂消息通知',
    docs: 'Toast组件用于显示短暂的消息通知。使用sonner库实现，支持多种类型和自定义样式。',
    props: [
      { name: 'type', type: "'success' | 'error' | 'warning' | 'info'", description: '提示类型' },
      { name: 'description', type: 'string', description: '提示内容' },
      { name: 'duration', type: 'number', default: '4000', description: '显示时长(ms)' },
    ],
    dependencies: [],
    tags: ['反馈', '通知', '消息'],
  },
  {
    name: 'Popover',
    slug: 'popover',
    category: 'feedback',
    description: '气泡卡片组件，悬浮展示内容',
    docs: 'Popover组件基于Radix UI Popover构建，提供悬浮气泡卡片功能。包含Popover、PopoverTrigger、PopoverContent等子组件。',
    props: [
      { name: 'open', type: 'boolean', description: '气泡打开状态' },
      { name: 'onOpenChange', type: 'function', description: '状态变化回调' },
    ],
    dependencies: [],
    tags: ['反馈', '悬浮', '卡片'],
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    category: 'feedback',
    description: '工具提示组件，鼠标悬停提示',
    docs: 'Tooltip组件基于Radix UI Tooltip构建，提供鼠标悬停时显示的提示信息。包含Tooltip、TooltipTrigger、TooltipContent等子组件。',
    props: [
      { name: 'content', type: 'ReactNode', description: '提示内容' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: 'top', description: '显示位置' },
      { name: 'delayDuration', type: 'number', default: '400', description: '延迟显示时间(ms)' },
    ],
    dependencies: [],
    tags: ['反馈', '提示', '悬浮'],
  },
  {
    name: 'HoverCard',
    slug: 'hover-card',
    category: 'feedback',
    description: '悬浮卡片组件，悬停展示详情',
    docs: 'HoverCard组件基于Radix UI Hover Card构建，提供鼠标悬停时显示的详细信息卡片。包含HoverCard、HoverCardTrigger、HoverCardContent等子组件。',
    props: [
      { name: 'open', type: 'boolean', description: '卡片打开状态' },
      { name: 'onOpenChange', type: 'function', description: '状态变化回调' },
      { name: 'openDelay', type: 'number', default: '300', description: '打开延迟(ms)' },
    ],
    dependencies: [],
    tags: ['反馈', '悬浮', '卡片'],
  },

  // ========== 数据展示 ==========
  {
    name: 'Table',
    slug: 'table',
    category: 'data',
    description: '表格组件，数据列表展示',
    docs: 'Table组件提供HTML表格的样式封装。包含Table、TableHeader、TableBody、TableRow、TableHead、TableCell等子组件。',
    props: [
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['数据', '表格', '列表'],
  },
  {
    name: 'Avatar',
    slug: 'avatar',
    category: 'data',
    description: '头像组件，用户头像展示',
    docs: 'Avatar组件基于Radix UI Avatar构建，支持图片、占位符和fallback。包含Avatar、AvatarImage、AvatarFallback等子组件。',
    props: [
      { name: 'src', type: 'string', description: '头像图片URL' },
      { name: 'alt', type: 'string', description: '图片描述' },
      { name: 'fallback', type: 'ReactNode', description: '加载失败时的备用内容' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '头像尺寸' },
    ],
    dependencies: [],
    tags: ['数据', '头像', '用户'],
  },
  {
    name: 'Progress',
    slug: 'progress',
    category: 'data',
    description: '进度条组件，任务进度展示',
    docs: 'Progress组件基于Radix UI Progress构建，显示任务或操作的完成进度。',
    props: [
      { name: 'value', type: 'number', description: '当前进度值(0-100)' },
      { name: 'max', type: 'number', default: '100', description: '最大值' },
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['数据', '进度', '状态'],
  },
  {
    name: 'Calendar',
    slug: 'calendar',
    category: 'data',
    description: '日历组件，日期选择展示',
    docs: 'Calendar组件基于react-day-picker构建，提供日历视图和日期选择功能。',
    props: [
      { name: 'mode', type: "'single' | 'multiple' | 'range'", default: 'single', description: '选择模式' },
      { name: 'selected', type: 'Date | Date[]', description: '选中的日期' },
      { name: 'onSelect', type: 'function', description: '日期选择回调' },
      { name: 'disabled', type: 'Date[] | function', description: '禁用的日期' },
    ],
    dependencies: [],
    tags: ['数据', '日期', '选择'],
  },
  {
    name: 'Chart',
    slug: 'chart',
    category: 'data',
    description: '图表组件，数据可视化',
    docs: 'Chart组件基于recharts构建，提供多种图表类型。包含ChartContainer、ChartTooltip、ChartLegend等辅助组件。',
    props: [
      { name: 'config', type: 'ChartConfig', required: true, description: '图表配置' },
      { name: 'children', type: 'ReactNode', required: true, description: '图表内容' },
    ],
    dependencies: [],
    tags: ['数据', '图表', '可视化'],
  },

  // ========== 高级组件 ==========
  {
    name: 'Command',
    slug: 'command',
    category: 'advanced',
    description: '命令面板组件，快速搜索和操作',
    docs: 'Command组件基于cmdk构建，提供命令面板功能，支持搜索、过滤和键盘导航。包含Command、CommandInput、CommandList、CommandItem等子组件。',
    props: [
      { name: 'value', type: 'string', description: '当前选中项' },
      { name: 'onValueChange', type: 'function', description: '值变化回调' },
      { name: 'placeholder', type: 'string', description: '搜索占位文本' },
    ],
    dependencies: ['Dialog'],
    tags: ['高级', '搜索', '命令'],
  },
  {
    name: 'ContextMenu',
    slug: 'context-menu',
    category: 'advanced',
    description: '右键菜单组件，上下文操作',
    docs: 'ContextMenu组件基于Radix UI Context Menu构建，提供右键上下文菜单。包含ContextMenu、ContextMenuTrigger、ContextMenuContent、ContextMenuItem等子组件。',
    props: [
      { name: 'className', type: 'string', description: '额外CSS类名' },
    ],
    dependencies: [],
    tags: ['高级', '菜单', '右键'],
  },
  {
    name: 'DropdownMenu',
    slug: 'dropdown-menu',
    category: 'advanced',
    description: '下拉菜单组件，操作列表',
    docs: 'DropdownMenu组件基于Radix UI Dropdown Menu构建，提供下拉操作菜单。包含DropdownMenu、DropdownMenuTrigger、DropdownMenuContent、DropdownMenuItem等子组件。',
    props: [
      { name: 'open', type: 'boolean', description: '菜单打开状态' },
      { name: 'onOpenChange', type: 'function', description: '状态变化回调' },
    ],
    dependencies: [],
    tags: ['高级', '菜单', '下拉'],
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    category: 'advanced',
    description: '切换按钮组件，独立触发器',
    docs: 'Toggle组件基于Radix UI Toggle构建，提供可切换状态的按钮。适用于工具栏按钮等场景。',
    props: [
      { name: 'pressed', type: 'boolean', description: '按下状态' },
      { name: 'onPressedChange', type: 'function', description: '状态变化回调' },
      { name: 'variant', type: "'default' | 'outline'", default: 'default', description: '变体样式' },
      { name: 'size', type: "'default' | 'sm' | 'lg'", default: 'default', description: '尺寸' },
    ],
    dependencies: [],
    tags: ['高级', '按钮', '切换'],
  },
  {
    name: 'ToggleGroup',
    slug: 'toggle-group',
    category: 'advanced',
    description: '切换按钮组组件，多选或单选组',
    docs: 'ToggleGroup组件基于Radix UI Toggle Group构建，提供一组可切换的按钮。支持单选和多选模式。',
    props: [
      { name: 'type', type: "'single' | 'multiple'", default: 'single', description: '选择模式' },
      { name: 'value', type: 'string | string[]', description: '当前选中值' },
      { name: 'onValueChange', type: 'function', description: '值变化回调' },
    ],
    dependencies: ['Toggle'],
    tags: ['高级', '按钮', '组合'],
  },
  {
    name: 'Carousel',
    slug: 'carousel',
    category: 'advanced',
    description: '轮播组件，内容滑动展示',
    docs: 'Carousel组件基于embla-carousel-react构建，提供轮播滑动功能。包含Carousel、CarouselContent、CarouselItem、CarouselPrevious、CarouselNext等子组件。',
    props: [
      { name: 'opts', type: 'EmblaOptionsType', description: 'Embla配置选项' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: '滚动方向' },
    ],
    dependencies: ['Button'],
    tags: ['高级', '轮播', '滑动'],
  },
  {
    name: 'InputOTP',
    slug: 'input-otp',
    category: 'advanced',
    description: 'OTP输入组件，验证码输入',
    docs: 'InputOTP组件提供OTP验证码输入功能。包含InputOTP、InputOTPGroup、InputOTPSlot、InputOTPSeparator等子组件。',
    props: [
      { name: 'value', type: 'string', description: '当前输入值' },
      { name: 'onChange', type: 'function', description: '值变化回调' },
      { name: 'maxLength', type: 'number', required: true, description: '最大长度' },
    ],
    dependencies: [],
    tags: ['高级', '输入', '验证码'],
  },
]

// 工具函数：获取所有分类
export function getCategories(): ComponentCategory[] {
  return [...new Set(componentRegistry.map(c => c.category))]
}

// 工具函数：按分类获取组件
export function getComponentsByCategory(category: ComponentCategory): ComponentMeta[] {
  return componentRegistry.filter(c => c.category === category)
}

// 工具函数：根据slug获取组件
export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return componentRegistry.find(c => c.slug === slug)
}

// 工具函数：搜索组件
export function searchComponents(query: string): ComponentMeta[] {
  const lowerQuery = query.toLowerCase()
  return componentRegistry.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.tags.some(t => t.toLowerCase().includes(lowerQuery))
  )
}
