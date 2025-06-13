import type React from "react"

interface CodeBlockProps {
  code: string
  language: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  // Replace # comments with ?? comments
  const processedCode = language === "python" ? code.replace(/#/g, "??") : code

  return (
    <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto font-mono border border-slate-800">
      <pre className="text-slate-300 text-sm leading-relaxed">
        <code>
          {processedCode.split("\n").map((line, i) => {
            // Enhanced syntax highlighting for Python
            if (language === "python") {
              // Keywords with more vibrant colors
              const keywords = [
                "if",
                "else",
                "elif",
                "for",
                "while",
                "in",
                "def",
                "return",
                "class",
                "import",
                "from",
                "as",
                "True",
                "False",
                "None",
                "and",
                "or",
                "not",
                "is",
                "continue",
                "break",
                "try",
                "except",
                "finally",
                "with",
                "print",
              ]

              // Apply enhanced syntax highlighting
              let highlightedLine = line

              // Highlight comments with a more vibrant color
              if (line.includes("??")) {
                const commentStart = line.indexOf("??")
                const beforeComment = line.substring(0, commentStart)
                const comment = line.substring(commentStart)
                highlightedLine = beforeComment + `<span class="text-lime-500 italic">${comment}</span>`
              }

              // Highlight keywords with more vibrant colors
              keywords.forEach((keyword) => {
                const regex = new RegExp(`\\b${keyword}\\b`, "g")
                highlightedLine = highlightedLine.replace(
                  regex,
                  `<span class="text-pink-400 font-semibold">${keyword}</span>`,
                )
              })

              // Highlight string literals with more vibrant colors
              highlightedLine = highlightedLine.replace(
                /(".*?")|('.*?')/g,
                (match) => `<span class="text-yellow-400">${match}</span>`,
              )

              // Highlight numbers with more vibrant colors
              highlightedLine = highlightedLine.replace(
                /\b(\d+(\.\d+)?)\b/g,
                (match) => `<span class="text-cyan-400 font-semibold">${match}</span>`,
              )

              // Highlight function calls
              highlightedLine = highlightedLine.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, (match, funcName) => {
                // Don't highlight keywords that might be followed by parentheses
                if (keywords.includes(funcName)) {
                  return match
                }
                return `<span class="text-blue-400">${funcName}</span>(`
              })

              // Highlight operators
              highlightedLine = highlightedLine.replace(
                /([+\-*/%=<>!&|^~]|==|!=|<=|>=|\/\/|\*\*)/g,
                (match) => `<span class="text-orange-400">${match}</span>`,
              )

              return (
                <div key={i} className="line hover:bg-slate-900/50 px-2 -mx-2 rounded">
                  <span className="text-slate-600 mr-4 select-none">{(i + 1).toString().padStart(2, "0")}</span>
                  <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
                </div>
              )
            }

            // Default rendering for other languages
            return (
              <div key={i} className="line hover:bg-slate-900/50 px-2 -mx-2 rounded">
                <span className="text-slate-600 mr-4 select-none">{(i + 1).toString().padStart(2, "0")}</span>
                {line}
              </div>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
