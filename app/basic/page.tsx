"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, Code, Eye, EyeOff, Home } from "lucide-react"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { toast } from "@/hooks/use-toast"

const basicProblems = [
  {
    id: 1,
    title: "Two Number Subtraction",
    description:
      "Write a program that takes two numbers as input, subtracts the second number from the first, and displays the result.",
    code: `?? Declare variables
num1 = 0.0
num2 = 0.0
result = 0.0

?? Take input
print("Enter the first number:")
num1 = float(input())

print("Enter the second number:")
num2 = float(input())

?? Calculate and display result
result = num1 - num2
print("The result of subtraction is:")
print(result)`,
    difficulty: "easy",
  },
  {
    id: 2,
    title: "Temperature Check",
    description:
      'Ask the user to input the current temperature. If the temperature is above 25°C, print "It\'s hot"; otherwise, print "It\'s cold".',
    code: `?? Declare variables
temperature = 0.0

?? Take input
print("Enter the current temperature in Celsius:")
temperature = float(input())

?? Check and print
if temperature > 25:
    print("It's hot")
else:
    print("It's cold")`,
    difficulty: "easy",
  },
  {
    id: 3,
    title: "Marriage Eligibility",
    description:
      "Ask the user to enter their age. Determine whether the person is legally eligible for marriage (minimum age required is 18).",
    code: `?? Declare variables
age = 0

?? Take input
print("Enter your age:")
age = int(input())

?? Check eligibility
if age >= 18:
    print("You are legally eligible for marriage.")
else:
    print("You are not legally eligible for marriage.")`,
    difficulty: "easy",
  },
  {
    id: 4,
    title: "Odd or Even",
    description: "Take a number as input and determine whether it is odd or even.",
    code: `?? Declare variables
number = 0

?? Take input
print("Enter a number:")
number = int(input())

?? Check odd or even
if number % 2 == 0:
    print("The number is even.")
else:
    print("The number is odd.")`,
    difficulty: "medium",
  },
  {
    id: 5,
    title: "Leap Year Checker",
    description: "Ask the user to enter a year and determine whether it is a leap year or not.",
    code: `?? Declare variables
year = 0
is_leap = False

?? Take input
print("Enter a year:")
year = int(input())

?? Determine leap year
if year % 4 == 0:
    if year % 100 == 0:
        if year % 400 == 0:
            is_leap = True
        else:
            is_leap = False
    else:
        is_leap = True
else:
    is_leap = False

if is_leap:
    print("The year is a leap year.")
else:
    print("The year is not a leap year.")`,
    difficulty: "medium",
  },
]

export default function BasicProblems() {
  const [visibleSolutions, setVisibleSolutions] = useState<Record<number, boolean>>({})
  const [completedProblems, setCompletedProblems] = useState<number[]>([])

  useEffect(() => {
    const savedCompletedProblems = JSON.parse(localStorage.getItem("completedProblems") || "[]") as number[]
    setCompletedProblems(savedCompletedProblems.filter((id) => basicProblems.some((p) => p.id === id)))
  }, [])

  const toggleVisibility = (id: number) => {
    setVisibleSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleCompletion = (id: number) => {
    let newCompleted: number[]

    if (completedProblems.includes(id)) {
      // Remove from completed
      newCompleted = completedProblems.filter((problemId) => problemId !== id)
      toast({
        title: "Progress updated",
        description: "Problem marked as incomplete.",
      })
    } else {
      // Add to completed
      newCompleted = [...completedProblems, id]
      toast({
        title: "Great job!",
        description: "Problem marked as completed.",
      })
    }

    setCompletedProblems(newCompleted)

    // Update localStorage - get all completed problems first
    const allCompleted = JSON.parse(localStorage.getItem("completedProblems") || "[]") as number[]

    if (completedProblems.includes(id)) {
      // Remove this id
      localStorage.setItem("completedProblems", JSON.stringify(allCompleted.filter((problemId) => problemId !== id)))
    } else {
      // Add this id if not already in the list
      if (!allCompleted.includes(id)) {
        localStorage.setItem("completedProblems", JSON.stringify([...allCompleted, id]))
      }
    }

    // Trigger storage event for other components to update
    window.dispatchEvent(new Event("storage"))
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-emerald-950 text-emerald-400 hover:bg-emerald-900">Easy</Badge>
      case "medium":
        return <Badge className="bg-amber-950 text-amber-400 hover:bg-amber-900">Medium</Badge>
      case "hard":
        return <Badge className="bg-red-950 text-red-400 hover:bg-red-900">Hard</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-emerald-500" />
              <h1 className="text-2xl font-bold text-emerald-500">
                Code<span className="text-violet-400">Solutions</span>
              </h1>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-12 px-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-emerald-950 text-emerald-400">Basic Level</Badge>
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Basic Programming Problems</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Start your programming journey with these fundamental problems. Perfect for learning variables,
              conditionals, loops, and basic input/output operations.
            </p>
            <div className="mt-6">
              <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                <CheckCircle className="mr-1 h-3 w-3" />
                {completedProblems.length} of {basicProblems.length} completed
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {basicProblems.map((problem) => (
              <Card key={problem.id} className="bg-slate-900 border-slate-800 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-emerald-400">
                          Problem {problem.id}: {problem.title}
                        </CardTitle>
                        {getDifficultyBadge(problem.difficulty)}
                      </div>
                      <CardDescription className="mt-2 text-slate-400">{problem.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(problem.id)}
                        className="hover:bg-slate-800"
                      >
                        {visibleSolutions[problem.id] ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleCompletion(problem.id)}
                        className={`hover:bg-slate-800 ${completedProblems.includes(problem.id) ? "text-emerald-400" : "text-slate-500"}`}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent
                  className={`transition-all duration-500 ${visibleSolutions[problem.id] ? "opacity-100" : "opacity-0 h-0 overflow-hidden p-0"}`}
                >
                  <CodeBlock code={problem.code} language="python" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-center space-x-4">
            <Link href="/intermediate">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <BookOpen className="mr-2 h-4 w-4" />
                Next: Intermediate Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
