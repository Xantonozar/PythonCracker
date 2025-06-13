"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, Code, Eye, EyeOff, Home } from "lucide-react"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { toast } from "@/hooks/use-toast"

// Update the intermediateProblems array to use ?? instead of # for comments
const intermediateProblems = [
  {
    id: 101,
    title: "Skip Numbers Divisible by 11",
    description: "Print all numbers from 1 to 100 except those that are divisible by 11.",
    code: `?? Declare variables
number = 0

?? Loop and print with condition
for number in range(1, 101):
    if number % 11 == 0:
        continue
    print(number)`,
    difficulty: "medium",
  },
  {
    id: 102,
    title: "Shape Area Calculator",
    description:
      "Create a program that calculates the area of the following shapes: Circle, Triangle, Square, Rectangle, Trapezium.",
    code: `?? Declare variables
choice = ""
area = 0.0

?? Circle variables
radius = 0.0
pi = 3.14159

?? Triangle variables
base_triangle = 0.0
height_triangle = 0.0

?? Square variables
side_square = 0.0

?? Rectangle variables
length_rectangle = 0.0
width_rectangle = 0.0

?? Trapezium variables
base1_trapezium = 0.0
base2_trapezium = 0.0
height_trapezium = 0.0

print("Select a shape to calculate its area:")
print("1. Circle")
print("2. Triangle")
print("3. Square")
print("4. Rectangle")
print("5. Trapezium")
choice = input()

if choice == "1":
    print("Enter the radius of the circle:")
    radius = float(input())
    area = pi * radius * radius
    print("Area of the circle:")
    print(area)
elif choice == "2":
    print("Enter the base of the triangle:")
    base_triangle = float(input())
    print("Enter the height of the triangle:")
    height_triangle = float(input())
    area = 0.5 * base_triangle * height_triangle
    print("Area of the triangle:")
    print(area)
elif choice == "3":
    print("Enter the side length of the square:")
    side_square = float(input())
    area = side_square * side_square
    print("Area of the square:")
    print(area)
elif choice == "4":
    print("Enter the length of the rectangle:")
    length_rectangle = float(input())
    print("Enter the width of the rectangle:")
    width_rectangle = float(input())
    area = length_rectangle * width_rectangle
    print("Area of the rectangle:")
    print(area)
elif choice == "5":
    print("Enter the first base of the trapezium:")
    base1_trapezium = float(input())
    print("Enter the second base of the trapezium:")
    base2_trapezium = float(input())
    print("Enter the height of the trapezium:")
    height_trapezium = float(input())
    area = 0.5 * (base1_trapezium + base2_trapezium) * height_trapezium
    print("Area of the trapezium:")
    print(area)
else:
    print("Invalid choice.")`,
    difficulty: "medium",
  },
  {
    id: 103,
    title: "Star Pattern Generator",
    description: "Generate a star pattern using loops.",
    code: `?? Declare variables
i = 0
j = 0
stars = ""

?? Outer loop for rows
for i in range(1, 6):
    stars = "" ?? Reset stars for each row
    ?? Inner loop for printing stars
    for j in range(i):
        stars = stars + "*"
    print(stars)`,
    difficulty: "medium",
  },
  {
    id: 104,
    title: "SAARC Member Checker",
    description: "Ask the user to input a country name, and check whether it is a member of SAARC.",
    code: `?? Declare variables
country_name = ""
is_saarc_member = False

?? Take input
print("Enter a country name:")
country_name = input()

?? Check for SAARC membership (case-insensitive)
if country_name == "Afghanistan" or \\
   country_name == "Bangladesh" or \\
   country_name == "Bhutan" or \\
   country_name == "India" or \\
   country_name == "Maldives" or \\
   country_name == "Nepal" or \\
   country_name == "Pakistan" or \\
   country_name == "Sri Lanka" or \\
   country_name == "afghanistan" or \\
   country_name == "bangladesh" or \\
   country_name == "bhutan" or \\
   country_name == "india" or \\
   country_name == "maldives" or \\
   country_name == "nepal" or \\
   country_name == "pakistan" or \\
   country_name == "sri lanka":
    is_saarc_member = True

if is_saarc_member:
    print("This country is a member of SAARC.")
else:
    print("This country is not a member of SAARC.")`,
    difficulty: "hard",
  },
  {
    id: 105,
    title: "Basic Calculator",
    description: "Create a basic calculator that can perform addition, subtraction, multiplication, and division.",
    code: `?? Declare variables
num1 = 0.0
num2 = 0.0
operation = ""
result = 0.0

print("Enter the first number:")
num1 = float(input())
print("Enter the second number:")
num2 = float(input())
print("Enter the operation (+, -, *, /):")
operation = input()

if operation == "+":
    result = num1 + num2
    print("Result:")
    print(result)
elif operation == "-":
    result = num1 - num2
    print("Result:")
    print(result)
elif operation == "*":
    result = num1 * num2
    print("Result:")
    print(result)
elif operation == "/":
    if num2 != 0:
        result = num1 / num2
        print("Result:")
        print(result)
    else:
        print("Error: Division by zero is not allowed.")
else:
    print("Invalid operation.")`,
    difficulty: "medium",
  },
]

export default function IntermediateProblems() {
  const [visibleSolutions, setVisibleSolutions] = useState<Record<number, boolean>>({})
  const [completedProblems, setCompletedProblems] = useState<number[]>([])

  useEffect(() => {
    const savedCompletedProblems = JSON.parse(localStorage.getItem("completedProblems") || "[]") as number[]
    setCompletedProblems(savedCompletedProblems.filter((id) => intermediateProblems.some((p) => p.id === id)))
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
              <Code className="h-8 w-8 text-violet-500" />
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
            <Badge className="mb-4 bg-violet-950 text-violet-400">Intermediate Level</Badge>
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Intermediate Programming Problems</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Build upon your foundation with more complex logic, pattern generation, and multi-step problem solving
              techniques.
            </p>
            <div className="mt-6">
              <Badge variant="outline" className="border-violet-500 text-violet-400">
                <CheckCircle className="mr-1 h-3 w-3" />
                {completedProblems.length} of {intermediateProblems.length} completed
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {intermediateProblems.map((problem) => (
              <Card key={problem.id} className="bg-slate-900 border-slate-800 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-violet-400">
                          Problem {problem.id - 100}: {problem.title}
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
                        className={`hover:bg-slate-800 ${completedProblems.includes(problem.id) ? "text-violet-400" : "text-slate-500"}`}
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
          <div className="mt-12 flex justify-between">
            <Link href="/basic">
              <Button
                variant="outline"
                className="border-slate-700 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              >
                Previous: Basic Problems
              </Button>
            </Link>
            <Link href="/advanced">
              <Button className="bg-amber-600 hover:bg-amber-700">
                <BookOpen className="mr-2 h-4 w-4" />
                Next: Advanced Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
