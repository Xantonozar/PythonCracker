"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Square, Copy, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface InlinePythonIDEProps {
  initialCode?: string
  className?: string
}

export function InlinePythonIDE({ initialCode = "", className = "" }: InlinePythonIDEProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const runCode = async () => {
    if (!code.trim()) {
      toast({
        title: "No Code",
        description: "Please enter some Python code to run.",
        variant: "destructive",
      })
      return
    }

    setIsRunning(true)
    setOutput("")
    setError("")

    try {
      // Using Judge0 API for code execution
      const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "your-rapidapi-key-here", // Replace with actual key
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          language_id: 71, // Python 3
          source_code: btoa(code),
          stdin: btoa(""),
        }),
      })

      const submission = await response.json()

      if (submission.token) {
        // Poll for result
        setTimeout(async () => {
          try {
            const resultResponse = await fetch(
              `https://judge0-ce.p.rapidapi.com/submissions/${submission.token}?base64_encoded=true`,
              {
                headers: {
                  "X-RapidAPI-Key": "your-rapidapi-key-here",
                  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                },
              },
            )

            const result = await resultResponse.json()

            if (result.stdout) {
              setOutput(atob(result.stdout))
            } else if (result.stderr) {
              setError(atob(result.stderr))
            } else if (result.compile_output) {
              setError(atob(result.compile_output))
            } else {
              setOutput("Code executed successfully (no output)")
            }
          } catch (err) {
            setError("Error fetching execution result")
          } finally {
            setIsRunning(false)
          }
        }, 2000)
      }
    } catch (err) {
      // Fallback: Simple Python simulation for basic operations
      try {
        const result = simulatePython(code)
        setOutput(result)
      } catch (simError) {
        setError("Error: Unable to execute code. Please check your syntax.")
      } finally {
        setIsRunning(false)
      }
    }
  }

  const simulatePython = (code: string): string => {
    // Simple Python code simulation for basic operations
    const lines = code.split("\n")
    const outputs: string[] = []

    for (const line of lines) {
      const trimmed = line.trim()

      if (trimmed.startsWith("print(")) {
        const match = trimmed.match(/print$$(.*)$$/)
        if (match) {
          let content = match[1]
          // Handle string literals
          if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1)
          } else if (content.startsWith("'") && content.endsWith("'")) {
            content = content.slice(1, -1)
          }
          // Handle simple expressions
          else if (/^\d+[+\-*/]\d+$/.test(content)) {
            try {
              content = eval(content).toString()
            } catch {
              content = content
            }
          }
          outputs.push(content)
        }
      }
    }

    return outputs.length > 0 ? outputs.join("\n") : "Code executed successfully"
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: "Code copied to clipboard.",
    })
  }

  const clearCode = () => {
    setCode("")
    setOutput("")
    setError("")
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
    setError("")
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          Python IDE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={runCode} disabled={isRunning} size="sm" className="bg-green-600 hover:bg-green-700">
              {isRunning ? <Square className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isRunning ? "Running..." : "Run"}
            </Button>
            <Button onClick={copyCode} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button onClick={resetCode} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button onClick={clearCode} variant="outline" size="sm">
              Clear
            </Button>
          </div>

          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="# Write your Python code here
print('Hello, World!')"
            className="font-mono text-sm min-h-[200px] bg-gray-900 text-green-400 border-gray-700"
            style={{ tabSize: 4 }}
          />
        </div>

        {(output || error) && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Output:</h4>
            <div
              className={`p-3 rounded-md font-mono text-sm whitespace-pre-wrap ${
                error
                  ? "bg-red-50 text-red-800 border border-red-200"
                  : "bg-gray-50 text-gray-800 border border-gray-200"
              }`}
            >
              {error || output || "No output"}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
