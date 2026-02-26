'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check, Code2, Eye } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  title?: string
  isDark?: boolean
}

export function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = true,
  title,
  isDark = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border bg-muted/30">
      {title && (
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/50 text-sm font-medium">
          <Code2 className="w-4 h-4" />
          {title}
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            background: isDark ? '#1e1e1e' : '#fafafa',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: isDark ? '#6e7681' : '#999',
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
          onClick={copyCode}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

interface ComponentPreviewProps {
  children: React.ReactNode
  code?: string
  title?: string
  description?: string
}

export function ComponentPreview({
  children,
  code,
  title,
  description,
}: ComponentPreviewProps) {
  const [view, setView] = useState<'preview' | 'code'>('preview')

  return (
    <div className="rounded-lg border overflow-hidden">
      {(title || description) && (
        <div className="px-4 py-3 border-b bg-muted/30">
          {title && <h3 className="font-semibold">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="flex border-b bg-muted/20">
        <Button
          variant={view === 'preview' ? 'secondary' : 'ghost'}
          size="sm"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          onClick={() => setView('preview')}
        >
          <Eye className="w-4 h-4 mr-2" />
          预览
        </Button>
        <Button
          variant={view === 'code' ? 'secondary' : 'ghost'}
          size="sm"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          onClick={() => setView('code')}
        >
          <Code2 className="w-4 h-4 mr-2" />
          代码
        </Button>
      </div>
      <div className="relative">
        {view === 'preview' ? (
          <div className="p-6 flex items-center justify-center min-h-[200px] bg-background">
            {children}
          </div>
        ) : (
          code && (
            <div className="max-h-[400px] overflow-auto">
              <CodeBlock code={code} language="tsx" showLineNumbers />
            </div>
          )
        )}
      </div>
    </div>
  )
}
