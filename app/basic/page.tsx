"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Terminal, Home, CheckCircle, Code, Copy } from "lucide-react"
import Link from "next/link"
import { SyntaxHighlighter } from "@/components/syntax-highlighter"
import { InlinePythonIDE } from "@/components/inline-python-ide"
import { ChallengeInfoModal } from "@/components/challenge-info-modal"
import { useToast } from "@/hooks/use-toast"

const basicProblems = [
  {
    id: "basic-1",
    title: "Two Number Subtraction",
    description:
      "Write a program that takes two numbers as input, subtracts the second number from the first, and displays the result.",
    code: `num1 = 0.0
num2 = 0.0
result = 0.0

print("Enter the first number:")
num1 = float(input())

print("Enter the second number:")
num2 = float(input())

result = num1 - num2
print("The result of subtraction is:")
print(result)`,
  },
  {
    id: "basic-2",
    title: "Temperature Check",
    description:
      'Ask the user to input the current temperature. If the temperature is above 25°C, print "It\'s hot"; otherwise, print "It\'s cold".',
    code: `temperature = 0.0

print("Enter the current temperature in Celsius:")
temperature = float(input())

if temperature > 25:
    print("It's hot")
else:
    print("It's cold")`,
  },
  {
    id: "basic-3",
    title: "Marriage Eligibility",
    description:
      "Ask the user to enter their age. Determine whether the person is legally eligible for marriage (minimum age required is 18).",
    code: `age = 0

print("Enter your age:")
age = int(input())

if age >= 18:
    print("You are legally eligible for marriage.")
else:
    print("You are not legally eligible for marriage.")`,
  },
  {
    id: "basic-4",
    title: "Odd or Even",
    description: "Take a number as input and determine whether it is odd or even.",
    code: `number = 0

print("Enter a number:")
number = int(input())

if number % 2 == 0:
    print("The number is even.")
else:
    print("The number is odd.")`,
  },
  {
    id: "basic-5",
    title: "Leap Year Checker",
    description: "Ask the user to enter a year and determine whether it is a leap year or not.",
    code: `year = 0
is_leap = False

print("Enter a year:")
year = int(input())

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
  },
  {
    id: "basic-6",
    title: "Unit Converter",
    description:
      "Create a program that can convert: Centimeters to inches and vice versa, Kilograms to pounds and vice versa, Kelvin to Celsius and vice versa.",
    code: `choice_main = ""
choice_sub = ""
value = 0.0
result = 0.0

print("Choose conversion type:")
print("1. Centimeters to Inches / Inches to Centimeters")
print("2. Kilograms to Pounds / Pounds to Kilograms")
print("3. Kelvin to Celsius / Celsius to Kelvin")
choice_main = input()

if choice_main == "1":
    print("Choose sub-conversion:")
    print("1. Centimeters to Inches")
    print("2. Inches to Centimeters")
    choice_sub = input()
    print("Enter the value:")
    value = float(input())
    if choice_sub == "1":
        result = value / 2.54
        print("Inches:")
        print(result)
    elif choice_sub == "2":
        result = value * 2.54
        print("Centimeters:")
        print(result)
    else:
        print("Invalid sub-choice.")
elif choice_main == "2":
    print("Choose sub-conversion:")
    print("1. Kilograms to Pounds")
    print("2. Pounds to Kilograms")
    choice_sub = input()
    print("Enter the value:")
    value = float(input())
    if choice_sub == "1":
        result = value * 2.20462
        print("Pounds:")
        print(result)
    elif choice_sub == "2":
        result = value / 2.20462
        print("Kilograms:")
        print(result)
    else:
        print("Invalid sub-choice.")
elif choice_main == "3":
    print("Choose sub-conversion:")
    print("1. Kelvin to Celsius")
    print("2. Celsius to Kelvin")
    choice_sub = input()
    print("Enter the value:")
    value = float(input())
    if choice_sub == "1":
        result = value - 273.15
        print("Celsius:")
        print(result)
    elif choice_sub == "2":
        result = value + 273.15
        print("Kelvin:")
        print(result)
    else:
        print("Invalid sub-choice.")
else:
    print("Invalid main choice.")`,
  },
  {
    id: "basic-7",
    title: "Generation Categorizer",
    description:
      "Ask the user to input their birth year and determine their generational category (e.g., Gen Z, Gen Alpha, Baby Boomers, etc.).",
    code: `birth_year = 0
generation = ""

print("Enter your birth year (e.g., 1995):")
birth_year = int(input())

if birth_year >= 1946 and birth_year <= 1964:
    generation = "Baby Boomers"
elif birth_year >= 1965 and birth_year <= 1980:
    generation = "Generation X"
elif birth_year >= 1981 and birth_year <= 1996:
    generation = "Millennials (Generation Y)"
elif birth_year >= 1997 and birth_year <= 2012:
    generation = "Generation Z"
elif birth_year >= 2013 and birth_year <= 2025:
    generation = "Generation Alpha"
else:
    generation = "Other/Undefined"

print("Your generational category is:")
print(generation)`,
  },
  {
    id: "basic-8",
    title: "GPA Calculator",
    description:
      "Write a program that takes a student's marks as input and calculates their GPA based on a standard grading scale.",
    code: `marks = 0.0
gpa = 0.0

print("Enter student's marks (out of 100):")
marks = float(input())

if marks >= 90:
    gpa = 4.0
elif marks >= 80:
    gpa = 3.7
elif marks >= 70:
    gpa = 3.3
elif marks >= 60:
    gpa = 3.0
elif marks >= 50:
    gpa = 2.7
elif marks >= 40:
    gpa = 2.0
else:
    gpa = 0.0

print("Your GPA is:")
print(gpa)`,
  },
  {
    id: "basic-9",
    title: "Number Comparison",
    description:
      "Take three numbers as input and determine which one is the smallest, which one is the largest, and which one is in the middle.",
    code: `num1 = 0.0
num2 = 0.0
num3 = 0.0
smallest = 0.0
largest = 0.0
middle = 0.0

print("Enter the first number:")
num1 = float(input())
print("Enter the second number:")
num2 = float(input())
print("Enter the third number:")
num3 = float(input())

if num1 >= num2 and num1 >= num3:
    largest = num1
elif num2 >= num1 and num2 >= num3:
    largest = num2
else:
    largest = num3

if num1 <= num2 and num1 <= num3:
    smallest = num1
elif num2 <= num1 and num2 <= num3:
    smallest = num2
else:
    smallest = num3

if (num1 == smallest and num2 == largest) or (num1 == largest and num2 == smallest):
    middle = num3
elif (num1 == smallest and num3 == largest) or (num1 == largest and num3 == smallest):
    middle = num2
else:
    middle = num1

print("Largest:", largest)
print("Smallest:", smallest)
print("Middle:", middle)`,
  },
  {
    id: "basic-10",
    title: "Repeat Message",
    description: 'Print the phrase "I am Baka" 10 times using a loop.',
    code: `count = 0

for count in range(10):
    print("I am Baka")`,
  },
  {
    id: "basic-11",
    title: "Custom Message Repeater",
    description:
      "Create a program where the user provides a message and a number. Print the message the specified number of times.",
    code: `message = ""
num_times = 0
count = 0

print("Enter your message:")
message = input()
print("Enter the number of times to print:")
num_times = int(input())

for count in range(num_times):
    print(message)`,
  },
  {
    id: "basic-12",
    title: "Divisible by 3",
    description: "Print all numbers between 1 and 1,562,582 that are divisible by 3.",
    code: `number = 0

for number in range(1, 1562583):
    if number % 3 == 0:
        print(number)`,
  },
  {
    id: "basic-13",
    title: "Countdown Pattern",
    description: "Create a program that displays a countdown pattern from 123456789 down to 1.",
    code: `i = 0
j = 0
line = ""

for i in range(9, 0, -1):
    line = ""
    for j in range(1, i + 1):
        line = line + str(j)
    print(line)`,
  },
  {
    id: "basic-14",
    title: "Multiplication Table",
    description: "Take a number as input and display its multiplication table from 1 to 10.",
    code: `number = 0
multiplier = 0
result = 0

print("Enter a number:")
number = int(input())

for multiplier in range(1, 11):
    result = number * multiplier
    print(str(number) + " x " + str(multiplier) + " = " + str(result))`,
  },
  {
    id: "basic-15",
    title: "While Loop Message",
    description: 'Use a while loop to print the phrase "I am stupid" 100 times.',
    code: `count = 0

while count < 100:
    print("I am stupid")
    count = count + 1`,
  },
  {
    id: "basic-16",
    title: "Sum Calculator",
    description: "Write a program that calculates and displays the sum of numbers from 1 to 100.",
    code: `total_sum = 0
number = 0

for number in range(1, 101):
    total_sum = total_sum + number

print("The sum of numbers from 1 to 100 is:")
print(total_sum)`,
  },
  {
    id: "basic-17",
    title: "Skip User Age",
    description: "Display numbers from 1 to 100, skipping the user's age (which is taken as input).",
    code: `user_age = 0
number = 0

print("Enter your age:")
user_age = int(input())

for number in range(1, 101):
    if number == user_age:
        continue
    print(number)`,
  },
]

export default function BasicProblems() {
  const [visibleSolutions, setVisibleSolutions] = useState<Set<string>>(new Set())
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set())
  const [practiceMode, setPracticeMode] = useState<Set<string>>(new Set())

  const { toast } = useToast()

  useEffect(() => {
    const savedProgress = localStorage.getItem("coding-progress")
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCompletedProblems(new Set(progress.completedProblems))
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

  const togglePractice = (problemId: string) => {
    const newPractice = new Set(practiceMode)
    if (newPractice.has(problemId)) {
      newPractice.delete(problemId)
    } else {
      newPractice.add(problemId)
      // Hide solution when entering practice mode
      const newVisible = new Set(visibleSolutions)
      newVisible.delete(problemId)
      setVisibleSolutions(newVisible)
    }
    setPracticeMode(newPractice)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  CodeMaster
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">Basic Challenges</p>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <ChallengeInfoModal level="basic" color="green" />
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs sm:text-sm"
                >
                  <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-8 sm:py-12 px-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <div className="container mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Basic Level
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Foundation Challenges
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Master programming fundamentals with hands-on challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            {basicProblems.map((problem, index) => (
              <Card
                key={problem.id}
                className="bg-gray-800/50 border-gray-700 card-interactive hover-glow stagger-item group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs hover-scale">
                          Problem {index + 1}
                        </Badge>
                        {completedProblems.has(problem.id) && (
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 animate-bounce-in" />
                        )}
                      </div>
                      <CardTitle className="text-xl sm:text-2xl text-green-400 mb-2 sm:mb-3 leading-tight group-hover:gradient-text-animated transition-all duration-300">
                        {problem.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {problem.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-row sm:flex-col lg:flex-row gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSolution(problem.id)}
                        className="text-gray-400 hover:text-green-400 hover:bg-green-500/10 flex-1 sm:flex-none hover-scale group"
                      >
                        {visibleSolutions.has(problem.id) ? (
                          <EyeOff className="h-4 w-4 sm:mr-0 lg:mr-2 icon-hover group-hover:animate-icon-bounce" />
                        ) : (
                          <Eye className="h-4 w-4 sm:mr-0 lg:mr-2 icon-hover group-hover:animate-icon-bounce" />
                        )}
                        <span className="sm:hidden lg:inline ml-2">
                          {visibleSolutions.has(problem.id) ? "Hide" : "View"}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePractice(problem.id)}
                        className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 flex-1 sm:flex-none hover-scale group"
                      >
                        <Code className="h-4 w-4 sm:mr-0 lg:mr-2 icon-hover group-hover:animate-icon-bounce" />
                        <span className="sm:hidden lg:inline ml-2">Practice</span>
                      </Button>
                      {!completedProblems.has(problem.id) && (
                        <Button
                          size="sm"
                          onClick={() => markAsCompleted(problem.id)}
                          className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none text-xs sm:text-sm hover-lift btn-gradient"
                        >
                          <span className="sm:hidden">Done</span>
                          <span className="hidden sm:inline">Mark Complete</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  {practiceMode.has(problem.id) ? (
                    <InlinePythonIDE
                      problemTitle={problem.title}
                      problemDescription={problem.description}
                      category="basic"
                      onClose={() => togglePractice(problem.id)}
                    />
                  ) : (
                    <>
                      <div
                        className={`transition-all duration-500 ${
                          visibleSolutions.has(problem.id) ? "opacity-100" : "opacity-30 blur-sm"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                          <div className="flex-1">
                            <SyntaxHighlighter code={problem.code} />
                          </div>
                          {visibleSolutions.has(problem.id) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard
                                  .writeText(problem.code)
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
                              }}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 shrink-0"
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Code
                            </Button>
                          )}
                        </div>
                      </div>
                      {!visibleSolutions.has(problem.id) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            onClick={() => toggleSolution(problem.id)}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
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
          <div className="mt-16 flex justify-center">
            <Link href="/intermediate">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
              >
                Next: Intermediate Challenges →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
