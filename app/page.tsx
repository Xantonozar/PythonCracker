"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Lightbulb, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import { TypingEffect } from "@/components/typing-effect"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"

export default function HomePage() {
  const [completionData, setCompletionData] = useState({
    total: 0,
    completed: 0,
    percentage: 0,
  })

  useEffect(() => {
    // Fetch completion data from local storage
    const fetchCompletionData = () => {
      // Total problems across all categories
      const totalProblems = 31

      // Get completed problems from local storage
      const completedProblems = JSON.parse(localStorage.getItem("completedProblems") || "[]")

      // Calculate percentage
      const percentage = Math.round((completedProblems.length / totalProblems) * 100)

      setCompletionData({
        total: totalProblems,
        completed: completedProblems.length,
        percentage: percentage,
      })
    }

    fetchCompletionData()

    // Add event listener for storage events (in case another tab updates)
    window.addEventListener("storage", fetchCompletionData)

    return () => {
      window.removeEventListener("storage", fetchCompletionData)
    }
  }, [])

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset your progress?")) {
      localStorage.removeItem("completedProblems")
      setCompletionData({
        total: 31,
        completed: 0,
        percentage: 0,
      })
      toast({
        title: "Progress reset",
        description: "Your progress has been reset successfully.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-emerald-500" />
              <h1 className="text-2xl font-bold text-emerald-500">
                Code<span className="text-violet-400">Solutions</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex space-x-6">
                <Link href="#basic" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Basic
                </Link>
                <Link href="#intermediate" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Intermediate
                </Link>
                <Link href="#advanced" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Advanced
                </Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-slate-100 mb-6">
            Master Programming with
            <span className="text-emerald-400">
              {" "}
              Step-by-Step <TypingEffect texts={["Solutions", "Examples", "Learning"]} />
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Comprehensive collection of programming problems and solutions organized by difficulty level. Perfect for
            beginners learning fundamental programming concepts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-slate-100">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-950">
              <Code className="mr-2 h-5 w-5" />
              View Solutions
            </Button>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 px-4 bg-slate-900 rounded-lg my-8 max-w-4xl mx-auto">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-100">Your Progress</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">Completion Progress</span>
              <span className="text-sm font-medium text-emerald-400">{completionData.percentage}%</span>
            </div>
            <Progress
              value={completionData.percentage}
              className="h-2 bg-slate-700"
              indicatorClassName="bg-emerald-500"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{completionData.completed}</div>
                <div className="text-slate-400 text-sm">Problems Solved</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-amber-400 mb-1">
                  {completionData.total - completionData.completed}
                </div>
                <div className="text-slate-400 text-sm">Remaining</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-violet-400 mb-1">{completionData.total}</div>
                <div className="text-slate-400 text-sm">Total Problems</div>
              </div>
            </div>
            {completionData.percentage > 0 && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetProgress}
                  className="text-red-400 hover:text-red-300 hover:bg-red-950"
                >
                  Reset Progress
                </Button>
              </div>
            )}
            {completionData.percentage === 100 && (
              <div className="flex justify-center mt-4">
                <Link href="/certificate">
                  <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Get Your Certificate
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">31</div>
              <div className="text-slate-400">Total Problems</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-violet-400 mb-2">3</div>
              <div className="text-slate-400">Difficulty Levels</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-slate-400">Beginner Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section id="categories" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-100">Problem Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Level */}
            <Card className="hover:shadow-lg transition-shadow bg-slate-900 border-slate-800 hover:border-emerald-900">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-emerald-500" />
                  <CardTitle className="text-emerald-500">Basic Level</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  Fundamental programming concepts and simple problem solving
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary" className="bg-slate-800 text-emerald-400">
                    17 Problems
                  </Badge>
                  <p className="text-sm text-slate-400">
                    Perfect for beginners learning variables, loops, conditionals, and basic input/output operations.
                  </p>
                  <Link href="/basic">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-slate-100">
                      Explore Basic Problems
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Intermediate Level */}
            <Card className="hover:shadow-lg transition-shadow bg-slate-900 border-slate-800 hover:border-violet-900">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Code className="h-6 w-6 text-violet-500" />
                  <CardTitle className="text-violet-500">Intermediate Level</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  More complex logic and algorithmic thinking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary" className="bg-slate-800 text-violet-400">
                    10 Problems
                  </Badge>
                  <p className="text-sm text-slate-400">
                    Build upon basics with pattern generation, mathematical calculations, and multi-step logic.
                  </p>
                  <Link href="/intermediate">
                    <Button className="w-full bg-violet-600 hover:bg-violet-700 text-slate-100">
                      Explore Intermediate Problems
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Level */}
            <Card className="hover:shadow-lg transition-shadow bg-slate-900 border-slate-800 hover:border-amber-900">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-amber-500" />
                  <CardTitle className="text-amber-500">Advanced Level</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  Complex applications and real-world problem solving
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary" className="bg-slate-800 text-amber-400">
                    4 Problems
                  </Badge>
                  <p className="text-sm text-slate-400">
                    Challenge yourself with password checkers, converters, and comprehensive applications.
                  </p>
                  <Link href="/advanced">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-slate-100">
                      Explore Advanced Problems
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold text-emerald-500">CodeSolutions</span>
          </div>
          <p className="text-slate-400 mb-4">Learn programming step by step with comprehensive solutions</p>
          <p className="text-sm text-slate-500">© 2024 CodeSolutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
