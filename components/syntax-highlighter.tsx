"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface SyntaxHighlighterProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function SyntaxHighlighter({
  code,
  language = "python",
  showLineNumbers = true,
  className = "",
}: SyntaxHighlighterProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Code copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy code.",
        variant: "destructive",
      })
    }
  }

  const formatCode = (code: string) => {
    const lines = code.split("\n")
    return lines.map((line, index) => {
      const lineNumber = index + 1
      const formattedLine = highlightPythonSyntax(line)

      return (
        <div key={index} className="flex">
          {showLineNumbers && (
            <span className="select-none text-gray-500 text-right pr-4 w-12 flex-shrink-0 text-sm">{lineNumber}</span>
          )}
          <span className="flex-1 text-sm">
            <code dangerouslySetInnerHTML={{ __html: formattedLine }} />
          </span>
        </div>
      )
    })
  }

  const highlightPythonSyntax = (line: string): string => {
    // Simple Python syntax highlighting
    let highlighted = line

    // Keywords
    const keywords = [
      "def",
      "class",
      "if",
      "elif",
      "else",
      "for",
      "while",
      "try",
      "except",
      "finally",
      "with",
      "as",
      "import",
      "from",
      "return",
      "yield",
      "break",
      "continue",
      "pass",
      "and",
      "or",
      "not",
      "in",
      "is",
      "lambda",
      "global",
      "nonlocal",
      "True",
      "False",
      "None",
    ]

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g")
      highlighted = highlighted.replace(regex, `<span class="text-blue-600 font-semibold">${keyword}</span>`)
    })

    // Strings
    highlighted = highlighted.replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-600">$1$2$1</span>')

    // Comments
    highlighted = highlighted.replace(/#.*/g, '<span class="text-gray-500 italic">$&</span>')

    // Numbers
    highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="text-purple-600">$&</span>')

    // Functions
    highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="text-yellow-600">$1</span>(')

    return highlighted
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          onClick={copyToClipboard}
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
        >
          {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700 capitalize">{language}</span>
        </div>

        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed">{formatCode(code)}</pre>
        </div>
      </div>
    </div>
  )
}
