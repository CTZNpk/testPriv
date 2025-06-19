"use client"

import { useState, useEffect } from "react"
import { Building2, CreditCard, Share2 } from "lucide-react"
import { WorkspacesTab } from "@/components/settings/workspaces-tab"
import { SubscriptionTab } from "@/components/settings/subscription-tab"
import { ReferralTab } from "@/components/settings/referral-tab"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("workspaces")

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
          <h1 className="text-lg font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
        </div>
      </header>

      <div className="flex-1 space-y-8 p-4 pt-8">
        {/* Ultra Modern Tab System - Left Aligned */}
        <div className="flex justify-start">
          <div className="inline-flex items-center bg-white border border-gray-200/60 rounded-2xl p-1 shadow-sm backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("workspaces")}
              className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "workspaces"
                  ? "bg-blue-50 text-blue-700 shadow-lg shadow-blue-100/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/80"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Workspaces</span>
            </button>
            <button
              onClick={() => setActiveTab("subscription")}
              className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "subscription"
                  ? "bg-blue-50 text-blue-700 shadow-lg shadow-blue-100/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/80"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>Subscription</span>
            </button>
            <button
              onClick={() => setActiveTab("refer")}
              className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "refer"
                  ? "bg-blue-50 text-blue-700 shadow-lg shadow-blue-100/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/80"
              }`}
            >
              <Share2 className="h-4 w-4" />
              <span>Refer</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "workspaces" && <WorkspacesTab />}
        {activeTab === "subscription" && <SubscriptionTab />}
        {activeTab === "refer" && <ReferralTab />}
      </div>
    </>
  )
}
