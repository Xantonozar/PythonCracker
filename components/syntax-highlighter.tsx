"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SyntaxHighlighterProps {
  code: string
  language?: string
  showCopyButton?: boolean
}

export function SyntaxHighlighter({ code, language = "python", showCopyButton = true }: SyntaxHighlighterProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const cleanCode = code
    .replace(/^\s*#.*$/gm, "")
    .replace(/\n\s*\n/g, "\n")
    .trim()

  const lines = cleanCode.split("\n")

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast({
        title: "Code copied!",
        description: "The code has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="relative bg-[#0d1117] border border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#161b22] px-4 py-2 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm ml-4">solution.py</span>
        </div>
        {showCopyButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white hover:bg-gray-700 h-8 px-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <div className="flex">
          {/* Line Numbers */}
          <div className="bg-[#0d1117] px-3 py-4 border-r border-gray-700 select-none">
            <div className="text-gray-500 text-sm font-mono leading-6">
              {lines.map((_, index) => (
                <div key={index} className="text-right min-h-[24px] flex items-center justify-end">
                  {(index + 1).toString().padStart(2, " ")}
                </div>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="flex-1 p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 leading-6 font-mono">
              <code>
                {lines.map((line, index) => (
                  <div key={index} className="min-h-[24px] flex items-center">
                    <span className="whitespace-pre">{line || " "}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
