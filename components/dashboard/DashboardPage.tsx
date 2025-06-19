"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { SummaryCards } from "./SummaryCards"
import { RoasCpaTrendChart } from "./charts/RoasCpaTrendChart"
import { ConversionFunnelChart } from "./charts/ConversionFunnelChart"
import { PlacementBreakdownChart } from "./charts/PlacementBreakdownChart"
import { DemographicsChart } from "./charts/DemographicsChart"
import { CtrCpmScatterChart } from "./charts/CtrCpmScatterChart"
import { PerformanceHeatmap } from "./charts/PerformanceHeatmap"
import { BudgetBubbleChart } from "./charts/BudgetBubbleChart"
import {
  performanceData,
  roasCpaData,
  conversionFunnelData,
  placementData,
  demographicsData,
  ctrCpmData,
  heatmapData,
  budgetBubbleData,
} from "@/data/mockData"

export function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("revenue")
  const [performanceTimeRange, setPerformanceTimeRange] = useState("1w")
  const [chartKey, setChartKey] = useState(0)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [dateRange, setDateRange] = useState("1w")

  useEffect(() => {
    setMounted(true)

    // Force chart re-render on window resize
    const handleResize = () => {
      setChartKey((prev) => prev + 1)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const mainContent = document.querySelector("[data-main-content]")
    if (mainContent) {
      if (sidebarVisible) {
        mainContent.style.marginLeft = "272px"
      } else {
        mainContent.style.marginLeft = "0"
      }
    }
  }, [sidebarVisible])

  if (!mounted) {
    return null
  }

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "revenue":
        return "Revenue"
      case "appInstalls":
        return "App Installs"
      case "purchases":
        return "Purchases"
      default:
        return "Revenue"
    }
  }

  return (
    <div className="flex flex-col h-full" data-main-content>
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex-shrink-0">
        <div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Here's an overview of your Facebook Ads performance.
              </p>
            </div>
            <div className="flex items-center">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">1 day</SelectItem>
                  <SelectItem value="1w">1 week</SelectItem>
                  <SelectItem value="1m">1 month</SelectItem>
                  <SelectItem value="3m">3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Summary Cards */}
          <SummaryCards />

          {/* Performance Overview Chart */}
          <div className="mb-6 sm:mb-8">
            <Card className="border-gray-100 shadow-sm overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Performance Overview</h3>
                  <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-500">
                    <span>Spend vs</span>
                    <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                      <SelectTrigger className="w-auto h-6 text-xs sm:text-sm border-gray-200 bg-transparent border-0 p-0 font-medium text-gray-900 hover:bg-gray-50 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="appInstalls">App Installs</SelectItem>
                        <SelectItem value="purchases">Purchases</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>over</span>
                    <Select value={performanceTimeRange} onValueChange={setPerformanceTimeRange}>
                      <SelectTrigger className="w-auto h-6 text-xs sm:text-sm border-gray-200 bg-transparent border-0 p-0 font-medium text-gray-900 hover:bg-gray-50 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1d">1 day</SelectItem>
                        <SelectItem value="1w">1 week</SelectItem>
                        <SelectItem value="1m">1 month</SelectItem>
                        <SelectItem value="6m">6 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full h-[250px] sm:h-[300px] overflow-hidden">
                  <ResponsiveContainer key={`performance-${chartKey}`} width="100%" height="100%">
                    <AreaChart
                      data={performanceData[performanceTimeRange as keyof typeof performanceData]}
                      margin={{ top: 10, right: 15, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        tickFormatter={(value) => `$${value > 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
                        width={40}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          fontSize: "12px",
                        }}
                        formatter={(value, name) => [`$${value}`, name]}
                      />
                      <Area
                        type="monotone"
                        dataKey="spend"
                        stroke="#ef4444"
                        fill="#ef444466"
                        strokeWidth={2}
                        name="Ad Spend"
                      />
                      <Area
                        type="monotone"
                        dataKey={selectedMetric}
                        stroke="#517dab" // Use the new medium blue
                        fill="#517dab66"
                        strokeWidth={2}
                        name={getMetricLabel(selectedMetric)}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-4 gap-4 sm:gap-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-xs sm:text-sm text-gray-600">Ad Spend</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#517dab" }}></div>
                    <span className="text-xs sm:text-sm text-gray-600">{getMetricLabel(selectedMetric)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-full">
            <div className="overflow-hidden">
              <RoasCpaTrendChart key={`roas-${chartKey}`} data={roasCpaData} />
            </div>
            <div className="overflow-hidden">
              <ConversionFunnelChart key={`funnel-${chartKey}`} data={conversionFunnelData} />
            </div>
            <div className="overflow-hidden">
              <PlacementBreakdownChart key={`placement-${chartKey}`} data={placementData} />
            </div>
            <div className="overflow-hidden">
              <DemographicsChart key={`demographics-${chartKey}`} data={demographicsData} />
            </div>
            <div className="overflow-hidden">
              <CtrCpmScatterChart key={`scatter-${chartKey}`} data={ctrCpmData} />
            </div>
            <div className="overflow-hidden">
              <BudgetBubbleChart key={`bubble-${chartKey}`} data={budgetBubbleData} />
            </div>
            <div className="lg:col-span-2 overflow-hidden">
              <PerformanceHeatmap key={`heatmap-${chartKey}`} data={heatmapData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
