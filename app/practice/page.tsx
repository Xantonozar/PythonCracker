"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, Home, Code, BookOpen, Zap, Menu, X } from "lucide-react"
import Link from "next/link"
import { PythonIDE } from "@/components/python-ide"

export default function PracticePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg">
                <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  CodeMaster
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">Practice Python</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <Link href="/basic">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Basic
                </Button>
              </Link>
              <Link href="/intermediate">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Code className="mr-2 h-4 w-4" />
                  Intermediate
                </Button>
              </Link>
              <Link href="/advanced">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Zap className="mr-2 h-4 w-4" />
                  Advanced
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300 hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              <div className="flex flex-col space-y-2">
                <Link href="/basic" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Basic Challenges
                  </Button>
                </Link>
                <Link href="/intermediate" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800" size="sm">
                    <Code className="mr-2 h-4 w-4" />
                    Intermediate Challenges
                  </Button>
                </Link>
                <Link href="/advanced" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800" size="sm">
                    <Zap className="mr-2 h-4 w-4" />
                    Advanced Challenges
                  </Button>
                </Link>
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800" size="sm">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Header */}
      <section className="py-8 sm:py-12 px-4 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Python Practice
              </h2>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Practice Python programming with our interactive online IDE. Write, run, and test your code directly in
              your browser!
            </p>
          </div>
        </div>
      </section>

      {/* Practice IDE */}
      <section className="py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <PythonIDE />
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-8 sm:py-12 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Practice Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center text-base sm:text-lg">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Start Simple
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Begin with basic print statements and variables. Practice the fundamentals before moving to complex
                  logic.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-400 flex items-center text-base sm:text-lg">
                  <Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Experiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Try modifying the example code. Change values, add new lines, and see what happens!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
