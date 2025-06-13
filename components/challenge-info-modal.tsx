"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

interface ChallengeInfoModalProps {
  level: "basic" | "intermediate" | "advanced"
  color: string
}

const challengeInfo = {
  basic: {
    title: "Basic Level Challenges",
    description:
      "Master the fundamentals of programming with these carefully crafted problems. Perfect for building your foundation in variables, conditionals, loops, and basic I/O operations.",
    features: [
      "Variables and data types",
      "Conditional statements (if/else)",
      "Loops (for/while)",
      "Basic input/output operations",
      "Simple calculations",
      "String manipulation",
      "Basic problem-solving logic",
    ],
    difficulty: "Beginner-friendly",
    timeEstimate: "2-4 hours total",
    prerequisites: "No prior programming experience required",
  },
  intermediate: {
    title: "Intermediate Level Challenges",
    description:
      "Elevate your programming skills with complex logic, pattern generation, and multi-step problem solving. These challenges will strengthen your algorithmic thinking and code optimization abilities.",
    features: [
      "Complex conditional logic",
      "Nested loops and patterns",
      "Mathematical calculations",
      "String processing",
      "Data validation",
      "Algorithm optimization",
      "Multi-step problem solving",
    ],
    difficulty: "Moderate complexity",
    timeEstimate: "4-6 hours total",
    prerequisites: "Basic programming knowledge required",
  },
  advanced: {
    title: "Advanced Level Challenges",
    description:
      "Master complex applications and real-world problem solving. These advanced challenges combine multiple programming concepts and require sophisticated algorithmic thinking and optimization skills.",
    features: [
      "Complex algorithms",
      "Security implementations",
      "Data structure manipulation",
      "Performance optimization",
      "Real-world applications",
      "Advanced string processing",
      "Comprehensive system design",
    ],
    difficulty: "High complexity",
    timeEstimate: "6-10 hours total",
    prerequisites: "Solid programming foundation required",
  },
}

export function ChallengeInfoModal({ level, color }: ChallengeInfoModalProps) {
  const info = challengeInfo[level]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-gray-400 hover:text-${color}-400 hover:bg-${color}-500/10 hover-scale`}
        >
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-${color}-400 text-xl flex items-center`}>
            <Info className="mr-2 h-5 w-5" />
            {info.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-white font-semibold mb-2">Overview</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{info.description}</p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-3">What You'll Learn</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {info.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 bg-${color}-400 rounded-full`}></div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`bg-${color}-900/20 border border-${color}-700 rounded-lg p-3`}>
              <h5 className={`text-${color}-300 font-medium text-sm mb-1`}>Difficulty</h5>
              <p className="text-gray-300 text-xs">{info.difficulty}</p>
            </div>
            <div className={`bg-${color}-900/20 border border-${color}-700 rounded-lg p-3`}>
              <h5 className={`text-${color}-300 font-medium text-sm mb-1`}>Time Estimate</h5>
              <p className="text-gray-300 text-xs">{info.timeEstimate}</p>
            </div>
            <div className={`bg-${color}-900/20 border border-${color}-700 rounded-lg p-3`}>
              <h5 className={`text-${color}-300 font-medium text-sm mb-1`}>Prerequisites</h5>
              <p className="text-gray-300 text-xs">{info.prerequisites}</p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center">💡 Pro Tips</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Take your time to understand each problem before coding</li>
              <li>• Use the practice mode to experiment with solutions</li>
              <li>• Don't hesitate to view solutions if you're stuck</li>
              <li>• Try to optimize your code after getting it to work</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
