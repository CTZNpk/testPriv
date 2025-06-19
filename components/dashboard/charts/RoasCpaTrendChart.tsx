"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RoasCpaData } from "@/types/dashboard"
import { Info } from "lucide-react"

interface RoasCpaTrendChartProps {
  data: RoasCpaData[]
}

export function RoasCpaTrendChart({ data }: RoasCpaTrendChartProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">ROAS & CPA Trend</CardTitle>
          <div className="relative group">
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
            <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
              Quickly see if you're getting more bang for your buck over time, and spot rising acquisition costs early.
              <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-50 border-l border-t border-gray-200 rotate-45"></div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full h-[250px] sm:h-[300px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 15, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} interval="preserveStartEnd" minTickGap={20} />
              <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 10 }} width={40} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} width={40} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="roas"
                stroke="#517dab" // Use the new medium blue
                strokeWidth={2}
                dot={{ r: 3 }}
                name="ROAS"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cpa"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="CPA ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
