"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Code, Eye, EyeOff, Home } from "lucide-react"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { toast } from "@/hooks/use-toast"

const advancedProblems = [
  {
    id: 201,
    title: "Password Strength Checker",
    description:
      "Create a comprehensive password strength checker that evaluates passwords based on multiple criteria.",
    code: `# Password Strength Checker (using for loop)
password_for = ""
length_for = 0
digit_count_for = 0
upper_count_for = 0
lower_count_for = 0
special_count_for = 0
i_for = 0
char_for = ""
strength_for = ""

print("Password Strength Checker (using for loop)")
print("Enter your password:")
password_for = input()

length_for = 0
# Manually calculate length of the string
for char_for in password_for:
    length_for = length_for + 1

# Reset counts
digit_count_for = 0
upper_count_for = 0
lower_count_for = 0
special_count_for = 0

# Check character types
for i_for in range(length_for):
    char_for = password_for[i_for]

    # Check if digit
    if char_for == '0' or char_for == '1' or char_for == '2' or \\
       char_for == '3' or char_for == '4' or char_for == '5' or \\
       char_for == '6' or char_for == '7' or char_for == '8' or \\
       char_for == '9':
        digit_count_for = digit_count_for + 1
    # Check if uppercase letter
    elif char_for >= 'A' and char_for <= 'Z':
        upper_count_for = upper_count_for + 1
    # Check if lowercase letter
    elif char_for >= 'a' and char_for <= 'z':
        lower_count_for = lower_count_for + 1
    # Assume anything else is special
    else:
        special_count_for = special_count_for + 1

# Determine strength
if length_for < 8:
    strength_for = "Very Weak – Fewer than 8 characters"
elif digit_count_for == 0:
    strength_for = "Weak – No numeric digits"
elif digit_count_for >= 2 and (upper_count_for + lower_count_for >= 2):
    strength_for = "Medium – At least 2 digits and 2 letters"
elif digit_count_for >= 2 and upper_count_for >= 2 and lower_count_for >= 2:
    strength_for = "Strong – At least 2 digits, 2 uppercase letters, and 2 lowercase letters"
elif digit_count_for >= 2 and upper_count_for >= 2 and lower_count_for >= 2 and \\
     special_count_for >= 2 and length_for > 16:
    strength_for = "Very Strong – At least 2 digits, 2 uppercase, 2 lowercase, 2 special characters, and more than 16 characters"
else:
    strength_for = "Medium (or higher, but not fully meeting higher criteria)"

print("Password Strength:", strength_for)`,
    difficulty: "hard",
  },
  {
    id: 202,
    title: "Temperature Converter",
    description:
      "Create a comprehensive temperature converter that can convert between Celsius, Fahrenheit, and Kelvin.",
    code: `# Declare variables
unit_from = ""
unit_to = ""
temperature_val = 0.0
converted_temp = 0.0

print("Temperature Converter")
print("Enter the unit you are converting from (C, F, K):")
unit_from = input()
print("Enter the unit you are converting to (C, F, K):")
unit_to = input()
print("Enter the temperature value:")
temperature_val = float(input())

if unit_from == "C":
    if unit_to == "F":
        converted_temp = (temperature_val * 9/5) + 32
        print("Converted temperature:")
        print(converted_temp, "F")
    elif unit_to == "K":
        converted_temp = temperature_val + 273.15
        print("Converted temperature:")
        print(converted_temp, "K")
    elif unit_to == "C":
        print("No conversion needed. Temperature is:")
        print(temperature_val, "C")
    else:
        print("Invalid 'to' unit.")
elif unit_from == "F":
    if unit_to == "C":
        converted_temp = (temperature_val - 32) * 5/9
        print("Converted temperature:")
        print(converted_temp, "C")
    elif unit_to == "K":
        converted_temp = (temperature_val - 32) * 5/9 + 273.15
        print("Converted temperature:")
        print(converted_temp, "K")
    elif unit_to == "F":
        print("No conversion needed. Temperature is:")
        print(temperature_val, "F")
    else:
        print("Invalid 'to' unit.")
elif unit_from == "K":
    if unit_to == "C":
        converted_temp = temperature_val - 273.15
        print("Converted temperature:")
        print(converted_temp, "C")
    elif unit_to == "F":
        converted_temp = (temperature_val - 273.15) * 9/5 + 32
        print("Converted temperature:")
        print(converted_temp, "F")
    elif unit_to == "K":
        print("No conversion needed. Temperature is:")
        print(temperature_val, "K")
    else:
        print("Invalid 'to' unit.")
else:
    print("Invalid 'from' unit.")`,
    difficulty: "hard",
  },
  {
    id: 203,
    title: "Password Cracker Simulation",
    description: "Simulate a password cracker that attempts to crack an 8-digit numeric password using brute force.",
    code: `# Declare variables
target_password = ""
guess_count = 0
current_guess_int = 0
is_cracked = False
guess_str = ""

print("Password Cracker Simulation")
print("Enter an 8-digit numeric password:")
target_password = input()

# Basic validation for an 8-digit numeric password
length_target_password = 0
temp_char = ""
i_length = 0
while i_length < 10:
  try:
      temp_char = target_password[i_length]
      length_target_password = length_target_password + 1
      i_length = i_length + 1
  except:
      break

if length_target_password != 8:
  print("Error: Password must be 8 digits long.")
else:
  current_guess_int = 0
  max_guess = 99999999
  
  while current_guess_int <= max_guess:
      # Convert current_guess_int to 8-digit string with leading zeros
      temp_num = current_guess_int
      digit_8 = temp_num % 10
      temp_num = temp_num // 10
      digit_7 = temp_num % 10
      temp_num = temp_num // 10
      digit_6 = temp_num % 10
      temp_num = temp_num // 10
      digit_5 = temp_num % 10
      temp_num = temp_num // 10
      digit_4 = temp_num % 10
      temp_num = temp_num // 10
      digit_3 = temp_num % 10
      temp_num = temp_num // 10
      digit_2 = temp_num % 10
      temp_num = temp_num // 10
      digit_1 = temp_num % 10

      guess_str = str(digit_1) + str(digit_2) + str(digit_3) + str(digit_4) + \\
                  str(digit_5) + str(digit_6) + str(digit_7) + str(digit_8)

      guess_count = guess_count + 1

      if guess_count % 10 == 0:
          print("Please wait a little longer...")
      print("Checking:", guess_str)

      if guess_str == target_password:
          is_cracked = True
          break
      
      current_guess_int = current_guess_int + 1

  if is_cracked:
      print("Password cracked! It took", guess_count, "attempts.")
      print("The password is:", target_password)
  else:
      print("Could not crack the password within the defined range.")`,
    difficulty: "hard",
  },
  {
    id: 204,
    title: "GPA Calculator",
    description: "Create a comprehensive GPA calculator that can handle multiple subjects and calculate overall GPA.",
    code: `# Declare variables
num_subjects = 0
marks = 0.0
total_grade_points = 0.0
total_credits = 0.0
gpa = 0.0
choice_fourth_subject = ""
marks_fourth = 0.0
grade_points_fourth = 0.0
gpa_without_fourth = 0.0

print("GPA Calculator")
print("Enter marks for at least 3 subjects.")

# Subject 1
print("Enter marks for Subject 1 (out of 100):")
marks = float(input())
if marks >= 90:
  total_grade_points = total_grade_points + 4.0
elif marks >= 80:
  total_grade_points = total_grade_points + 3.0
elif marks >= 70:
  total_grade_points = total_grade_points + 2.0
elif marks >= 60:
  total_grade_points = total_grade_points + 1.0
else:
  total_grade_points = total_grade_points + 0.0
total_credits = total_credits + 3.0

# Subject 2
print("Enter marks for Subject 2 (out of 100):")
marks = float(input())
if marks >= 90:
  total_grade_points = total_grade_points + 4.0
elif marks >= 80:
  total_grade_points = total_grade_points + 3.0
elif marks >= 70:
  total_grade_points = total_grade_points + 2.0
elif marks >= 60:
  total_grade_points = total_grade_points + 1.0
else:
  total_grade_points = total_grade_points + 0.0
total_credits = total_credits + 3.0

# Subject 3
print("Enter marks for Subject 3 (out of 100):")
marks = float(input())
if marks >= 90:
  total_grade_points = total_grade_points + 4.0
elif marks >= 80:
  total_grade_points = total_grade_points + 3.0
elif marks >= 70:
  total_grade_points = total_grade_points + 2.0
elif marks >= 60:
  total_grade_points = total_grade_points + 1.0
else:
  total_grade_points = total_grade_points + 0.0
total_credits = total_credits + 3.0

gpa_without_fourth = total_grade_points / total_credits
print("GPA with 3 subjects:")
print(gpa_without_fourth)

print("Do you want to add a 4th subject? (yes/no):")
choice_fourth_subject = input()

if choice_fourth_subject == "yes":
  print("Enter marks for Subject 4 (out of 100):")
  marks_fourth = float(input())
  if marks_fourth >= 90:
      grade_points_fourth = 4.0
  elif marks_fourth >= 80:
      grade_points_fourth = 3.0
  elif marks_fourth >= 70:
      grade_points_fourth = 2.0
  elif marks_fourth >= 60:
      grade_points_fourth = 1.0
  else:
      grade_points_fourth = 0.0
  
  total_grade_points = total_grade_points + grade_points_fourth
  total_credits = total_credits + 3.0

  gpa = total_grade_points / total_credits
  print("GPA with 4 subjects:")
  print(gpa)
else:
  print("Final GPA (without 4th subject) is:")
  print(gpa_without_fourth)`,
    difficulty: "hard",
  },
]

export default function AdvancedProblems() {
  const [visibleSolutions, setVisibleSolutions] = useState<Record<number, boolean>>({})
  const [completedProblems, setCompletedProblems] = useState<number[]>([])

  useEffect(() => {
    const savedCompletedProblems = JSON.parse(localStorage.getItem("completedProblems") || "[]") as number[]
    setCompletedProblems(savedCompletedProblems.filter((id) => advancedProblems.some((p) => p.id === id)))
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
              <Code className="h-8 w-8 text-amber-500" />
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
            <Badge className="mb-4 bg-amber-950 text-amber-400">Advanced Level</Badge>
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Advanced Programming Problems</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Challenge yourself with complex applications and real-world problem solving. These problems combine
              multiple concepts and require advanced algorithmic thinking.
            </p>
            <div className="mt-6">
              <Badge variant="outline" className="border-amber-500 text-amber-400">
                <CheckCircle className="mr-1 h-3 w-3" />
                {completedProblems.length} of {advancedProblems.length} completed
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {advancedProblems.map((problem) => (
              <Card key={problem.id} className="bg-slate-900 border-slate-800 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-amber-400">
                          Problem {problem.id - 200}: {problem.title}
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
                        className={`hover:bg-slate-800 ${completedProblems.includes(problem.id) ? "text-amber-400" : "text-slate-500"}`}
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
          <div className="mt-12 flex justify-center">
            <Link href="/intermediate">
              <Button
                variant="outline"
                className="border-slate-700 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              >
                Previous: Intermediate Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
