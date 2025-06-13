"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Terminal, Home, CheckCircle, Copy } from "lucide-react"
import Link from "next/link"
import { SyntaxHighlighter } from "@/components/syntax-highlighter"
import { ChallengeInfoModal } from "@/components/challenge-info-modal"
import { useToast } from "@/hooks/use-toast"

const advancedProblems = [
  {
    id: "advanced-1",
    title: "Password Strength Checker (For Loop)",
    description:
      "Create a comprehensive password strength checker that evaluates passwords based on multiple criteria using a for loop.",
    code: `password_for = ""
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
for char_for in password_for:
    length_for = length_for + 1

digit_count_for = 0
upper_count_for = 0
lower_count_for = 0
special_count_for = 0

for i_for in range(length_for):
    char_for = password_for[i_for]

    if char_for == '0' or char_for == '1' or char_for == '2' or char_for == '3' or char_for == '4' or char_for == '5' or char_for == '6' or char_for == '7' or char_for == '8' or char_for == '9':
        digit_count_for = digit_count_for + 1
    elif char_for >= 'A' and char_for <= 'Z':
        upper_count_for = upper_count_for + 1
    elif char_for >= 'a' and char_for <= 'z':
        lower_count_for = lower_count_for + 1
    else:
        special_count_for = special_count_for + 1

if length_for < 8:
    strength_for = "Very Weak – Fewer than 8 characters"
elif digit_count_for == 0:
    strength_for = "Weak – No numeric digits"
elif digit_count_for >= 2 and (upper_count_for + lower_count_for >= 2):
    strength_for = "Medium – At least 2 digits and 2 letters"
elif digit_count_for >= 2 and upper_count_for >= 2 and lower_count_for >= 2:
    strength_for = "Strong – At least 2 digits, 2 uppercase letters, and 2 lowercase letters"
elif digit_count_for >= 2 and upper_count_for >= 2 and lower_count_for >= 2 and special_count_for >= 2 and length_for > 16:
    strength_for = "Very Strong – At least 2 digits, 2 uppercase, 2 lowercase, 2 special characters, and more than 16 characters"
else:
    strength_for = "Medium (or higher, but not fully meeting higher criteria)"

print("Password Strength:", strength_for)`,
  },
  {
    id: "advanced-2",
    title: "Password Strength Checker (While Loop)",
    description:
      "Create a comprehensive password strength checker that evaluates passwords based on multiple criteria using a while loop.",
    code: `password_while = ""
length_while = 0
digit_count_while = 0
upper_count_while = 0
lower_count_while = 0
special_count_while = 0
i_while = 0
char_while = ""
strength_while = ""

print("Password Strength Checker (using while loop)")
print("Enter your password:")
password_while = input()

i_while = 0
while i_while < 1000:
    try:
        char_while = password_while[i_while]
        length_while = length_while + 1
        i_while = i_while + 1
    except:
        break

digit_count_while = 0
upper_count_while = 0
lower_count_while = 0
special_count_while = 0

i_while = 0
while i_while < length_while:
    char_while = password_while[i_while]

    if char_while == '0' or char_while == '1' or char_while == '2' or char_while == '3' or char_while == '4' or char_while == '5' or char_while == '6' or char_while == '7' or char_while == '8' or char_while == '9':
        digit_count_while = digit_count_while + 1
    elif char_while >= 'A' and char_while <= 'Z':
        upper_count_while = upper_count_while + 1
    elif char_while >= 'a' and char_while <= 'z':
        lower_count_while = lower_count_while + 1
    else:
        special_count_while = special_count_while + 1
    i_while = i_while + 1

if length_while < 8:
    strength_while = "Very Weak – Fewer than 8 characters"
elif digit_count_while == 0:
    strength_while = "Weak – No numeric digits"
elif digit_count_while >= 2 and (upper_count_while + lower_count_while >= 2):
    strength_while = "Medium – At least 2 digits and 2 letters"
elif digit_count_while >= 2 and upper_count_while >= 2 and lower_count_while >= 2:
    strength_while = "Strong – At least 2 digits, 2 uppercase letters, and 2 lowercase letters"
elif digit_count_while >= 2 and upper_count_while >= 2 and lower_count_while >= 2 and special_count_while >= 2 and length_while > 16:
    strength_while = "Very Strong – At least 2 digits, 2 uppercase, 2 lowercase, 2 special characters, and more than 16 characters"
else:
    strength_while = "Medium (or higher, but not fully meeting higher criteria)"

print("Password Strength:", strength_while)`,
  },
  {
    id: "advanced-3",
    title: "Temperature Converter",
    description:
      "Create a temperature converter that can convert between Celsius ↔ Fahrenheit, Celsius ↔ Kelvin, Fahrenheit ↔ Kelvin.",
    code: `unit_from = ""
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
  },
  {
    id: "advanced-4",
    title: "Password Cracker Simulation",
    description: "Simulate a password cracker that attempts to crack an 8-digit numeric password using brute force.",
    code: `target_password = ""
guess_count = 0
current_guess_int = 0
is_cracked = False
guess_str = ""

print("Password Cracker Simulation")
print("Enter an 8-digit numeric password:")
target_password = input()

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

        guess_str = str(digit_1) + str(digit_2) + str(digit_3) + str(digit_4) + str(digit_5) + str(digit_6) + str(digit_7) + str(digit_8)

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
  },
  {
    id: "advanced-5",
    title: "GPA Calculator",
    description: "Create a comprehensive GPA calculator that can handle multiple subjects and calculate overall GPA.",
    code: `num_subjects = 0
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
  },
]

export default function AdvancedProblems() {
  const [visibleSolutions, setVisibleSolutions] = useState<Set<string>>(new Set())
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set())
  const [practiceMode, setPracticeMode] = useState(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CodeMaster
                </h1>
                <p className="text-xs text-gray-400">Advanced Challenges</p>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <ChallengeInfoModal level="advanced" color="purple" />
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
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="container mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
              Advanced Level
            </Badge>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Expert Challenges
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Master complex applications and real-world problem solving.
            </p>
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            {advancedProblems.map((problem, index) => (
              <Card
                key={problem.id}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                          Problem {index + 1}
                        </Badge>
                        {completedProblems.has(problem.id) && <CheckCircle className="h-5 w-5 text-purple-400" />}
                      </div>
                      <CardTitle className="text-2xl text-purple-400 mb-3">{problem.title}</CardTitle>
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
                          className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
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
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <>
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
                          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Solution
                        </Button>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-full"
                      onClick={() => {
                        navigator.clipboard.writeText(problem.code)
                        toast({
                          title: "Copied to clipboard",
                          description: "The code has been copied to your clipboard.",
                        })
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-16 flex justify-center">
            <Link href="/intermediate">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                ← Previous: Intermediate Challenges
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
