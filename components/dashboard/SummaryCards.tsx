"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Eye, MousePointer, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface SummaryCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: React.ElementType
}

function SummaryCard({ title, value, change, changeType, icon: Icon }: SummaryCardProps) {
  const isPositive = changeType === "positive"

  return (
    <Card className="border-[hsl(var(--accent-20))] shadow-sm transition-all duration-200 hover:shadow-md hover:bg-[hsl(var(--accent-5))]">
      <CardContent className="p-2 sm:p-3 lg:p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-tight break-all">{value}</p>
            <div className="flex items-center gap-0.5 sm:gap-1">
              {isPositive ? (
                <ArrowUpRight className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-green-600 flex-shrink-0" />
              ) : (
                <ArrowDownRight className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-red-600 flex-shrink-0" />
              )}
              <span className={`text-xs font-medium leading-tight ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {change} from last month
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2 sm:ml-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[hsl(var(--accent-10))] rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[hsl(var(--accent-20))]">
              <Icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-[hsl(var(--primary))]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SummaryCards() {
  const summaryData = [
    {
      title: "Total Spend",
      value: "$12,847.32",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Impressions",
      value: "2.4M",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Eye,
    },
    {
      title: "Clicks",
      value: "48,392",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: MousePointer,
    },
    {
      title: "ROAS",
      value: "4.2x",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
      {summaryData.map((item, index) => (
        <SummaryCard
          key={index}
          title={item.title}
          value={item.value}
          change={item.change}
          changeType={item.changeType}
          icon={item.icon}
        />
      ))}
    </div>
  )
}
