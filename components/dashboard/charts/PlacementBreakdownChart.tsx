"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PlacementData } from "@/types/dashboard"
import { Info } from "lucide-react"

interface PlacementBreakdownChartProps {
  data: PlacementData[]
}

const COLORS = ["#517dab", "#bcdded", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export function PlacementBreakdownChart({ data }: PlacementBreakdownChartProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">Placement Breakdown</CardTitle>
          <div className="relative group">
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
            <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
              Reveals which placements are driving the best efficiency and where budget might be re-allocated.
              <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-50 border-l border-t border-gray-200 rotate-45"></div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full h-[250px] sm:h-[300px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius="60%"
                fill="#8884d8"
                dataKey="spend"
                label={({ placement, percentage }) =>
                  window.innerWidth > 640 ? `${placement} (${percentage}%)` : `${percentage}%`
                }
                labelStyle={{ fontSize: "10px" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [
                  typeof value === "number" ? `$${value.toLocaleString()}` : value,
                  name === "spend" ? "Spend" : name,
                ]}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
