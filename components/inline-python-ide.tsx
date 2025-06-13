"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play, RotateCcw, X, Lightbulb, Copy } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface InlinePythonIDEProps {
  problemTitle: string
  problemDescription: string
  category: "basic" | "intermediate" | "advanced"
  onClose: () => void
}

const practiceExercises = {
  basic: [
    {
      title: "Hello World Practice",
      code: `# Practice: Print your name and age
# Example: print("My name is John and I am 25 years old")

`,
      hint: "Use print() function to display text. Use f-strings for variables: f'My name is {name}'",
    },
    {
      title: "Simple Calculator",
      code: `# Practice: Create a simple addition calculator
# Ask user for two numbers and show their sum

`,
      hint: "Use input() to get user input, float() to convert to numbers, and print() to show result",
    },
    {
      title: "Even or Odd",
      code: `# Practice: Check if a number is even or odd
# Ask user for a number and tell them if it's even or odd

`,
      hint: "Use the modulo operator (%) to check if number % 2 == 0",
    },
  ],
  intermediate: [
    {
      title: "Loop Practice",
      code: `# Practice: Print numbers from 1 to 10 with their squares
# Example output: "1 squared is 1", "2 squared is 4", etc.

`,
      hint: "Use a for loop with range(1, 11) and calculate square with **2",
    },
    {
      title: "List Operations",
      code: `# Practice: Work with a list of fruits
# Create a list, add items, and print each fruit with its position

fruits = ["apple", "banana"]
# Add your code here

`,
      hint: "Use append() to add items, and enumerate() to get position and value",
    },
    {
      title: "Pattern Generator",
      code: `# Practice: Create a simple star pattern
# Print:
# *
# **
# ***
# ****

`,
      hint: "Use nested loops or string multiplication: '*' * i",
    },
  ],
  advanced: [
    {
      title: "Function Practice",
      code: `# Practice: Create a function to calculate factorial
# def factorial(n):
#     # Your code here

# Test your function
print(factorial(5))  # Should print 120

`,
      hint: "Use a loop or recursion. Factorial of n = n * (n-1) * (n-2) * ... * 1",
    },
    {
      title: "Dictionary Operations",
      code: `# Practice: Create a student grade tracker
# Store student names and grades, calculate average

students = {}
# Add your code here to:
# 1. Add students and grades
# 2. Calculate and print average grade

`,
      hint: "Use dictionary methods like .items(), sum(), and len() for calculations",
    },
    {
      title: "Class Practice",
      code: `# Practice: Create a simple Car class
# class Car:
#     def __init__(self, brand, model):
#         # Your code here
#     
#     def start_engine(self):
#         # Your code here

# Create a car and start its engine

`,
      hint: "Use self to refer to instance variables. Initialize attributes in __init__",
    },
  ],
}

export function InlinePythonIDE({ problemTitle, problemDescription, category, onClose }: InlinePythonIDEProps) {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userInput, setUserInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  const exercises = practiceExercises[category]
  const exercise = exercises[currentExercise]

  // Default API key
  const API_KEY = "dd0b210493msh545537390d8ee21p1bd18cjsn9ed08389dce0"
  const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com"

  useEffect(() => {
    setCode(exercise.code)
    setOutput("")
    setUserInput("")
  }, [currentExercise, exercise.code])

  const executeCode = async (sourceCode: string, stdin = "") => {
    try {
      const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": API_KEY,
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
      const maxAttempts = 20

      while (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const resultResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`, {
          headers: {
            "X-RapidAPI-Key": API_KEY,
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
            status: result.status.description,
          }
        }

        attempts++
      }

      throw new Error("Execution timeout")
    } catch (error) {
      throw error
    }
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput("🔄 Running your code...\n")

    try {
      const result = await executeCode(code, userInput)

      let outputText = ""

      if (result.stdout) {
        outputText += "📤 Output:\n" + result.stdout + "\n"
      }

      if (result.stderr) {
        outputText += "❌ Error:\n" + result.stderr + "\n"
      }

      if (!result.stdout && !result.stderr) {
        outputText = "✅ Code executed successfully!\n(No output produced)\n"
      }

      setOutput(outputText)
    } catch (error) {
      let errorMessage = "❌ Execution Error:\n"
      if (error instanceof Error) {
        errorMessage += error.message + "\n"
      }
      setOutput(errorMessage)
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(exercise.code)
    setOutput("")
    setUserInput("")
  }

  const copyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast({
          title: "Code copied!",
          description: "The code has been copied to your clipboard.",
        })
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Failed to copy code to clipboard.",
          variant: "destructive",
        })
      })
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

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    }
  }

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-base sm:text-lg font-semibold text-white leading-tight truncate">{problemTitle}</h4>
          <p className="text-xs sm:text-sm text-gray-400">Try these exercises to practice the concepts</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white self-end sm:self-auto shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Exercise Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-900/50 p-3 rounded-lg gap-3">
        <div className="flex-1 min-w-0">
          <h5 className="text-white font-medium text-sm sm:text-base truncate">{exercise.title}</h5>
          <p className="text-xs text-gray-400">
            Exercise {currentExercise + 1} of {exercises.length}
          </p>
        </div>
        <div className="flex space-x-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={prevExercise}
            disabled={currentExercise === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 sm:flex-none text-xs"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextExercise}
            disabled={currentExercise === exercises.length - 1}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 sm:flex-none text-xs"
          >
            Next
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="space-y-4 w-full min-w-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm">Code Editor</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs shrink-0"
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <Textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleTabKey}
                className="min-h-[200px] sm:min-h-[250px] w-full bg-gray-900 border-gray-600 text-gray-100 font-mono text-xs sm:text-sm resize-none"
                placeholder="Write your Python code here..."
              />
              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                  size="sm"
                >
                  <Play className="mr-2 h-3 w-3" />
                  {isRunning ? "Running..." : "Run"}
                </Button>
                <Button
                  onClick={resetCode}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 sm:flex-none"
                  size="sm"
                >
                  <RotateCcw className="mr-2 h-3 w-3" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Input Section */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Program Input</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <Label className="text-gray-300 text-xs mb-2 block">
                If your program uses input(), provide the input values here (one per line):
              </Label>
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[60px] sm:min-h-[80px] w-full bg-gray-900 border-gray-600 text-gray-100 font-mono text-xs sm:text-sm resize-none"
                placeholder="Enter input values here (one per line)&#10;Example:&#10;25&#10;John"
              />
            </CardContent>
          </Card>
        </div>

        {/* Output and Hint */}
        <div className="space-y-4 w-full min-w-0">
          {/* Output */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Output</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 min-h-[150px] sm:min-h-[200px] overflow-auto">
                <pre className="text-gray-100 font-mono text-xs whitespace-pre-wrap break-words">
                  {output || "Click 'Run' to execute your code..."}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Hint */}
          <Card className="bg-blue-900/20 border-blue-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-300 text-sm flex items-center">
                <Lightbulb className="mr-2 h-4 w-4 shrink-0" />
                Hint
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <p className="text-blue-200 text-xs sm:text-sm leading-relaxed">{exercise.hint}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
