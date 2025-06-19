"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, Facebook, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  const [mounted, setMounted] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    router.push("/")
  }

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp)
    setFormData({
      name: "",
      email: "",
      password: "",
      rememberMe: false,
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background with ultra-smooth blending */}
      <div className="absolute inset-0 animate-gradient-shift"></div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background: linear-gradient(135deg, 
              #f1f5f9 0%, 
              #e2e8f0 8%, 
              #dbeafe 18%, 
              #c3dafe 28%, 
              #bfdbfe 38%, 
              #dbeafe 48%, 
              #e0e7ff 58%, 
              #c7d2fe 68%, 
              #dbeafe 78%, 
              #e2e8f0 88%, 
              #f1f5f9 100%);
          }
          5% {
            background: linear-gradient(135deg, 
              #f1f5f9 0%, 
              #e8e5f0 10%, 
              #e0ddf5 20%, 
              #d8d5fa 30%, 
              #d0cdff 40%, 
              #dbeafe 50%, 
              #e0e7ff 60%, 
              #c7d2fe 70%, 
              #dbeafe 80%, 
              #e2e8f0 90%, 
              #f1f5f9 100%);
          }
          10% {
            background: linear-gradient(135deg, 
              #f3f1f9 0%, 
              #ede8f5 10%, 
              #e7dff1 20%, 
              #e1d6ed 30%, 
              #dbcde9 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #e0e7ff 80%, 
              #e2e8f0 90%, 
              #f1f5f9 100%);
          }
          15% {
            background: linear-gradient(135deg, 
              #f5f3fb 0%, 
              #f1ebf7 10%, 
              #ede3f3 20%, 
              #e9dbef 30%, 
              #e5d3eb 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #a78bfa 80%, 
              #ddd6fe 90%, 
              #f3f1f9 100%);
          }
          20% {
            background: linear-gradient(135deg, 
              #f7f5fd 0%, 
              #f3edf9 10%, 
              #efe5f5 20%, 
              #ebddf1 30%, 
              #e7d5ed 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #a78bfa 80%, 
              #8b5cf6 90%, 
              #ddd6fe 100%);
          }
          25% {
            background: linear-gradient(135deg, 
              #f9f7ff 0%, 
              #f5effa 10%, 
              #f1e7f6 20%, 
              #eddff2 30%, 
              #e9d7ee 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #a78bfa 80%, 
              #8b5cf6 90%, 
              #a855f7 100%);
          }
          30% {
            background: linear-gradient(135deg, 
              #f7f5ff 0%, 
              #f3edf9 10%, 
              #efe5f5 20%, 
              #ebddf1 30%, 
              #e7d5ed 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #a78bfa 80%, 
              #8b5cf6 90%, 
              #ddd6fe 100%);
          }
          35% {
            background: linear-gradient(135deg, 
              #f5f3fb 0%, 
              #f1ebf7 10%, 
              #ede3f3 20%, 
              #e9dbef 30%, 
              #e5d3eb 40%, 
              #e0f2fe 50%, 
              #bae6fd 60%, 
              #7dd3fc 70%, 
              #38bdf8 80%, 
              #0ea5e9 90%, 
              #bae6fd 100%);
          }
          40% {
            background: linear-gradient(135deg, 
              #f3f1f9 0%, 
              #efe9f5 10%, 
              #ebe1f1 20%, 
              #e7d9ed 30%, 
              #e3d1e9 40%, 
              #e0f2fe 50%, 
              #bae6fd 60%, 
              #7dd3fc 70%, 
              #38bdf8 80%, 
              #0ea5e9 90%, 
              #e0f2fe 100%);
          }
          45% {
            background: linear-gradient(135deg, 
              #f1eff7 0%, 
              #ede7f3 10%, 
              #e9dfef 20%, 
              #e5d7eb 30%, 
              #e1cfe7 40%, 
              #f0f9ff 50%, 
              #e0f2fe 60%, 
              #bae6fd 70%, 
              #7dd3fc 80%, 
              #38bdf8 90%, 
              #f0f9ff 100%);
          }
          50% {
            background: linear-gradient(135deg, 
              #f0f9ff 0%, 
              #e8f4fe 10%, 
              #e0effd 20%, 
              #d8eafc 30%, 
              #d0e5fb 40%, 
              #f0f9ff 50%, 
              #e0f2fe 60%, 
              #bae6fd 70%, 
              #7dd3fc 80%, 
              #38bdf8 90%, 
              #0ea5e9 100%);
          }
          55% {
            background: linear-gradient(135deg, 
              #f0f9ff 0%, 
              #e8f4fe 10%, 
              #e0effd 20%, 
              #d8eafc 30%, 
              #d0e5fb 40%, 
              #e0f2fe 50%, 
              #bae6fd 60%, 
              #7dd3fc 70%, 
              #38bdf8 80%, 
              #ddd6fe 90%, 
              #e9d5ff 100%);
          }
          60% {
            background: linear-gradient(135deg, 
              #f3f1f9 0%, 
              #efe9f5 10%, 
              #ebe1f1 20%, 
              #e7d9ed 30%, 
              #e3d1e9 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #a78bfa 80%, 
              #8b5cf6 90%, 
              #ddd6fe 100%);
          }
          65% {
            background: linear-gradient(135deg, 
              #f5f3fb 0%, 
              #f1ebf7 10%, 
              #ede3f3 20%, 
              #e9dbef 30%, 
              #e5d3eb 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #a78bfa 80%, 
              #8b5cf6 90%, 
              #a855f7 100%);
          }
          70% {
            background: linear-gradient(135deg, 
              #f7f5fd 0%, 
              #f3edf9 10%, 
              #efe5f5 20%, 
              #ebddf1 30%, 
              #e7d5ed 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #a78bfa 80%, 
              #8b5cf6 90%, 
              #ddd6fe 100%);
          }
          75% {
            background: linear-gradient(135deg, 
              #f9f7ff 0%, 
              #f5effa 10%, 
              #f1e7f6 20%, 
              #eddff2 30%, 
              #e9d7ee 40%, 
              #e9d5ff 50%, 
              #ddd6fe 60%, 
              #c4b5fd 70%, 
              #a78bfa 80%, 
              #ddd6fe 90%, 
              #e0e7ff 100%);
          }
          80% {
            background: linear-gradient(135deg, 
              #f7f5fd 0%, 
              #f3edf9 10%, 
              #efe5f5 20%, 
              #ebddf1 30%, 
              #e7d5ed 40%, 
              #e0e7ff 50%, 
              #c7d2fe 60%, 
              #a5b4fc 70%, 
              #8b5cf6 80%, 
              #dbeafe 90%, 
              #e2e8f0 100%);
          }
          85% {
            background: linear-gradient(135deg, 
              #f5f3fb 0%, 
              #f1ebf7 10%, 
              #ede3f3 20%, 
              #e9dbef 30%, 
              #e5d3eb 40%, 
              #dbeafe 50%, 
              #bfdbfe 60%, 
              #93c5fd 70%, 
              #60a5fa 80%, 
              #3b82f6 90%, 
              #dbeafe 100%);
          }
          90% {
            background: linear-gradient(135deg, 
              #f3f1f9 0%, 
              #efe9f5 10%, 
              #ebe1f1 20%, 
              #e7d9ed 30%, 
              #e3d1e9 40%, 
              #dbeafe 50%, 
              #bfdbfe 60%, 
              #93c5fd 70%, 
              #60a5fa 80%, 
              #e2e8f0 90%, 
              #f1f5f9 100%);
          }
          95% {
            background: linear-gradient(135deg, 
              #f1f5f9 0%, 
              #e8e5f0 10%, 
              #e0ddf5 20%, 
              #d8d5fa 30%, 
              #d0cdff 40%, 
              #dbeafe 50%, 
              #c3dafe 60%, 
              #a5b4fc 70%, 
              #8b5cf6 80%, 
              #e2e8f0 90%, 
              #f1f5f9 100%);
          }
          100% {
            background: linear-gradient(135deg, 
              #f1f5f9 0%, 
              #e2e8f0 8%, 
              #dbeafe 18%, 
              #c3dafe 28%, 
              #bfdbfe 38%, 
              #dbeafe 48%, 
              #e0e7ff 58%, 
              #c7d2fe 68%, 
              #dbeafe 78%, 
              #e2e8f0 88%, 
              #f1f5f9 100%);
          }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 45s ease-in-out infinite;
          background-size: 400% 400%;
        }
      `}</style>

      {/* Modern Data-Inspired Background */}
      <div className="absolute inset-0">
        {/* Animated gradient overlays with ultra-slow color transitions */}
        <div className="absolute top-0 left-0 w-full h-full animate-overlay-1"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full blur-3xl animate-overlay-2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full blur-3xl animate-overlay-3"></div>

        <style jsx>{`
          @keyframes overlay-1 {
            0% { background: linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, transparent 50%, rgba(99, 102, 241, 0.12) 100%); }
            5% { background: linear-gradient(135deg, rgba(67, 126, 245, 0.07) 0%, transparent 50%, rgba(107, 99, 242, 0.13) 100%); }
            10% { background: linear-gradient(135deg, rgba(75, 122, 244, 0.08) 0%, transparent 50%, rgba(115, 96, 243, 0.14) 100%); }
            15% { background: linear-gradient(135deg, rgba(83, 118, 243, 0.09) 0%, transparent 50%, rgba(123, 93, 244, 0.15) 100%); }
            20% { background: linear-gradient(135deg, rgba(91, 114, 242, 0.10) 0%, transparent 50%, rgba(131, 90, 245, 0.16) 100%); }
            25% { background: linear-gradient(135deg, rgba(99, 110, 241, 0.11) 0%, transparent 50%, rgba(139, 87, 246, 0.17) 100%); }
            30% { background: linear-gradient(135deg, rgba(107, 106, 240, 0.10) 0%, transparent 50%, rgba(147, 84, 247, 0.16) 100%); }
            35% { background: linear-gradient(135deg, rgba(115, 102, 239, 0.09) 0%, transparent 50%, rgba(155, 81, 248, 0.15) 100%); }
            40% { background: linear-gradient(135deg, rgba(123, 98, 238, 0.08) 0%, transparent 50%, rgba(163, 78, 249, 0.14) 100%); }
            45% { background: linear-gradient(135deg, rgba(131, 94, 237, 0.07) 0%, transparent 50%, rgba(56, 189, 248, 0.13) 100%); }
            50% { background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, transparent 50%, rgba(14, 165, 233, 0.14) 100%); }
            55% { background: linear-gradient(135deg, rgba(64, 185, 247, 0.09) 0%, transparent 50%, rgba(22, 161, 234, 0.15) 100%); }
            60% { background: linear-gradient(135deg, rgba(72, 181, 246, 0.10) 0%, transparent 50%, rgba(30, 157, 235, 0.16) 100%); }
            65% { background: linear-gradient(135deg, rgba(80, 177, 245, 0.09) 0%, transparent 50%, rgba(139, 92, 246, 0.15) 100%); }
            70% { background: linear-gradient(135deg, rgba(88, 173, 244, 0.08) 0%, transparent 50%, rgba(147, 89, 247, 0.14) 100%); }
            75% { background: linear-gradient(135deg, rgba(96, 169, 243, 0.07) 0%, transparent 50%, rgba(155, 86, 248, 0.13) 100%); }
            80% { background: linear-gradient(135deg, rgba(75, 152, 242, 0.08) 0%, transparent 50%, rgba(107, 99, 242, 0.14) 100%); }
            85% { background: linear-gradient(135deg, rgba(67, 146, 241, 0.09) 0%, transparent 50%, rgba(99, 102, 241, 0.15) 100%); }
            90% { background: linear-gradient(135deg, rgba(63, 142, 240, 0.08) 0%, transparent 50%, rgba(91, 105, 240, 0.14) 100%); }
            95% { background: linear-gradient(135deg, rgba(61, 138, 239, 0.07) 0%, transparent 50%, rgba(83, 108, 239, 0.13) 100%); }
            100% { background: linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, transparent 50%, rgba(99, 102, 241, 0.12) 100%); }
          }
          
          @keyframes overlay-2 {
            0% { background: linear-gradient(225deg, rgba(59, 130, 246, 0.10) 0%, transparent 100%); }
            12.5% { background: linear-gradient(225deg, rgba(91, 114, 242, 0.12) 0%, transparent 100%); }
            25% { background: linear-gradient(225deg, rgba(139, 92, 246, 0.13) 0%, transparent 100%); }
            37.5% { background: linear-gradient(225deg, rgba(168, 85, 247, 0.12) 0%, transparent 100%); }
            50% { background: linear-gradient(225deg, rgba(56, 189, 248, 0.11) 0%, transparent 100%); }
            62.5% { background: linear-gradient(225deg, rgba(14, 165, 233, 0.12) 0%, transparent 100%); }
            75% { background: linear-gradient(225deg, rgba(139, 92, 246, 0.13) 0%, transparent 100%); }
            87.5% { background: linear-gradient(225deg, rgba(99, 102, 241, 0.12) 0%, transparent 100%); }
            100% { background: linear-gradient(225deg, rgba(59, 130, 246, 0.10) 0%, transparent 100%); }
          }
          
          @keyframes overlay-3 {
            0% { background: linear-gradient(45deg, rgba(99, 102, 241, 0.08) 0%, transparent 100%); }
            12.5% { background: linear-gradient(45deg, rgba(115, 96, 243, 0.09) 0%, transparent 100%); }
            25% { background: linear-gradient(45deg, rgba(139, 92, 246, 0.11) 0%, transparent 100%); }
            37.5% { background: linear-gradient(45deg, rgba(168, 85, 247, 0.10) 0%, transparent 100%); }
            50% { background: linear-gradient(45deg, rgba(14, 165, 233, 0.09) 0%, transparent 100%); }
            62.5% { background: linear-gradient(45deg, rgba(56, 189, 248, 0.10) 0%, transparent 100%); }
            75% { background: linear-gradient(45deg, rgba(139, 92, 246, 0.11) 0%, transparent 100%); }
            87.5% { background: linear-gradient(45deg, rgba(107, 99, 242, 0.10) 0%, transparent 100%); }
            100% { background: linear-gradient(45deg, rgba(99, 102, 241, 0.08) 0%, transparent 100%); }
          }
          
          .animate-overlay-1 { animation: overlay-1 45s ease-in-out infinite; }
          .animate-overlay-2 { animation: overlay-2 45s ease-in-out infinite 5s; }
          .animate-overlay-3 { animation: overlay-3 45s ease-in-out infinite 10s; }
        `}</style>

        {/* Data visualization elements */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          {/* Chart lines with animated colors */}
          <path
            d="M100 400 Q200 300 300 350 T500 280 T700 320 T900 250"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M150 450 Q250 380 350 400 T550 340 T750 380 T950 320"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          {/* Data points with ultra-slow color transitions */}
          <circle cx="300" cy="350" r="4" className="animate-pulse animate-color-shift-1" />
          <circle
            cx="500"
            cy="280"
            r="3"
            className="animate-pulse animate-color-shift-2"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="700"
            cy="320"
            r="4"
            className="animate-pulse animate-color-shift-3"
            style={{ animationDelay: "1s" }}
          />

          <style jsx>{`
            @keyframes color-shift-1 {
              0% { fill: #3b82f6; }
              12.5% { fill: #5b7ef5; }
              25% { fill: #8b5cf6; }
              37.5% { fill: #a855f7; }
              50% { fill: #38bdf8; }
              62.5% { fill: #0ea5e9; }
              75% { fill: #8b5cf6; }
              87.5% { fill: #6366f1; }
              100% { fill: #3b82f6; }
            }
            
            @keyframes color-shift-2 {
              0% { fill: #6366f1; }
              12.5% { fill: #7c6ef2; }
              25% { fill: #a855f7; }
              37.5% { fill: #c084fc; }
              50% { fill: #0ea5e9; }
              62.5% { fill: #38bdf8; }
              75% { fill: #8b5cf6; }
              87.5% { fill: #7c3aed; }
              100% { fill: #6366f1; }
            }
            
            @keyframes color-shift-3 {
              0% { fill: #8b5cf6; }
              12.5% { fill: #9f6ef7; }
              25% { fill: #c084fc; }
              37.5% { fill: #d8b4fe; }
              50% { fill: #7dd3fc; }
              62.5% { fill: #38bdf8; }
              75% { fill: #a78bfa; }
              87.5% { fill: #9333ea; }
              100% { fill: #8b5cf6; }
            }
            
            .animate-color-shift-1 { animation: color-shift-1 45s ease-in-out infinite; }
            .animate-color-shift-2 { animation: color-shift-2 45s ease-in-out infinite 5s; }
            .animate-color-shift-3 { animation: color-shift-3 45s ease-in-out infinite 10s; }
          `}</style>

          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating data elements with ultra-slow synchronized color changes */}
        <div className="absolute top-1/4 left-1/6 w-8 h-8 rounded border flex items-center justify-center animate-pulse animate-element-1">
          <div className="w-2 h-2 rounded animate-pulse animate-dot-1"></div>
        </div>
        <div
          className="absolute top-1/3 right-1/4 w-6 h-6 rounded border flex items-center justify-center animate-pulse animate-element-2"
          style={{ animationDelay: "3s" }}
        >
          <div className="w-1.5 h-1.5 rounded animate-pulse animate-dot-2"></div>
        </div>
        <div
          className="absolute bottom-1/3 left-1/3 w-10 h-10 rounded border flex items-center justify-center animate-pulse animate-element-3"
          style={{ animationDelay: "6s" }}
        >
          <div className="w-2.5 h-2.5 rounded animate-pulse animate-dot-3"></div>
        </div>

        <style jsx>{`
          @keyframes element-1 {
            0% { background-color: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.16); }
            12.5% { background-color: rgba(75, 122, 244, 0.09); border-color: rgba(75, 122, 244, 0.18); }
            25% { background-color: rgba(139, 92, 246, 0.10); border-color: rgba(139, 92, 246, 0.20); }
            37.5% { background-color: rgba(168, 85, 247, 0.09); border-color: rgba(168, 85, 247, 0.18); }
            50% { background-color: rgba(56, 189, 248, 0.08); border-color: rgba(56, 189, 248, 0.16); }
            62.5% { background-color: rgba(14, 165, 233, 0.09); border-color: rgba(14, 165, 233, 0.18); }
            75% { background-color: rgba(139, 92, 246, 0.10); border-color: rgba(139, 92, 246, 0.20); }
            87.5% { background-color: rgba(99, 102, 241, 0.09); border-color: rgba(99, 102, 241, 0.18); }
            100% { background-color: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.16); }
          }
          
          @keyframes dot-1 {
            0% { background-color: #3b82f6; }
            12.5% { background-color: #5b7ef5; }
            25% { background-color: #8b5cf6; }
            37.5% { background-color: #a855f7; }
            50% { background-color: #38bdf8; }
            62.5% { background-color: #0ea5e9; }
            75% { background-color: #8b5cf6; }
            87.5% { background-color: #6366f1; }
            100% { background-color: #3b82f6; }
          }
          
          .animate-element-1 { animation: element-1 45s ease-in-out infinite; }
          .animate-dot-1 { animation: dot-1 45s ease-in-out infinite; }
          .animate-element-2 { animation: element-1 45s ease-in-out infinite 5s; }
          .animate-dot-2 { animation: dot-1 45s ease-in-out infinite 5s; }
          .animate-element-3 { animation: element-1 45s ease-in-out infinite 10s; }
          .animate-dot-3 { animation: dot-1 45s ease-in-out infinite 10s; }
        `}</style>

        {/* Subtle geometric shapes with ultra-slow rotation and color animation */}
        <div
          className="absolute top-20 right-32 w-32 h-32 border rounded-lg animate-spin animate-border-1"
          style={{ animationDuration: "60s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-24 h-24 border rounded-full animate-pulse animate-border-2"
          style={{ animationDelay: "15s" }}
        ></div>

        <style jsx>{`
          @keyframes border-1 {
            0% { border-color: rgba(59, 130, 246, 0.25); }
            12.5% { border-color: rgba(75, 122, 244, 0.27); }
            25% { border-color: rgba(139, 92, 246, 0.30); }
            37.5% { border-color: rgba(168, 85, 247, 0.28); }
            50% { border-color: rgba(56, 189, 248, 0.26); }
            62.5% { border-color: rgba(14, 165, 233, 0.28); }
            75% { border-color: rgba(139, 92, 246, 0.30); }
            87.5% { border-color: rgba(99, 102, 241, 0.27); }
            100% { border-color: rgba(59, 130, 246, 0.25); }
          }
          
          @keyframes border-2 {
            0% { border-color: rgba(168, 85, 247, 0.25); }
            12.5% { border-color: rgba(180, 83, 248, 0.27); }
            25% { border-color: rgba(196, 181, 253, 0.30); }
            37.5% { border-color: rgba(221, 214, 254, 0.28); }
            50% { border-color: rgba(125, 211, 252, 0.26); }
            62.5% { border-color: rgba(56, 189, 248, 0.28); }
            75% { border-color: rgba(167, 139, 250, 0.30); }
            87.5% { border-color: rgba(147, 197, 253, 0.27); }
            100% { border-color: rgba(168, 85, 247, 0.25); }
          }
          
          .animate-border-1 { animation: border-1 45s ease-in-out infinite; }
          .animate-border-2 { animation: border-2 45s ease-in-out infinite 10s; }
        `}</style>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Brand */}
        <div className="flex-1 flex items-center justify-center px-16">
          <div className="text-center max-w-lg">
            {/* Logo */}
            <div className="w-14 h-14 bg-blue-600/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-8 border border-blue-600/20">
              <BarChart3 className="h-7 w-7 text-blue-600" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-3 text-gray-900">MindfulAI</h1>
            <h2 className="text-lg text-blue-600 mb-8">Facebook Analytics Dashboard</h2>

            {/* Tagline */}
            <p className="text-gray-600 text-base leading-relaxed">
              Unlock the power of your Facebook advertising data with our cutting-edge analytics platform. Transform
              insights into action.
            </p>
          </div>
        </div>

        {/* Right side - Auth Form (moved further to the left) */}
        <div className="flex items-center justify-center px-16 flex-1">
          <Card className="w-full max-w-sm bg-white/90 backdrop-blur-sm border border-white/50 shadow-2xl">
            <CardHeader className="text-center pb-6 pt-6">
              <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                {isSignUp ? "Sign Up" : "Sign In"}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 leading-relaxed">
                {isSignUp
                  ? "Create your account to get started"
                  : "Enter your email and password to access your dashboard"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-10 text-sm"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-10 pl-9 text-sm"
                    />
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-10 pl-9 pr-9 text-sm"
                    />
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                        }
                      />
                      <Label htmlFor="rememberMe" className="text-xs text-gray-600">
                        Remember me
                      </Label>
                    </div>
                    <Link href="#" className="text-xs text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm"
                  >
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-400 font-medium">OR CONTINUE WITH</span>
                </div>
              </div>

              <Button variant="outline" type="button" className="w-full h-10 border-gray-200 text-sm">
                <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                Continue with Facebook
              </Button>

              <div className="text-center mt-6">
                <p className="text-xs text-gray-600">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    {isSignUp ? "Sign in" : "Sign up"}
                  </button>
                </p>
              </div>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  By signing in, you agree to our{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
