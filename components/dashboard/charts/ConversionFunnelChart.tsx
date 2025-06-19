"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ConversionFunnelData } from "@/types/dashboard"
import { Info } from "lucide-react"

interface ConversionFunnelChartProps {
  data: ConversionFunnelData[]
}

const COLORS = ["#517dab", "#bcdded", "#6366f1", "#8b5cf6", "#a855f7"]

export function ConversionFunnelChart({ data }: ConversionFunnelChartProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">Conversion Funnel</CardTitle>
          <div className="relative group">
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
            <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
              Highlights drop-off at each step of the user journey so you can pinpoint where to optimize your creative
              or targeting.
              <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-50 border-l border-t border-gray-200 rotate-45"></div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full h-[250px] sm:h-[300px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 15, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="stage" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis
                tick={{ fontSize: 10 }}
                width={50}
                tickFormatter={(value) => (value > 1000 ? `${(value / 1000).toFixed(0)}k` : value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [
                  typeof value === "number" ? value.toLocaleString() : value,
                  name === "count" ? "Count" : name,
                ]}
              />
              <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
