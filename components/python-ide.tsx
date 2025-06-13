"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, RotateCcw, Code, Download, Settings, Key, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const defaultCode = `# Welcome to Real Python Compiler!
# This uses Judge0 API for actual Python execution

print("Hello, World!")
print("This is running on a real Python interpreter!")

# Try some Python features
import math
print(f"Square root of 16: {math.sqrt(16)}")

# Lists and loops
numbers = [1, 2, 3, 4, 5]
print("Numbers:", numbers)

for num in numbers:
    print(f"Square of {num} is {num**2}")

# Dictionary example
person = {"name": "CodeMaster", "age": 25}
print(f"Person: {person['name']}, Age: {person['age']}")
`

export function PythonIDE() {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [tempApiKey, setTempApiKey] = useState("")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [userInput, setUserInput] = useState("")

  // Judge0 API configuration
  const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com"

  const executeCode = async (sourceCode: string, apiKey: string, stdin = "") => {
    try {
      const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          language_id: 71, // Python 3
          source_code: sourceCode,
          stdin: stdin,
        }),
      })

      if (!submitResponse.ok) {
        throw new Error(`HTTP error! status: ${submitResponse.status}`)
      }

      const submitResult = await submitResponse.json()
      const token = submitResult.token

      let attempts = 0
      const maxAttempts = 30

      while (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const resultResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`, {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        })

        if (!resultResponse.ok) {
          throw new Error(`HTTP error! status: ${resultResponse.status}`)
        }

        const result = await resultResponse.json()

        if (result.status.id >= 3) {
          return {
            stdout: result.stdout || "",
            stderr: result.stderr || "",
            compile_output: result.compile_output || "",
            status: result.status.description,
            time: result.time,
            memory: result.memory,
          }
        }

        attempts++
      }

      throw new Error("Execution timeout - code took too long to execute")
    } catch (error) {
      throw error
    }
  }

  const runCode = async () => {
    if (!apiKey.trim()) {
      setOutput(
        "❌ Error: Please configure your Judge0 API key first.\n\nClick the Settings button to add your API key.\n\nGet a free API key at: https://rapidapi.com/judge0-official/api/judge0-ce",
      )
      return
    }

    setIsRunning(true)
    setOutput("🔄 Compiling and executing code...\nPlease wait, this may take a few seconds...\n")

    try {
      const result = await executeCode(code, apiKey, userInput)

      let outputText = ""

      if (result.stdout) {
        outputText += "📤 Output:\n" + result.stdout + "\n"
      }

      if (result.stderr) {
        outputText += "❌ Error:\n" + result.stderr + "\n"
      }

      if (result.compile_output) {
        outputText += "⚠️ Compilation:\n" + result.compile_output + "\n"
      }

      outputText += `\n📊 Execution Stats:\n`
      outputText += `Status: ${result.status}\n`
      outputText += `Time: ${result.time || "N/A"}s\n`
      outputText += `Memory: ${result.memory || "N/A"}KB\n`

      if (!result.stdout && !result.stderr && !result.compile_output) {
        outputText = "✅ Code executed successfully!\n(No output produced)\n\n" + outputText
      }

      setOutput(outputText)
    } catch (error) {
      let errorMessage = "❌ Execution Error:\n"

      if (error instanceof Error) {
        if (error.message.includes("401")) {
          errorMessage += "Invalid API key. Please check your Judge0 API key.\n"
        } else if (error.message.includes("429")) {
          errorMessage += "Rate limit exceeded. Please wait a moment and try again.\n"
        } else if (error.message.includes("timeout")) {
          errorMessage += "Code execution timed out. Your code may have an infinite loop.\n"
        } else {
          errorMessage += error.message + "\n"
        }
      } else {
        errorMessage += "Unknown error occurred.\n"
      }

      errorMessage += "\nTroubleshooting:\n"
      errorMessage += "• Check your internet connection\n"
      errorMessage += "• Verify your API key is correct\n"
      errorMessage += "• Ensure your code doesn't have infinite loops\n"

      setOutput(errorMessage)
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(defaultCode)
    setOutput("")
    setUserInput("")
  }

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newCode = code.substring(0, start) + "    " + code.substring(end)
      setCode(newCode)

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4
        }
      }, 0)
    }
  }

  const saveCode = () => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "python_code.py"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const saveApiKey = () => {
    setApiKey(tempApiKey)
    localStorage.setItem("judge0-api-key", tempApiKey)
    setIsSettingsOpen(false)
    setOutput("✅ API key saved successfully! You can now run Python code.\n")
  }

  // Load API key on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("judge0-api-key")
      if (savedKey) {
        setApiKey(savedKey)
        setTempApiKey(savedKey)
      } else {
        const defaultKey = "dd0b210493msh545537390d8ee21p1bd18cjsn9ed08389dce0"
        setApiKey(defaultKey)
        setTempApiKey(defaultKey)
        localStorage.setItem("judge0-api-key", defaultKey)
      }
    } else {
      // Default key for server-side rendering
      const defaultKey = "dd0b210493msh545537390d8ee21p1bd18cjsn9ed08389dce0"
      setApiKey(defaultKey)
      setTempApiKey(defaultKey)
    }
  }, [])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* API Configuration Notice */}
      <Card className={`${apiKey ? "bg-green-900/20 border-green-700" : "bg-yellow-900/20 border-yellow-700"}`}>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <p className={`${apiKey ? "text-green-300" : "text-yellow-300"} text-xs sm:text-sm leading-relaxed`}>
                {apiKey ? (
                  <>
                    <strong>✅ Real Python Compiler Active:</strong> Using Judge0 API for actual Python execution with
                    full library support. API key is configured and ready to use.
                  </>
                ) : (
                  <>
                    <strong>⚠️ API Key Required:</strong> Configure your Judge0 API key to run real Python code with full
                    library support.
                  </>
                )}
              </p>
            </div>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 w-full sm:w-auto"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {apiKey ? "Update API Key" : "Configure API"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 mx-4 max-w-md sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-white">Configure Judge0 API Key</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Judge0 API Key</Label>
                    <Input
                      type="password"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      placeholder="Enter your Judge0 API key"
                      className="bg-gray-800 border-gray-600 text-white mt-2"
                    />
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">How to get a free API key:</h4>
                    <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                      <li>
                        Visit{" "}
                        <a
                          href="https://rapidapi.com/judge0-official/api/judge0-ce"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          RapidAPI Judge0
                        </a>
                      </li>
                      <li>Sign up for a free account</li>
                      <li>Subscribe to the free plan (500 requests/month)</li>
                      <li>Copy your API key from the dashboard</li>
                      <li>Paste it here and click Save</li>
                    </ol>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button
                      onClick={saveApiKey}
                      disabled={!tempApiKey.trim()}
                      className="bg-green-600 hover:bg-green-700 flex-1"
                    >
                      <Key className="mr-2 h-4 w-4" />
                      Save API Key
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsSettingsOpen(false)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm sm:text-base">Program Input</CardTitle>
          <CardDescription className="text-gray-300 text-xs sm:text-sm">
            If your program uses input(), provide the input values here (one per line)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="min-h-[80px] sm:min-h-[100px] bg-gray-900 border-gray-600 text-gray-100 font-mono text-xs sm:text-sm"
            placeholder="Enter input values here (one per line)&#10;Example:&#10;25&#10;John&#10;yes"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Code Editor */}
        <div className="w-full min-w-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center text-sm sm:text-base">
                <Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Python Code Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <Textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleTabKey}
                className="min-h-[300px] sm:min-h-[400px] w-full bg-gray-900 border-gray-600 text-gray-100 font-mono text-xs sm:text-sm resize-none"
                placeholder="Write your Python code here..."
              />
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                <Button
                  onClick={runCode}
                  disabled={isRunning || !apiKey}
                  className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
                <Button
                  onClick={resetCode}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 sm:flex-none"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button
                  onClick={saveCode}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 sm:flex-none"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Save Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="w-full min-w-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm sm:text-base">Console Output</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 sm:p-4 min-h-[300px] sm:min-h-[400px] overflow-auto">
                <pre className="text-gray-100 font-mono text-xs sm:text-sm whitespace-pre-wrap break-words">
                  {output ||
                    "Click 'Run Code' to execute your Python program...\n\n💡 This compiler supports:\n• All Python standard libraries\n• Real-time execution\n• Error reporting\n• Performance metrics"}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Example Code Snippets */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm sm:text-base">Example Code Snippets</CardTitle>
          <CardDescription className="text-gray-300 text-xs sm:text-sm">
            Click on an example to load it into the editor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="border-gray-600 text-left h-auto py-3 px-4 hover:bg-gray-700 w-full"
              onClick={() =>
                setCode(`# Basic Python Operations
print("Welcome to Python!")

# Variables
name = "CodeMaster"
age = 25
print(f"Hello, {name}!")
print(f"You are {age} years old")

# Math operations
x = 10
y = 5
print(f"x + y = {x + y}")
print(f"x - y = {x - y}")
print(f"x * y = {x * y}")`)
              }
            >
              <div className="w-full">
                <h4 className="font-medium text-blue-400 text-sm">Basic Operations</h4>
                <p className="text-xs text-gray-400 mt-1">Variables and simple math</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-gray-600 text-left h-auto py-3 px-4 hover:bg-gray-700 w-full"
              onClick={() =>
                setCode(`# Loops and Conditions
print("Counting from 1 to 5:")
for i in range(1, 6):
    print(f"Number: {i}")

print("\\nEven numbers from 0 to 10:")
for i in range(0, 11):
    if i % 2 == 0:
        print(f"Even: {i}")

print("\\nLoop completed!")`)
              }
            >
              <div className="w-full">
                <h4 className="font-medium text-green-400 text-sm">Loops & Conditions</h4>
                <p className="text-xs text-gray-400 mt-1">For loops and if statements</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-gray-600 text-left h-auto py-3 px-4 hover:bg-gray-700 w-full"
              onClick={() =>
                setCode(`# Working with Lists
fruits = ["apple", "banana", "orange"]
print("Fruits list:")
for fruit in fruits:
    print(f"- {fruit}")

# List operations
fruits.append("grape")
print(f"\\nAfter adding grape: {fruits}")
print(f"Total fruits: {len(fruits)}")

# Simple function
def greet(name):
    return f"Hello, {name}!"

print(f"\\n{greet('Python')}")`)
              }
            >
              <div className="w-full">
                <h4 className="font-medium text-purple-400 text-sm">Lists & Functions</h4>
                <p className="text-xs text-gray-400 mt-1">Data structures and functions</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* External IDEs */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-center text-sm sm:text-base">Full-Featured Python IDEs</CardTitle>
          <CardDescription className="text-center text-gray-300 text-xs sm:text-sm">
            For complete Python development with all features and libraries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <a
              href="https://replit.com/languages/python3"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Replit</h4>
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-white" />
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                Full-featured online IDE with collaboration and packages
              </p>
            </a>
            <a
              href="https://trinket.io/python"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Trinket</h4>
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-white" />
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">Simple Python editor perfect for learning and teaching</p>
            </a>
            <a
              href="https://www.programiz.com/python-programming/online-compiler/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Programiz</h4>
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-white" />
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">Online Python compiler with examples and tutorials</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
