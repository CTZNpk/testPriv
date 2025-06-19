"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SelectionData, AnalysisResult } from "@/types/ads"

interface VisualizationsTabProps {
  selectionData: SelectionData
  analysisData: AnalysisResult | null
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

// Mock data for different visualization types
const mockRowsData = [
  {
    name: "Summer Collection Video",
    spend: 2450,
    appInstalls: 125,
    purchases: 45,
    ctr: 2.6,
    cpm: 19.6,
    impressions: 125000,
    clicks: 3250,
  },
  {
    name: "Brand Awareness Video",
    spend: 1890,
    appInstalls: 89,
    purchases: 32,
    ctr: 2.5,
    cpm: 19.89,
    impressions: 95000,
    clicks: 2380,
  },
  {
    name: "Product Demo Video",
    spend: 3200,
    appInstalls: 180,
    purchases: 68,
    ctr: 3.0,
    cpm: 20.0,
    impressions: 160000,
    clicks: 4800,
  },
  {
    name: "Holiday Special Video",
    spend: 5600,
    appInstalls: 320,
    purchases: 145,
    ctr: 3.0,
    cpm: 20.0,
    impressions: 280000,
    clicks: 8400,
  },
]

const mockTimeSeriesData = [
  { date: "2024-01-01", spend: 1200, appInstalls: 45, ctr: 2.1, purchases: 18, cpm: 19.5, impressions: 61500 },
  { date: "2024-01-02", spend: 1350, appInstalls: 52, ctr: 2.3, purchases: 22, cpm: 18.8, impressions: 71800 },
  { date: "2024-01-03", spend: 1180, appInstalls: 41, ctr: 2.0, purchases: 16, cpm: 20.2, impressions: 58400 },
  { date: "2024-01-04", spend: 1420, appInstalls: 58, ctr: 2.4, purchases: 25, cpm: 19.1, impressions: 74300 },
  { date: "2024-01-05", spend: 1680, appInstalls: 67, ctr: 2.8, purchases: 31, cpm: 18.5, impressions: 90800 },
  { date: "2024-01-06", spend: 1520, appInstalls: 61, ctr: 2.6, purchases: 28, cpm: 19.3, impressions: 78700 },
  { date: "2024-01-07", spend: 1750, appInstalls: 72, ctr: 2.9, purchases: 34, cpm: 18.2, impressions: 96200 },
]

const mockScatterData = [
  { adName: "Summer Collection", metricName: "CTR", value: 2.6, x: 1, y: 2.6 },
  { adName: "Brand Awareness", metricName: "CTR", value: 2.5, x: 2, y: 2.5 },
  { adName: "Product Demo", metricName: "CPM", value: 20.0, x: 3, y: 20.0 },
  { adName: "Holiday Special", metricName: "Spend", value: 5600, x: 4, y: 5600 },
  { adName: "Summer Collection", metricName: "App Installs", value: 125, x: 1, y: 125 },
  { adName: "Brand Awareness", metricName: "Purchases", value: 32, x: 2, y: 32 },
]

const mockPieData = [
  { name: "Active", value: 3, fill: "#10b981" },
  { name: "Paused", value: 1, fill: "#f59e0b" },
  { name: "Completed", value: 1, fill: "#6b7280" },
]

const mockColumnDistribution = [
  { metric: "CTR", low: 1.8, avg: 2.6, high: 3.4 },
  { metric: "CPM", low: 15.2, avg: 19.1, high: 23.8 },
  { metric: "CPA", low: 12.5, avg: 18.7, high: 25.3 },
  { metric: "ROAS", low: 2.1, avg: 3.8, high: 5.9 },
]

const mockCellAnomalies = [
  { cell: "Summer-CTR", value: 4.2, expected: 2.6, anomaly: "High", severity: 85 },
  { cell: "Brand-CPM", value: 12.1, expected: 19.1, anomaly: "Low", severity: 72 },
  { cell: "Demo-Spend", value: 8900, expected: 3200, anomaly: "High", severity: 95 },
  { cell: "Holiday-CPA", value: 8.5, expected: 18.7, anomaly: "Low", severity: 68 },
]

function VisualizationsTab({ selectionData, analysisData }: VisualizationsTabProps) {
  const [mode, setMode] = useState<"rows" | "columns" | "cell">("rows")

  return (
    <div className="space-y-6">
      {/* Mode Selection Dropdown */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Analysis Mode:</span>
        <Select value={mode} onValueChange={(value: "rows" | "columns" | "cell") => setMode(value)}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rows">Rows</SelectItem>
            <SelectItem value="columns">Columns</SelectItem>
            <SelectItem value="cell">Cell</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rows Mode - Campaign Performance Comparison */}
      {mode === "rows" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Row Spend Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockRowsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Spend"]} />
                    <Bar dataKey="spend" fill="#3b82f6" name="Spend ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Row Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockPieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {mockPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Row Performance Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={mockRowsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ctr" name="CTR" unit="%" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="cpm" name="CPM" unit="$" tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Rows" data={mockRowsData} fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">App Installs by Row</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={mockRowsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="appInstalls" fill="#10b981" name="App Installs" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Purchases by Row</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={mockRowsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="purchases" fill="#f59e0b" name="Purchases" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Columns Mode - Metric Analysis */}
      {mode === "columns" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Column Metrics Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockTimeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="spend"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Spend ($)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="appInstalls"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="App Installs"
                  />
                  <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#f59e0b" strokeWidth={3} name="CTR (%)" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="purchases"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Purchases"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Column Distribution Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockColumnDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="low" fill="#ef4444" name="Low" />
                    <Bar dataKey="avg" fill="#f59e0b" name="Average" />
                    <Bar dataKey="high" fill="#10b981" name="High" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Column Correlation Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={mockTimeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ctr" name="CTR" unit="%" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="spend" name="Spend" unit="$" tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="CTR vs Spend" data={mockTimeSeriesData} fill="#8b5cf6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Column Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={mockTimeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cpm" stroke="#3b82f6" strokeWidth={2} name="CPM" />
                  <Line type="monotone" dataKey="impressions" stroke="#10b981" strokeWidth={2} name="Impressions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Cell Mode - Individual Cell Analysis */}
      {mode === "cell" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cell Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockCellAnomalies}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cell" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Actual Value" />
                  <Bar dataKey="expected" fill="#10b981" name="Expected Value" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cell Severity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "High Severity", value: 2, fill: "#ef4444" },
                        { name: "Medium Severity", value: 1, fill: "#f59e0b" },
                        { name: "Low Severity", value: 1, fill: "#10b981" },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {[
                        { name: "High Severity", value: 2, fill: "#ef4444" },
                        { name: "Medium Severity", value: 1, fill: "#f59e0b" },
                        { name: "Low Severity", value: 1, fill: "#10b981" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cell Performance Scatter</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={mockCellAnomalies}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="value" name="Actual" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="expected" name="Expected" tick={{ fontSize: 12 }} />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-semibold">{data.cell}</p>
                              <p className="text-sm">Actual: {data.value}</p>
                              <p className="text-sm">Expected: {data.expected}</p>
                              <p className="text-sm">Severity: {data.severity}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter name="Cell Analysis" data={mockCellAnomalies} fill="#8b5cf6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cell Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockCellAnomalies.map((cell, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="font-semibold text-sm text-gray-900">{cell.cell}</div>
                    <div className="text-xs text-gray-500 mb-2">{cell.anomaly} Anomaly</div>
                    <div className="text-lg font-bold text-blue-600">{cell.value.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Expected: {cell.expected.toLocaleString()}</div>
                    <div
                      className={`text-sm font-medium mt-1 ${
                        cell.severity > 80 ? "text-red-600" : cell.severity > 60 ? "text-yellow-600" : "text-green-600"
                      }`}
                    >
                      Severity: {cell.severity}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

export default VisualizationsTab
