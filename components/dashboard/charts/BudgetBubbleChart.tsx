"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BudgetBubbleData } from "@/types/dashboard"
import { Info } from "lucide-react"

interface BudgetBubbleChartProps {
  data: BudgetBubbleData[]
}

export function BudgetBubbleChart({ data }: BudgetBubbleChartProps) {
  const maxBudget = Math.max(...data.map((d) => d.budget))

  const transformedData = data.map((item) => ({
    ...item,
    size: (item.budget / maxBudget) * 800 + 100, // Scale bubble size for mobile
  }))

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">Budget vs Performance</CardTitle>
          <div className="relative group">
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
            <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
              Easily spot campaigns that are large but underperforming (big bubble low on ROAS) or small but high ROI.
              <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-50 border-l border-t border-gray-200 rotate-45"></div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full h-[250px] sm:h-[300px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 15, left: 10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                type="number"
                dataKey="roas"
                name="ROAS"
                tick={{ fontSize: 10 }}
                label={{ value: "ROAS", position: "insideBottom", offset: -10, style: { fontSize: "10px" } }}
              />
              <YAxis
                type="number"
                dataKey="cpa"
                name="CPA"
                unit="$"
                tick={{ fontSize: 10 }}
                width={40}
                label={{ value: "CPA ($)", angle: -90, position: "insideLeft", style: { fontSize: "10px" } }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [
                  typeof value === "number" ? value.toFixed(2) : value,
                  name === "roas" ? "ROAS" : name === "cpa" ? "CPA ($)" : name,
                ]}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0] && payload[0].payload) {
                    return `${payload[0].payload.campaignName} - Budget: $${payload[0].payload.budget.toLocaleString()}`
                  }
                  return ""
                }}
              />
              <Scatter name="Campaigns" data={transformedData} fill="#517dab" fillOpacity={0.6}>
                {transformedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.roas > 3 ? "#10b981" : entry.roas > 2 ? "#bcdded" : "#ef4444"}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
