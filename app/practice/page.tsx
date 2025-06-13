"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Play, Eye, EyeOff, Copy, CheckCircle, Home, Menu, X } from "lucide-react"
import { InlinePythonIDE } from "@/components/inline-python-ide"
import { SyntaxHighlighter } from "@/components/syntax-highlighter"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Problem {
  id: number
  title: string
  description: string
  difficulty: "Basic" | "Intermediate" | "Advanced"
  solution: string
  hint: string
}

const practiceProblems: Problem[] = [
  {
    id: 1,
    title: "Hello World",
    description: "Write a program that prints 'Hello, World!' to the console.",
    difficulty: "Basic",
    solution: `print("Hello, World!")`,
    hint: "Use the print() function to display text.",
  },
  {
    id: 2,
    title: "Sum of Two Numbers",
    description: "Write a function that takes two numbers and returns their sum.",
    difficulty: "Basic",
    solution: `def add_numbers(a, b):
    return a + b

# Example usage
result = add_numbers(5, 3)
print(f"The sum is: {result}")`,
    hint: "Define a function with two parameters and return their sum.",
  },
  {
    id: 3,
    title: "Even or Odd",
    description: "Write a program that checks if a number is even or odd.",
    difficulty: "Basic",
    solution: `def check_even_odd(number):
    if number % 2 == 0:
        return "Even"
    else:
        return "Odd"

# Example usage
num = 7
result = check_even_odd(num)
print(f"{num} is {result}")`,
    hint: "Use the modulo operator (%) to check if a number is divisible by 2.",
  },
  {
    id: 4,
    title: "Fibonacci Sequence",
    description: "Generate the first n numbers in the Fibonacci sequence.",
    difficulty: "Intermediate",
    solution: `def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib_sequence = [0, 1]
    for i in range(2, n):
        fib_sequence.append(fib_sequence[i-1] + fib_sequence[i-2])
    
    return fib_sequence

# Example usage
n = 10
result = fibonacci(n)
print(f"First {n} Fibonacci numbers: {result}")`,
    hint: "Start with [0, 1] and add the sum of the last two numbers.",
  },
  {
    id: 5,
    title: "Prime Number Checker",
    description: "Write a function to check if a number is prime.",
    difficulty: "Intermediate",
    solution: `def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    
    return True

# Example usage
number = 17
if is_prime(number):
    print(f"{number} is a prime number")
else:
    print(f"{number} is not a prime number")`,
    hint: "Check divisibility from 2 to the square root of the number.",
  },
  {
    id: 6,
    title: "Binary Tree Traversal",
    description: "Implement in-order traversal of a binary tree.",
    difficulty: "Advanced",
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    result = []
    
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    
    inorder(root)
    return result

# Example usage
# Creating a binary tree:     1
#                           /   \\
#                          2     3
#                         / \\
#                        4   5

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

result = inorder_traversal(root)
print(f"In-order traversal: {result}")`,
    hint: "Use recursion: traverse left subtree, visit root, traverse right subtree.",
  },
]

export default function PracticePage() {
  const [visibleSolutions, setVisibleSolutions] = useState<Set<number>>(new Set())
  const [practiceMode, setPracticeMode] = useState<Set<number>>(new Set())
  const [completedProblems, setCompletedProblems] = useState<Set<number>>(new Set())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  // Handle hydration
  useEffect(() => {
    setMounted(true)

    // Load completed problems from localStorage only after mounting
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("completedProblems")
        if (saved) {
          setCompletedProblems(new Set(JSON.parse(saved)))
        }
      } catch (error) {
        console.error("Error loading completed problems:", error)
      }
    }
  }, [])

  // Save completed problems to localStorage
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      try {
        localStorage.setItem("completedProblems", JSON.stringify([...completedProblems]))
      } catch (error) {
        console.error("Error saving completed problems:", error)
      }
    }
  }, [completedProblems, mounted])

  const toggleSolution = (problemId: number) => {
    setVisibleSolutions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(problemId)) {
        newSet.delete(problemId)
      } else {
        newSet.add(problemId)
      }
      return newSet
    })
  }

  const togglePractice = (problemId: number) => {
    setPracticeMode((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(problemId)) {
        newSet.delete(problemId)
      } else {
        newSet.add(problemId)
        // Hide solution when entering practice mode
        setVisibleSolutions((prevSolutions) => {
          const newSolutions = new Set(prevSolutions)
          newSolutions.delete(problemId)
          return newSolutions
        })
      }
      return newSet
    })
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
      })
    }
  }

  const markAsCompleted = (problemId: number) => {
    setCompletedProblems((prev) => new Set([...prev, problemId]))
    toast({
      title: "Problem Completed! 🎉",
      description: "Great job solving this problem!",
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Basic":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Intermediate":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Advanced":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Home className="h-5 w-5" />
                <span className="font-semibold">Home</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/basic" className="hover:text-blue-400 transition-colors">
                Basic
              </Link>
              <Link href="/intermediate" className="hover:text-blue-400 transition-colors">
                Intermediate
              </Link>
              <Link href="/advanced" className="hover:text-blue-400 transition-colors">
                Advanced
              </Link>
              <span className="text-blue-400 font-semibold">Practice</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-800 py-4">
              <div className="flex flex-col space-y-3">
                <Link href="/basic" className="hover:text-blue-400 transition-colors px-2 py-1">
                  Basic
                </Link>
                <Link href="/intermediate" className="hover:text-blue-400 transition-colors px-2 py-1">
                  Intermediate
                </Link>
                <Link href="/advanced" className="hover:text-blue-400 transition-colors px-2 py-1">
                  Advanced
                </Link>
                <span className="text-blue-400 font-semibold px-2 py-1">Practice</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Practice Arena
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your skills with interactive Python problems and real-time code execution
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          {practiceProblems.map((problem) => (
            <Card
              key={problem.id}
              className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl md:text-2xl text-white flex items-center gap-2">
                      {completedProblems.has(problem.id) && (
                        <CheckCircle className="h-5 w-5 text-green-400 animate-pulse" />
                      )}
                      {problem.title}
                    </CardTitle>
                    <Badge className={`${getDifficultyColor(problem.difficulty)} border`}>{problem.difficulty}</Badge>
                  </div>
                </div>
                <CardDescription className="text-gray-300 text-base md:text-lg">{problem.description}</CardDescription>
                <div className="text-sm text-blue-400 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  💡 <strong>Hint:</strong> {problem.hint}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => toggleSolution(problem.id)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:bg-gray-800 text-white hover:text-white"
                  >
                    {visibleSolutions.has(problem.id) ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Hide Solution
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        View Solution
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => togglePractice(problem.id)}
                    variant="outline"
                    size="sm"
                    className="border-blue-600 hover:bg-blue-800 text-blue-400 hover:text-white"
                  >
                    {practiceMode.has(problem.id) ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Close Practice
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Practice
                      </>
                    )}
                  </Button>

                  {visibleSolutions.has(problem.id) && (
                    <Button
                      onClick={() => copyToClipboard(problem.solution)}
                      variant="outline"
                      size="sm"
                      className="border-green-600 hover:bg-green-800 text-green-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                  )}

                  {!completedProblems.has(problem.id) && (
                    <Button
                      onClick={() => markAsCompleted(problem.id)}
                      variant="outline"
                      size="sm"
                      className="border-purple-600 hover:bg-purple-800 text-purple-400 hover:text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>

                {visibleSolutions.has(problem.id) && (
                  <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Solution
                      </h4>
                    </div>
                    <SyntaxHighlighter code={problem.solution} />
                  </div>
                )}

                {practiceMode.has(problem.id) && (
                  <div className="bg-gray-950/50 rounded-lg p-4 border border-blue-700">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Practice Mode
                    </h4>
                    <InlinePythonIDE
                      initialCode={`# ${problem.title}\n# ${problem.description}\n\n# Write your solution here:\n`}
                      onSuccess={() => markAsCompleted(problem.id)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
