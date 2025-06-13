"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Code, Download } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function Certificate() {
  const [name, setName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [completionDate, setCompletionDate] = useState("")
  const [showCertificate, setShowCertificate] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Get current date
    const date = new Date()
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    setCompletionDate(formattedDate)

    // Check if user has completed all problems
    const completedProblems = JSON.parse(localStorage.getItem("completedProblems") || "[]")
    if (completedProblems.length < 31) {
      toast({
        title: "Not all problems completed",
        description: "You need to complete all problems to generate a certificate.",
        variant: "destructive",
      })
    }
  }, [])

  const generateCertificate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to generate the certificate.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Small delay to show loading state
    setTimeout(() => {
      setShowCertificate(true)
      setIsGenerating(false)

      // Draw the certificate after the component renders
      setTimeout(drawCertificate, 100)
    }, 1000)
  }

  const drawCertificate = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 1000
    canvas.height = 700

    // Draw certificate background
    ctx.fillStyle = "#1e293b" // slate-800
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw border
    ctx.strokeStyle = "#10b981" // emerald-500
    ctx.lineWidth = 15
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50)

    // Add inner border
    ctx.strokeStyle = "#8b5cf6" // violet-500
    ctx.lineWidth = 2
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90)

    // Add title
    ctx.font = "bold 50px sans-serif"
    ctx.fillStyle = "#10b981" // emerald-500
    ctx.textAlign = "center"
    ctx.fillText("Certificate of Completion", canvas.width / 2, 120)

    // Add decorative line
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 200, 150)
    ctx.lineTo(canvas.width / 2 + 200, 150)
    ctx.strokeStyle = "#8b5cf6" // violet-500
    ctx.lineWidth = 3
    ctx.stroke()

    // Add text content
    ctx.font = "italic 24px sans-serif"
    ctx.fillStyle = "#e2e8f0" // slate-200
    ctx.fillText("This certifies that", canvas.width / 2, 220)

    // Add name
    ctx.font = "bold 48px sans-serif"
    ctx.fillStyle = "#f59e0b" // amber-500
    ctx.fillText(name, canvas.width / 2, 290)

    // Add description
    ctx.font = "24px sans-serif"
    ctx.fillStyle = "#e2e8f0" // slate-200
    ctx.fillText("has successfully completed all programming challenges", canvas.width / 2, 360)
    ctx.fillText("in the CodeSolutions learning platform.", canvas.width / 2, 400)

    // Add completion details
    ctx.font = "italic 22px sans-serif"
    ctx.fillText(`Completed on ${completionDate}`, canvas.width / 2, 480)

    // Add signature
    ctx.font = "bold 24px sans-serif"
    ctx.fillStyle = "#10b981" // emerald-500
    ctx.fillText("CodeSolutions Academy", canvas.width / 2, 580)

    // Add signature line
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 150, 560)
    ctx.lineTo(canvas.width / 2 + 150, 560)
    ctx.strokeStyle = "#e2e8f0" // slate-200
    ctx.lineWidth = 1
    ctx.stroke()

    // Add logo
    ctx.font = "bold 24px sans-serif"
    ctx.fillStyle = "#10b981" // emerald-500
    ctx.fillText("{ CS }", canvas.width / 2, 640)
  }

  const downloadCertificate = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = `CodeSolutions_Certificate_${name.replace(/\s/g, "_")}.png`
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()

    toast({
      title: "Certificate downloaded",
      description: "Your certificate has been downloaded successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
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
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {!showCertificate ? (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-emerald-400">Generate Your Certificate</CardTitle>
                <CardDescription className="text-slate-400">
                  Enter your name to generate a personalized certificate of completion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-800 border-slate-700 text-slate-200"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={generateCertificate}
                  disabled={isGenerating}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isGenerating ? "Generating..." : "Generate Certificate"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-emerald-400">Your Certificate</h2>

              <div className="flex justify-center">
                <div className="border-4 border-emerald-500 inline-block">
                  <canvas ref={canvasRef} className="max-w-full" style={{ width: "1000px", height: "700px" }} />
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={downloadCertificate} className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
