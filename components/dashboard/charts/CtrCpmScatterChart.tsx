"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CtrCpmData } from "@/types/dashboard"
import { Info } from "lucide-react"

interface CtrCpmScatterChartProps {
  data: CtrCpmData[]
}

export function CtrCpmScatterChart({ data }: CtrCpmScatterChartProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">CTR vs CPM Analysis</CardTitle>
          <div className="relative group">
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
            <div className="absolute right-0 top-6 w-64 p-4 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 backdrop-blur-sm">
              Quickly identify outliers—campaigns that have low cost but high engagement, or expensive but low CTR.
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
                dataKey="cpm"
                name="CPM"
                unit="$"
                tick={{ fontSize: 10 }}
                label={{ value: "CPM ($)", position: "insideBottom", offset: -10, style: { fontSize: "10px" } }}
              />
              <YAxis
                type="number"
                dataKey="ctr"
                name="CTR"
                unit="%"
                tick={{ fontSize: 10 }}
                width={40}
                label={{ value: "CTR (%)", angle: -90, position: "insideLeft", style: { fontSize: "10px" } }}
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
                  name === "ctr" ? "CTR (%)" : name === "cpm" ? "CPM ($)" : name,
                ]}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0] && payload[0].payload) {
                    return `Campaign: ${payload[0].payload.campaignName}`
                  }
                  return ""
                }}
              />
              <Scatter name="Campaigns" data={data} fill="#517dab" fillOpacity={0.7} stroke="#bcdded" strokeWidth={1} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
