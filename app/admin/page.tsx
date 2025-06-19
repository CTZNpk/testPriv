"use client"

import { useState, useEffect } from "react"
import { Users, Facebook } from "lucide-react"
import { UsersTab } from "@/components/admin/users-tab"
import { AdAccountsTab } from "@/components/admin/ad-accounts-tab"

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("users")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage users and ad accounts</p>
        </div>
      </header>

      <div className="flex-1 space-y-8 p-4 pt-8">
        {/* Ultra Modern Tab System - Left Aligned */}
        <div className="flex justify-start">
          <div className="inline-flex items-center bg-white border border-gray-200/60 rounded-2xl p-1 shadow-sm backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("users")}
              className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "users"
                  ? "bg-blue-50 text-blue-700 shadow-lg shadow-blue-100/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/80"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </button>
            <button
              onClick={() => setActiveTab("accounts")}
              className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "accounts"
                  ? "bg-blue-50 text-blue-700 shadow-lg shadow-blue-100/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/80"
              }`}
            >
              <Facebook className="h-4 w-4" />
              <span>Ad Accounts</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "accounts" && <AdAccountsTab />}
      </div>
    </>
  )
}
