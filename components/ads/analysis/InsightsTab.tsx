"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, BarChart3, Target, Users, DollarSign, Eye, MousePointer, ShoppingCart } from "lucide-react"
import type { SelectionData, AnalysisResult } from "@/types/ads"

interface InsightsTabProps {
  selectionData: SelectionData
  analysisData: AnalysisResult | null
}

type InsightMode = "rows" | "columns" | "cell"

function InsightsTab({ selectionData, analysisData }: InsightsTabProps) {
  const [insightMode, setInsightMode] = useState<InsightMode>("rows")

  const renderRowsInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performing Ad</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Campaign Alpha</div>
            <p className="text-xs text-muted-foreground">4.8% CTR, $2.50 CPA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Efficiency</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Budget utilization rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Leader</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Campaign Beta</div>
            <p className="text-xs text-muted-foreground">156 conversions this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-semibold">Campaign Alpha</div>
                <div className="text-sm text-gray-500">Mobile App Install</div>
              </div>
              <div className="text-right">
                <Badge variant="default">Active</Badge>
                <div className="text-sm mt-1">$3,200 spent</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-semibold">Campaign Beta</div>
                <div className="text-sm text-gray-500">Purchase Conversion</div>
              </div>
              <div className="text-right">
                <Badge variant="default">Active</Badge>
                <div className="text-sm mt-1">$2,890 spent</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-semibold">Campaign Gamma</div>
                <div className="text-sm text-gray-500">Brand Awareness</div>
              </div>
              <div className="text-right">
                <Badge variant="secondary">Paused</Badge>
                <div className="text-sm mt-1">$1,450 spent</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-900 mb-2">🏆 Best Performer</div>
              <div className="text-green-700 text-sm">
                Campaign Alpha shows 40% higher CTR than average. Consider scaling budget.
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="font-semibold text-yellow-900 mb-2">⚠️ Needs Attention</div>
              <div className="text-yellow-700 text-sm">
                Campaign Gamma has been paused for 3 days. Review and optimize targeting.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderColumnsInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR Distribution</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1% - 4.8%</div>
            <p className="text-xs text-muted-foreground">Range across campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPA Variance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.80 - $5.20</div>
            <p className="text-xs text-muted-foreground">Cost per acquisition spread</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impression Volume</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">Total impressions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audience Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8M</div>
            <p className="text-xs text-muted-foreground">Unique users reached</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Metric Correlations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-semibold">CTR vs CPA</div>
                <div className="text-sm text-gray-500">Click-through rate correlation with cost per acquisition</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">-0.73</div>
                <div className="text-sm text-gray-500">Strong negative correlation</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-semibold">Spend vs Conversions</div>
                <div className="text-sm text-gray-500">Budget allocation impact on conversion volume</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">+0.89</div>
                <div className="text-sm text-gray-500">Strong positive correlation</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-semibold">Frequency vs CTR</div>
                <div className="text-sm text-gray-500">Ad frequency impact on click-through rates</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-yellow-600">-0.45</div>
                <div className="text-sm text-gray-500">Moderate negative correlation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metric Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-900 mb-2">📊 CTR Analysis</div>
              <div className="text-blue-700 text-sm">
                Average CTR of 3.2% is 15% above industry benchmark. Mobile placements performing best.
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="font-semibold text-purple-900 mb-2">💰 CPA Optimization</div>
              <div className="text-purple-700 text-sm">
                CPA variance suggests targeting refinement opportunities. Focus on high-performing demographics.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCellInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected Cell</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Campaign Alpha</div>
            <p className="text-xs text-muted-foreground">CTR: 4.8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomaly Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.23</div>
            <p className="text-xs text-muted-foreground">Low anomaly detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Percentile Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87th</div>
            <p className="text-xs text-muted-foreground">Above average performance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cell-Level Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">Campaign Alpha - CTR</div>
                  <div className="text-sm text-gray-500">Mobile App Install Campaign</div>
                </div>
                <Badge variant="default">Normal</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Current Value</div>
                  <div className="font-semibold">4.8%</div>
                </div>
                <div>
                  <div className="text-gray-500">Expected Range</div>
                  <div className="font-semibold">3.2% - 5.1%</div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">Historical Comparison</div>
                  <div className="text-sm text-gray-500">Last 30 days vs current period</div>
                </div>
                <Badge variant="default">Stable</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Previous</div>
                  <div className="font-semibold">4.6%</div>
                </div>
                <div>
                  <div className="text-gray-500">Current</div>
                  <div className="font-semibold">4.8%</div>
                </div>
                <div>
                  <div className="text-gray-500">Change</div>
                  <div className="font-semibold text-green-600">+4.3%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cell Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-900 mb-2">✅ Performance Status</div>
              <div className="text-green-700 text-sm">
                This cell value is performing within expected parameters and shows positive trend.
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-900 mb-2">🔍 Detailed Analysis</div>
              <div className="text-blue-700 text-sm">
                CTR improvement of 4.3% indicates successful creative optimization or audience refinement.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Mode Selection Dropdown */}
      <div className="w-full">
        <Select value={insightMode} onValueChange={(value: InsightMode) => setInsightMode(value)}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select insight mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rows">Rows</SelectItem>
            <SelectItem value="columns">Columns</SelectItem>
            <SelectItem value="cell">Cell</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content based on selected mode */}
      {insightMode === "rows" && renderRowsInsights()}
      {insightMode === "columns" && renderColumnsInsights()}
      {insightMode === "cell" && renderCellInsights()}
    </div>
  )
}

export default InsightsTab
