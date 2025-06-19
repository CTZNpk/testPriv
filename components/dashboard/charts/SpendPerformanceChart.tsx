"use client"

import { useState } from "react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SpendPerformanceData } from "@/types/dashboard"

interface SpendPerformanceChartProps {
  data: SpendPerformanceData[]
}

export function SpendPerformanceChart({ data }: SpendPerformanceChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<"purchases" | "appInstalls" | "revenue">("revenue")

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case "purchases":
        return "Purchases"
      case "appInstalls":
        return "App Installs"
      case "revenue":
        return "Revenue ($)"
      default:
        return "Revenue ($)"
    }
  }

  const getMetricColor = () => {
    switch (selectedMetric) {
      case "purchases":
        return "#10b981"
      case "appInstalls":
        return "#517dab" // Use the new medium blue
      case "revenue":
        return "#517dab" // Use the new medium blue
      default:
        return "#517dab"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Spend vs Performance</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={selectedMetric === "revenue" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric("revenue")}
            >
              Revenue
            </Button>
            <Button
              variant={selectedMetric === "purchases" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric("purchases")}
            >
              Purchases
            </Button>
            <Button
              variant={selectedMetric === "appInstalls" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric("appInstalls")}
            >
              App Installs
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="spend" fill="#ef4444" name="Ad Spend ($)" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={selectedMetric}
              stroke={getMetricColor()}
              strokeWidth={3}
              dot={{ r: 4 }}
              name={getMetricLabel()}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
