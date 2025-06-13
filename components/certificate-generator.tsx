"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Award, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CertificateGenerator() {
  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedProgress = localStorage.getItem("coding-progress")
        if (savedProgress) {
          const progress = JSON.parse(savedProgress)
          const percentage = Math.round((progress.completedProblems.length / progress.totalProblems) * 100)
          setCompletionPercentage(percentage)
        }
      } catch (error) {
        console.error("Error loading progress:", error)
      }
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

    if (completionPercentage < 100) {
      toast({
        title: "Incomplete progress",
        description: `You need to complete all challenges (${completionPercentage}% completed). Keep solving problems!`,
        variant: "destructive",
      })
      return
    }

    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = 1200
      canvas.height = 800

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 1200, 800)
      gradient.addColorStop(0, "#1a1a2e")
      gradient.addColorStop(0.5, "#16213e")
      gradient.addColorStop(1, "#0f172a")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1200, 800)

      // Decorative border
      ctx.strokeStyle = "#4f46e5"
      ctx.lineWidth = 12
      ctx.strokeRect(30, 30, 1140, 740)

      // Inner border
      ctx.strokeStyle = "#7c3aed"
      ctx.lineWidth = 4
      ctx.strokeRect(50, 50, 1100, 700)

      // Title
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 64px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Certificate of Excellence", 600, 150)

      // Subtitle
      ctx.font = "32px Arial"
      ctx.fillStyle = "#a855f7"
      ctx.fillText("Programming Mastery Achievement", 600, 200)

      // Decorative line
      ctx.strokeStyle = "#4f46e5"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(300, 230)
      ctx.lineTo(900, 230)
      ctx.stroke()

      // "This certifies that" text
      ctx.font = "24px Arial"
      ctx.fillStyle = "#d1d5db"
      ctx.fillText("This certifies that", 600, 300)

      // Name
      ctx.font = "bold 48px Arial"
      ctx.fillStyle = "#ffffff"
      ctx.fillText(name, 600, 380)

      // Achievement description
      ctx.font = "24px Arial"
      ctx.fillStyle = "#d1d5db"
      ctx.fillText("has successfully completed all programming challenges", 600, 450)
      ctx.fillText("demonstrating exceptional problem-solving skills", 600, 485)
      ctx.fillText("and mastery of Python programming concepts", 600, 520)

      // Stats
      ctx.font = "20px Arial"
      ctx.fillStyle = "#10b981"
      ctx.fillText("✓ 32 Challenges Completed", 600, 580)
      ctx.fillText("✓ 100% Success Rate", 600, 610)

      // Date and signature area
      ctx.font = "18px Arial"
      ctx.fillStyle = "#9ca3af"
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      ctx.fillText(`Awarded on ${date}`, 600, 680)

      // CodeMaster signature
      ctx.font = "bold 24px Arial"
      ctx.fillStyle = "#4f46e5"
      ctx.fillText("CodeMaster Academy", 600, 720)

      // Create download link
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = `${name.replace(/\s+/g, "_")}-programming-certificate.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          toast({
            title: "Certificate generated!",
            description: "Your certificate has been downloaded successfully.",
          })
        }
      }, "image/png")

      setIsOpen(false)
      setName("")
    } catch (error) {
      console.error("Error generating certificate:", error)
      toast({
        title: "Generation failed",
        description: "Failed to generate certificate. Please try again.",
        variant: "destructive",
      })
    }
  }

  const isEligible = completionPercentage >= 100

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={`${
            isEligible
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-lift hover-glow animate-pulse-glow"
              : "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
          } group transition-all duration-300`}
          disabled={!isEligible}
        >
          {isEligible ? (
            <Award className="mr-2 h-4 w-4 icon-hover group-hover:animate-bounce-in" />
          ) : (
            <Lock className="mr-2 h-4 w-4 icon-hover" />
          )}
          {isEligible ? "Get Certificate" : `${completionPercentage}% Complete`}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Award className="mr-2 h-5 w-5 text-purple-400" />
            Generate Your Certificate
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isEligible ? (
            <>
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <p className="text-green-300 text-sm">
                  🎉 Congratulations! You've completed all challenges and earned your certificate!
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Your Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button
                onClick={generateCertificate}
                disabled={!name.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            </>
          ) : (
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <p className="text-yellow-300 text-sm mb-2">🔒 Certificate locked! Complete all challenges to unlock.</p>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
