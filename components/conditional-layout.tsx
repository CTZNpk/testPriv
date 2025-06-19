"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith("/auth/")

  if (isAuthPage) {
    // Full screen layout with rounded container for auth pages
    return (
      <div className="min-h-screen bg-blue-50">
        <div className="p-4 h-screen">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">{children}</div>
        </div>
      </div>
    )
  }

  // Dashboard layout with sidebar for all other pages
  return (
    <div className="flex min-h-screen bg-blue-50 overflow-hidden">
      <AppSidebar />
      <div className="flex-1 ml-[272px] min-w-0">
        <div className="p-4 h-screen">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">{children}</div>
        </div>
      </div>
    </div>
  )
}
