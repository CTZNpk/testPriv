"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { DemographicsData } from "@/types/dashboard"
import { Info } from "lucide-react"

interface DemographicsChartProps {
  data: DemographicsData[]
}

export function DemographicsChart({ data }: DemographicsChartProps) {
  const [metric, setMetric] = useState<"cpa" | "roas">("cpa")

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">Demographics Performance</CardTitle>
            <div className="relative group sm:hidden">
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
              <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
                Shows which demos are cheapest or most profitable, guiding audience segmentation and lookalike modeling.
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
                variant={metric === "roas" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("roas")}
                className="text-xs px-2 py-1"
              >
                ROAS
              </Button>
            </div>
            <div className="relative group hidden sm:block">
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help ml-2" />
              <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
                Shows which demos are cheapest or most profitable, guiding audience segmentation and lookalike modeling.
                <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-50 border-l border-t border-gray-200 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full h-[250px] sm:h-[300px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 15, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="ageGroup" tick={{ fontSize: 10 }} interval={0} />
              <YAxis tick={{ fontSize: 10 }} width={40} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar
                dataKey={metric === "cpa" ? "maleCpa" : "maleRoas"}
                fill="#517dab" // Use the new medium blue
                name={`Male ${metric.toUpperCase()}`}
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey={metric === "cpa" ? "femaleCpa" : "femaleRoas"}
                fill="#bcdded" // Use the new light blue
                name={`Female ${metric.toUpperCase()}`}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
