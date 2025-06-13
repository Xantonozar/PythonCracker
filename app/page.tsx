import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Lightbulb, Zap, Github, Terminal } from "lucide-react"
import Link from "next/link"
import { TypingEffect } from "@/components/typing-effect"
import { ProgressTracker } from "@/components/progress-tracker"
import { CertificateGenerator } from "@/components/certificate-generator"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  CodeMaster
                </h1>
                <p className="text-xs text-gray-400">Programming Excellence</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/basic" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
                Basic
              </Link>
              <Link href="/intermediate" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                Intermediate
              </Link>
              <Link href="/advanced" className="text-gray-300 hover:text-pink-400 transition-colors font-medium">
                Advanced
              </Link>
              <Link href="/practice" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                Practice
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden particle-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 animate-slide-up">
            <h2 className="text-6xl font-bold mb-6">
              Master{" "}
              <span className="gradient-text-animated">
                <TypingEffect texts={["Python", "Coding", "Programming", "Development"]} className="inline-block" />
              </span>
            </h2>
            <p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Learn programming through hands-on challenges and real-world projects.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/basic">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold hover-lift hover-glow group"
              >
                <BookOpen className="mr-2 h-5 w-5 icon-hover group-hover:animate-icon-bounce" />
                Start Learning
              </Button>
            </Link>
            <Link href="/practice">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold hover-lift hover-glow group"
              >
                <Code className="mr-2 h-5 w-5 icon-hover group-hover:animate-icon-bounce" />
                Practice Online
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover-lift group"
            >
              <Github className="mr-2 h-5 w-5 icon-hover group-hover:animate-rotate-slow" />
              GitHub
            </Button>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <CertificateGenerator />
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Your Progress
          </h3>
          <ProgressTracker />
        </div>
      </section>

      {/* Problem Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 gradient-text-animated animate-slide-up">
            Challenge Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Level */}
            <Card className="bg-gray-800/50 border-gray-700 card-interactive hover-glow stagger-item group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg animate-pulse-glow">
                    <Lightbulb className="h-6 w-6 text-green-400 icon-hover group-hover:animate-float" />
                  </div>
                  <div>
                    <CardTitle className="text-green-400 text-xl">Basic Level</CardTitle>
                    <CardDescription className="text-gray-400">Foundation concepts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 hover-scale">
                    17 Problems
                  </Badge>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Variables, loops, conditionals, and essential programming concepts.
                  </p>
                  <Link href="/basic">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold hover-lift btn-gradient">
                      Start Basic
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Intermediate Level */}
            <Card className="bg-gray-800/50 border-gray-700 card-interactive hover-glow stagger-item group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg animate-pulse-glow" style={{ animationDelay: "0.5s" }}>
                    <Code className="h-6 w-6 text-blue-400 icon-hover group-hover:animate-float" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-400 text-xl">Intermediate Level</CardTitle>
                    <CardDescription className="text-gray-400">Advanced logic</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover-scale">
                    10 Problems
                  </Badge>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Pattern generation, calculations, and complex logic.
                  </p>
                  <Link href="/intermediate">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold hover-lift btn-gradient">
                      Tackle Intermediate
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Level */}
            <Card className="bg-gray-800/50 border-gray-700 card-interactive hover-glow stagger-item group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg animate-pulse-glow" style={{ animationDelay: "1s" }}>
                    <Zap className="h-6 w-6 text-purple-400 icon-hover group-hover:animate-float" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-400 text-xl">Advanced Level</CardTitle>
                    <CardDescription className="text-gray-400">Real-world apps</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover-scale"
                  >
                    5 Problems
                  </Badge>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Complex applications and comprehensive problem-solving.
                  </p>
                  <Link href="/advanced">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold hover-lift btn-gradient">
                      Conquer Advanced
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Practice Online
          </h3>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-white mb-4">Interactive Python IDE</CardTitle>
                <CardDescription className="text-center text-gray-300">
                  Write, run, and test your code instantly in the browser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="bg-gray-900 rounded-lg p-8">
                    <Code className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-4">
                      Full-featured IDE with syntax highlighting and instant execution.
                    </p>
                  </div>
                  <Link href="/practice">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold"
                    >
                      <Code className="mr-2 h-5 w-5" />
                      Open IDE
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Terminal className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CodeMaster
            </span>
          </div>
          <p className="text-gray-400 mb-4">Elevate your programming skills</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              Support
            </a>
          </div>
          <p className="text-sm text-gray-500">© 2024 CodeMaster. Crafted for developers.</p>
        </div>
      </footer>
    </div>
  )
}
