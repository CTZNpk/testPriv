"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { HeatmapData } from "@/types/dashboard"
import { Info } from "lucide-react"

interface PerformanceHeatmapProps {
  data: HeatmapData[]
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const HOURS = Array.from({ length: 24 }, (_, i) => i)

export function PerformanceHeatmap({ data }: PerformanceHeatmapProps) {
  const [metric, setMetric] = useState<"cpa" | "ctr">("cpa")

  const getColorIntensity = (value: number, metric: "cpa" | "ctr") => {
    let normalizedValue: number

    if (metric === "cpa") {
      // Lower CPA is better (green), higher CPA is worse (red)
      // Assuming CPA range 15-40, normalize to 0-1 where 0 is best (green) and 1 is worst (red)
      normalizedValue = Math.min(Math.max((value - 15) / 25, 0), 1)
      // Invert so lower CPA gets green (0) and higher CPA gets red (1)
      const redIntensity = normalizedValue
      const greenIntensity = 1 - normalizedValue
      return `rgb(${Math.round(255 * redIntensity + 34 * greenIntensity)}, ${Math.round(68 * redIntensity + 197 * greenIntensity)}, ${Math.round(68 * redIntensity + 94 * greenIntensity)})`
    } else {
      // Higher CTR is better (green), lower CTR is worse (red)
      // Assuming CTR range 0.8-4.0, normalize to 0-1 where 0 is worst (red) and 1 is best (green)
      normalizedValue = Math.min(Math.max((value - 0.8) / 3.2, 0), 1)
      const redIntensity = 1 - normalizedValue
      const greenIntensity = normalizedValue
      return `rgb(${Math.round(255 * redIntensity + 34 * greenIntensity)}, ${Math.round(68 * redIntensity + 197 * greenIntensity)}, ${Math.round(68 * redIntensity + 94 * greenIntensity)})`
    }
  }

  const getValue = (hour: number, day: string) => {
    const point = data.find((d) => d.hour === hour && d.dayOfWeek === day)
    return point ? point[metric] : 0
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">Performance Heatmap</CardTitle>
            <div className="relative group sm:hidden">
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
              <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
                Reveals the best (and worst) times to run ads, so you can schedule budgets when they'll be most
                efficient.
                <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-50 border-l border-t border-gray-200 rotate-45"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Button
                variant={metric === "cpa" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("cpa")}
                className="text-xs px-2 py-1"
              >
                CPA
              </Button>
              <Button
                variant={metric === "ctr" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("ctr")}
                className="text-xs px-2 py-1"
              >
                CTR
              </Button>
            </div>
            <div className="relative group hidden sm:block">
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help ml-2" />
              <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
                Reveals the best (and worst) times to run ads, so you can schedule budgets when they'll be most
                efficient.
                <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-50 border-l border-t border-gray-200 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full overflow-x-auto">
          <div
            className="grid gap-0.5 min-w-[600px] sm:min-w-[700px]"
            style={{ gridTemplateColumns: `auto repeat(24, minmax(20px, 1fr))` }}
          >
            {/* Header row */}
            <div className="text-xs font-medium p-1"></div>
            {HOURS.map((hour) => (
              <div key={hour} className="text-xs font-medium text-center p-1 min-w-[20px]">
                {hour}
              </div>
            ))}

            {/* Data rows */}
            {DAYS.map((day) => (
              <>
                <div key={`${day}-label`} className="text-xs font-medium p-1 truncate min-w-[60px]">
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.slice(0, 3)}</span>
                </div>
                {HOURS.map((hour) => {
                  const value = getValue(hour, day)
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="aspect-square rounded border border-gray-200 flex items-center justify-center text-xs cursor-pointer hover:border-gray-400 transition-colors min-w-[20px] min-h-[20px]"
                      style={{ backgroundColor: getColorIntensity(value, metric) }}
                      title={`${day} ${hour}:00 - ${metric.toUpperCase()}: ${value.toFixed(2)}`}
                    >
                      <span className="hidden sm:inline text-[10px]">{value > 0 ? value.toFixed(1) : ""}</span>
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
