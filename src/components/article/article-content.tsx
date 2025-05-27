'use client'

import { useState } from 'react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'
import { generateHeadingId } from '@/utils'
import { Check, Copy } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'


interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const { theme } = useTheme()
  const syntaxTheme = theme === 'dark' ? tomorrow : oneLight

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          h1: ({ children }) => {
            const id = createSlug(children as string)
            return <h1 id={id}>{children}</h1>
          },
          h2: ({ children }) => {
            const id = createSlug(children as string)
            return <h2 id={id}>{children}</h2>
          },
          h3: ({ children }) => {
            const id = createSlug(children as string)
            return <h3 id={id}>{children}</h3>
          },
          h4: ({ children }) => {
            const id = createSlug(children as string)
            return <h4 id={id}>{children}</h4>
          },
          h5: ({ children }) => {
            const id = createSlug(children as string)
            return <h5 id={id}>{children}</h5>
          },
          h6: ({ children }) => {
            const id = createSlug(children as string)
            return <h6 id={id}>{children}</h6>
          },
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''

            if (!inline && language) {
              return (
                <div className="relative group">
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton text={String(children)} />
                  </div>
                  {language && (
                    <div className="absolute right-2 top-2 text-xs text-muted-foreground opacity-50 group-hover:opacity-0 transition-opacity">
                      {language}
                    </div>
                  )}
                  <SyntaxHighlighter
                    style={syntaxTheme}
                    language={language}
                    PreTag="div"
                    {...props}
                    customStyle={{
                      marginTop: '1.25em',
                      marginBottom: '1.25em',
                      padding: '1em',
                      borderRadius: '0.5rem'
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              )
            }

            return (
              <code className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', className)} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </Markdown>
    </article>
  )
}

function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <button
      className={cn(
        'flex h-7 w-7 items-center justify-center rounded-md transition-all',
        'bg-background/30 hover:bg-background/50 backdrop-blur-xs',
        'text-muted-foreground hover:text-foreground',
        'border border-border/50 hover:border-border',
        'focus:outline-hidden focus:ring-2 focus:ring-primary/20'
      )}
      onClick={copy}
    >
      {isCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      <span className="sr-only">Copy code</span>
    </button>
  )
}

// Helper function to create slug IDs from heading text
function createSlug(text: string): string {
  if (typeof text !== 'string') return ''
  return generateHeadingId(text)
}