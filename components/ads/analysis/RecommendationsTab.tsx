"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SelectionData } from "@/types/ads"

interface RecommendationsTabProps {
  selectionData: SelectionData
}

type RecommendationMode = "rows" | "columns" | "cell"

function RecommendationsTab({ selectionData }: RecommendationsTabProps) {
  const [recommendationMode, setRecommendationMode] = useState<RecommendationMode>("rows")

  const renderRowsRecommendations = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Row-Based Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-blue-900 mb-2">📊 Compare Performance Across Rows</div>
                  <div className="text-sm text-blue-700 mb-3">
                    Analyze performance differences between selected rows to identify patterns and optimization
                    opportunities
                  </div>
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Impact: High | Effort: Low</div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-green-900 mb-2">🎯 Standardize Top-Performing Strategies</div>
                  <div className="text-sm text-green-700 mb-3">
                    Apply successful tactics from high-performing rows to underperforming ones
                  </div>
                  <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    Impact: High | Effort: Medium
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-yellow-900 mb-2">📈 Implement Row-Level A/B Testing</div>
                  <div className="text-sm text-yellow-700 mb-3">
                    Test different approaches across similar rows to validate optimization strategies
                  </div>
                  <div className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    Impact: Medium | Effort: High
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-purple-900 mb-2">🔄 Optimize Resource Allocation</div>
                  <div className="text-sm text-purple-700 mb-3">
                    Redistribute budget and resources based on row performance analysis
                  </div>
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    Impact: High | Effort: Medium
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Row Analysis Action Plan</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                  1
                </div>
                <div>
                  <div className="font-medium text-gray-900">Immediate Actions (Next 24 hours)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Identify top 3 performing rows and document their characteristics
                    <br />• Flag bottom 3 performing rows for immediate review
                    <br />• Create comparison matrix of key metrics across selected rows
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                  2
                </div>
                <div>
                  <div className="font-medium text-gray-900">Short-term Optimizations (Next week)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Implement best practices from top-performing rows
                    <br />• Set up automated alerts for row performance changes
                    <br />• Create standardized optimization templates based on row analysis
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                  3
                </div>
                <div>
                  <div className="font-medium text-gray-900">Long-term Strategy (Next month)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Develop row-based performance benchmarks and KPIs
                    <br />• Implement systematic row comparison and optimization processes
                    <br />• Create predictive models based on row performance patterns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderColumnsRecommendations = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Column-Based Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-blue-900 mb-2">📊 Analyze Metric Correlations</div>
                  <div className="text-sm text-blue-700 mb-3">
                    Study relationships between selected columns to identify key performance drivers
                  </div>
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Impact: High | Effort: Low</div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-green-900 mb-2">🎯 Optimize Key Metrics</div>
                  <div className="text-sm text-green-700 mb-3">
                    Focus optimization efforts on columns that show highest impact on overall performance
                  </div>
                  <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    Impact: High | Effort: Medium
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-yellow-900 mb-2">📈 Set Column-Based Benchmarks</div>
                  <div className="text-sm text-yellow-700 mb-3">
                    Establish performance thresholds and targets for each selected metric column
                  </div>
                  <div className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    Impact: Medium | Effort: Low
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-purple-900 mb-2">🔄 Implement Metric-Based Rules</div>
                  <div className="text-sm text-purple-700 mb-3">
                    Create automated optimization rules based on column performance patterns
                  </div>
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    Impact: High | Effort: High
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Column Analysis Action Plan</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                  1
                </div>
                <div>
                  <div className="font-medium text-gray-900">Immediate Actions (Next 24 hours)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Calculate correlation coefficients between selected columns
                    <br />• Identify columns with highest variance and optimization potential
                    <br />• Set up tracking dashboards for key metric columns
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                  2
                </div>
                <div>
                  <div className="font-medium text-gray-900">Short-term Optimizations (Next week)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Implement bidding strategies focused on high-impact columns
                    <br />• Create custom reports for column performance monitoring
                    <br />• Set up alerts for significant column metric changes
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                  3
                </div>
                <div>
                  <div className="font-medium text-gray-900">Long-term Strategy (Next month)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Develop column-based performance models and forecasting
                    <br />• Implement advanced attribution analysis for key metrics
                    <br />• Create automated optimization workflows based on column insights
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCellRecommendations = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cell-Level Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-blue-900 mb-2">🎯 Investigate Cell Anomalies</div>
                  <div className="text-sm text-blue-700 mb-3">
                    Deep dive into specific cell values that deviate from expected patterns
                  </div>
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    Impact: High | Effort: Medium
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-green-900 mb-2">🔍 Replicate High-Performing Cells</div>
                  <div className="text-sm text-green-700 mb-3">
                    Analyze and replicate the conditions that led to exceptional cell performance
                  </div>
                  <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    Impact: High | Effort: High
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-yellow-900 mb-2">📊 Monitor Cell Trends</div>
                  <div className="text-sm text-yellow-700 mb-3">
                    Track selected cell values over time to identify emerging patterns and trends
                  </div>
                  <div className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    Impact: Medium | Effort: Low
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-purple-900 mb-2">⚡ Implement Cell-Based Alerts</div>
                  <div className="text-sm text-purple-700 mb-3">
                    Set up specific alerts for when cell values exceed or fall below critical thresholds
                  </div>
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    Impact: Medium | Effort: Low
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Cell Analysis Action Plan</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                  1
                </div>
                <div>
                  <div className="font-medium text-gray-900">Immediate Actions (Next 24 hours)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Document current cell values and their context
                    <br />• Identify cells that are statistical outliers
                    <br />• Create baseline measurements for selected cells
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                  2
                </div>
                <div>
                  <div className="font-medium text-gray-900">Short-term Optimizations (Next week)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Investigate root causes of anomalous cell values
                    <br />• Test hypotheses about high-performing cell conditions
                    <br />• Set up monitoring systems for critical cell metrics
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                  3
                </div>
                <div>
                  <div className="font-medium text-gray-900">Long-term Strategy (Next month)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    • Develop cell-level performance prediction models
                    <br />• Create automated optimization based on cell-level insights
                    <br />• Build comprehensive cell performance database for future analysis
                  </div>
                </div>
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
        <Select value={recommendationMode} onValueChange={(value: RecommendationMode) => setRecommendationMode(value)}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select recommendation mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rows">Rows</SelectItem>
            <SelectItem value="columns">Columns</SelectItem>
            <SelectItem value="cell">Cell</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content based on selected mode */}
      {recommendationMode === "rows" && renderRowsRecommendations()}
      {recommendationMode === "columns" && renderColumnsRecommendations()}
      {recommendationMode === "cell" && renderCellRecommendations()}
    </div>
  )
}

export default RecommendationsTab
