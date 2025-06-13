"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Target, CheckCircle } from "lucide-react"

interface ProgressData {
  completedProblems: string[]
  totalProblems: number
}

export function ProgressTracker() {
  const [progress, setProgress] = useState<ProgressData>({ completedProblems: [], totalProblems: 32 })

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("coding-progress")
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress)
        setProgress(parsed)
      }
    } catch (error) {
      console.error("Error loading progress:", error)
    }
  }, [])

  const completionPercentage = Math.round((progress.completedProblems.length / progress.totalProblems) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-800/50 border-gray-700 card-interactive hover-glow stagger-item group">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg animate-pulse-glow">
              <Target className="h-6 w-6 text-blue-400 icon-hover group-hover:animate-bounce-in" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white animate-bounce-in">{progress.completedProblems.length}</p>
              <p className="text-gray-400 text-sm">Problems Solved</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700 card-interactive hover-glow stagger-item group">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg animate-pulse-glow" style={{ animationDelay: "0.3s" }}>
              <CheckCircle className="h-6 w-6 text-green-400 icon-hover group-hover:animate-bounce-in" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white animate-bounce-in" style={{ animationDelay: "0.1s" }}>
                {completionPercentage}%
              </p>
              <p className="text-gray-400 text-sm">Completion Rate</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2 progress-bar">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700 card-interactive hover-glow stagger-item group">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg animate-pulse-glow" style={{ animationDelay: "0.6s" }}>
              <Trophy className="h-6 w-6 text-purple-400 icon-hover group-hover:animate-bounce-in" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white animate-bounce-in" style={{ animationDelay: "0.2s" }}>
                {progress.totalProblems}
              </p>
              <p className="text-gray-400 text-sm">Total Challenges</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
