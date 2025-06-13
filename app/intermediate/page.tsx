"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Terminal, Home, CheckCircle, Copy } from "lucide-react"
import Link from "next/link"
import { SyntaxHighlighter } from "@/components/syntax-highlighter"
import { InlinePythonIDE } from "@/components/inline-python-ide"
import { ChallengeInfoModal } from "@/components/challenge-info-modal"
import { useToast } from "@/hooks/use-toast"

const intermediateProblems = [
  {
    id: "intermediate-1",
    title: "Skip Numbers Divisible by 11",
    description: "Print all numbers from 1 to 100 except those that are divisible by 11.",
    code: `number = 0

for number in range(1, 101):
    if number % 11 == 0:
        continue
    print(number)`,
  },
  {
    id: "intermediate-2",
    title: "Shape Area Calculator",
    description:
      "Create a program that calculates the area of the following shapes: Circle, Triangle, Square, Rectangle, Trapezium.",
    code: `choice = ""
area = 0.0
radius = 0.0
pi = 3.14159
base_triangle = 0.0
height_triangle = 0.0
side_square = 0.0
length_rectangle = 0.0
width_rectangle = 0.0
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
  },
  {
    id: "intermediate-3",
    title: "Star Pattern Generator",
    description: "Generate a star pattern using loops.",
    code: `i = 0
j = 0
stars = ""

for i in range(1, 6):
    stars = ""
    for j in range(i):
        stars = stars + "*"
    print(stars)`,
  },
  {
    id: "intermediate-4",
    title: "SAARC Member Checker",
    description: "Ask the user to input a country name, and check whether it is a member of SAARC.",
    code: `country_name = ""
is_saarc_member = False

print("Enter a country name:")
country_name = input()

if country_name == "Afghanistan" or country_name == "Bangladesh" or country_name == "Bhutan" or country_name == "India" or country_name == "Maldives" or country_name == "Nepal" or country_name == "Pakistan" or country_name == "Sri Lanka" or country_name == "afghanistan" or country_name == "bangladesh" or country_name == "bhutan" or country_name == "india" or country_name == "maldives" or country_name == "nepal" or country_name == "pakistan" or country_name == "sri lanka":
    is_saarc_member = True

if is_saarc_member:
    print("This country is a member of SAARC.")
else:
    print("This country is not a member of SAARC.")`,
  },
  {
    id: "intermediate-5",
    title: "Basic Calculator",
    description: "Create a basic calculator that can perform addition, subtraction, multiplication, and division.",
    code: `num1 = 0.0
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
  },
  {
    id: "intermediate-6",
    title: "Float to Integer Converter",
    description: "Take a floating-point number as input, convert it into an integer, and display the result.",
    code: `float_num = 0.0
int_num = 0

print("Enter a floating-point number:")
float_num = float(input())

int_num = int(float_num)
print("The integer conversion is:")
print(int_num)`,
  },
  {
    id: "intermediate-7",
    title: "Number Rounder",
    description:
      "If the user inputs a floating-point number, round it to the nearest whole number. (Example: 7.6 becomes 8, and 7.4 becomes 7)",
    code: `float_num = 0.0
rounded_num = 0
fractional_part = 0.0
temp_int = 0

print("Enter a floating-point number:")
float_num = float(input())

temp_int = int(float_num)
fractional_part = float_num - temp_int

if float_num >= 0:
    if fractional_part >= 0.5:
        rounded_num = temp_int + 1
    else:
        rounded_num = temp_int
else:
    if fractional_part <= -0.5:
        rounded_num = temp_int - 1
    else:
        rounded_num = temp_int

print("The rounded number is:")
print(rounded_num)`,
  },
  {
    id: "intermediate-8",
    title: "Factorial Calculator",
    description: "Take a number as input and output its factorial.",
    code: `number = 0
factorial = 1
i = 0

print("Enter a non-negative integer:")
number = int(input())

if number < 0:
    print("Factorial is not defined for negative numbers.")
elif number == 0:
    print("The factorial of 0 is 1.")
else:
    for i in range(1, number + 1):
        factorial = factorial * i
    print("The factorial of", number, "is:")
    print(factorial)`,
  },
  {
    id: "intermediate-9",
    title: "Divisible by 2 and 3",
    description: "Using a while loop, find and print all numbers between 1 and 200 that are divisible by both 2 and 3.",
    code: `number = 1

while number <= 200:
    if number % 2 == 0 and number % 3 == 0:
        print(number)
    number = number + 1`,
  },
  {
    id: "intermediate-10",
    title: "Even and Odd Sum Calculator",
    description:
      "Calculate and display the sum of all even numbers and all odd numbers separately in the range 1 to 100.",
    code: `even_sum = 0
odd_sum = 0
number = 0

for number in range(1, 101):
    if number % 2 == 0:
        even_sum = even_sum + number
    else:
        odd_sum = odd_sum + number

print("Sum of even numbers from 1 to 100:")
print(even_sum)
print("Sum of odd numbers from 1 to 100:")
print(odd_sum)`,
  },
]

export default function IntermediateProblems() {
  const [visibleSolutions, setVisibleSolutions] = useState<Set<string>>(new Set())
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set())
  const [practiceMode, setPracticeMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProgress = localStorage.getItem("coding-progress")
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        setCompletedProblems(new Set(progress.completedProblems))
      }
    }
  }, [])

  const toggleSolution = (problemId: string) => {
    const newVisible = new Set(visibleSolutions)
    if (newVisible.has(problemId)) {
      newVisible.delete(problemId)
    } else {
      newVisible.add(problemId)
    }
    setVisibleSolutions(newVisible)
  }

  const markAsCompleted = (problemId: string) => {
    const newCompleted = new Set(completedProblems)
    newCompleted.add(problemId)
    setCompletedProblems(newCompleted)

    const progress = {
      completedProblems: Array.from(newCompleted),
      totalProblems: 31,
    }
    localStorage.setItem("coding-progress", JSON.stringify(progress))
  }

  const togglePracticeMode = () => {
    setPracticeMode(!practiceMode)
  }

  const copyCodeToClipboard = (code: string, problemTitle: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code Copied",
      description: `Successfully copied code for ${problemTitle} to clipboard`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  CodeMaster
                </h1>
                <p className="text-xs text-gray-400">Intermediate Challenges</p>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <ChallengeInfoModal level="intermediate" color="blue" />
              <Link href="/">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
        <div className="container mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">Intermediate Level</Badge>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Logic & Algorithms
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Elevate your skills with complex logic and algorithmic thinking.
            </p>
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            {intermediateProblems.map((problem, index) => (
              <Card
                key={problem.id}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                          Problem {index + 1}
                        </Badge>
                        {completedProblems.has(problem.id) && <CheckCircle className="h-5 w-5 text-blue-400" />}
                      </div>
                      <CardTitle className="text-2xl text-blue-400 mb-3">{problem.title}</CardTitle>
                      <CardDescription className="text-gray-300 text-base leading-relaxed">
                        {problem.description}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {!practiceMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSolution(problem.id)}
                          className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                        >
                          {visibleSolutions.has(problem.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      {!completedProblems.has(problem.id) && (
                        <Button
                          size="sm"
                          onClick={() => markAsCompleted(problem.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  {practiceMode ? (
                    <InlinePythonIDE initialCode={problem.code} category="intermediate" problemId={problem.id} />
                  ) : (
                    <>
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-700/50 text-gray-400"
                          onClick={() => copyCodeToClipboard(problem.code, problem.title)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div
                        className={`transition-all duration-500 ${
                          visibleSolutions.has(problem.id) ? "opacity-100" : "opacity-30 blur-sm"
                        }`}
                      >
                        <SyntaxHighlighter code={problem.code} />
                      </div>
                      {!visibleSolutions.has(problem.id) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            onClick={() => toggleSolution(problem.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Solution
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-16 flex justify-between">
            <Link href="/basic">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                ← Previous: Basic Challenges
              </Button>
            </Link>
            <Link href="/advanced">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
              >
                Next: Advanced Challenges →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
