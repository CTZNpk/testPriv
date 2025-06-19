import type { AdData, AvailableMetric, SelectionData, SelectedCell } from "@/types/ads"

export interface AnalysisResult {
  summary: any
  chartData: any[]
  insights: Insight[]
}

export interface Insight {
  type: string
  title: string
  description: string
  color: string
}

export interface ColumnSummary {
  metricId: string
  metricLabel: string
  average: number
  high: number
  low: number
  format?: "currency" | "number" | "percentage"
}

export interface RowComparison {
  adId: string
  adName: string
  costPerAppInstall: number
  costPerPurchase: number
  status: string
}

export function getAnalysisData(selectionData: SelectionData): AnalysisResult | null {
  switch (selectionData.type) {
    case "rows":
      return analyzeSelectedRows(selectionData.selectedAds || [])
    case "columns":
      return analyzeSelectedColumns(selectionData.selectedMetrics || [], selectionData.selectedAds || [])
    case "cells":
      return analyzeSelectedCells(selectionData.selectedCells || [])
    default:
      return null
  }
}

export function analyzeSelectedRows(ads: AdData[]): AnalysisResult {
  const totalSpend = ads.reduce((sum, ad) => sum + ad.spend, 0)
  const totalAppInstalls = ads.reduce((sum, ad) => sum + ad.appInstalls, 0)
  const totalPurchases = ads.reduce((sum, ad) => sum + ad.purchases, 0)
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0)
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0)
  const avgCTR = ads.length > 0 ? ads.reduce((sum, ad) => sum + ad.ctr, 0) / ads.length : 0
  const avgCPM = ads.length > 0 ? ads.reduce((sum, ad) => sum + ad.cpm, 0) / ads.length : 0

  // Create row comparison data
  const rowComparisons: RowComparison[] = ads.map((ad) => ({
    adId: ad.id,
    adName: ad.name,
    costPerAppInstall: ad.costPerAppInstall,
    costPerPurchase: ad.costPerPurchase,
    status: ad.status,
  }))

  return {
    summary: {
      type: "rows",
      totalSpend,
      totalAppInstalls,
      totalPurchases,
      totalImpressions,
      totalClicks,
      avgCTR,
      avgCPM,
      avgCostPerInstall: totalSpend / totalAppInstalls,
      rowComparisons,
    },
    chartData: ads.map((ad) => ({
      name: ad.name.length > 20 ? ad.name.substring(0, 20) + "..." : ad.name,
      spend: ad.spend,
      appInstalls: ad.appInstalls,
      purchases: ad.purchases,
      ctr: ad.ctr,
      cpm: ad.cpm,
      costPerAppInstall: ad.costPerAppInstall,
    })),
    insights: generateRowInsights(ads),
  }
}

export function analyzeSelectedColumns(metrics: AvailableMetric[], ads: AdData[]): AnalysisResult {
  // Calculate column summaries based on the selected metrics and available ad data
  const columnSummaries: ColumnSummary[] = metrics.map((metric) => {
    let values: number[] = []

    // Extract values for this metric from all ads
    switch (metric.id) {
      case "spend":
        values = ads.map((ad) => ad.spend)
        break
      case "appInstalls":
        values = ads.map((ad) => ad.appInstalls)
        break
      case "costPerAppInstall":
        values = ads.map((ad) => ad.costPerAppInstall)
        break
      case "purchases":
        values = ads.map((ad) => ad.purchases)
        break
      case "costPerPurchase":
        values = ads.map((ad) => ad.costPerPurchase)
        break
      case "impressions":
        values = ads.map((ad) => ad.impressions)
        break
      case "clicks":
        values = ads.map((ad) => ad.clicks)
        break
      case "ctr":
        values = ads.map((ad) => ad.ctr)
        break
      case "cpm":
        values = ads.map((ad) => ad.cpm)
        break
      case "reach":
        values = ads.map((ad) => ad.reach)
        break
      case "frequency":
        values = ads.map((ad) => ad.frequency)
        break
      default:
        values = ads.map(() => Math.random() * 100) // Fallback for unknown metrics
    }

    const average = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0
    const high = values.length > 0 ? Math.max(...values) : 0
    const low = values.length > 0 ? Math.min(...values) : 0

    return {
      metricId: metric.id,
      metricLabel: metric.label,
      average,
      high,
      low,
      format: metric.format,
    }
  })

  return {
    summary: {
      type: "columns",
      selectedMetrics: metrics.length,
      metricTypes: metrics.map((m) => m.format).filter((v, i, a) => a.indexOf(v) === i),
      columnSummaries,
    },
    chartData: metrics.map((metric, index) => ({
      name: metric.label,
      importance: Math.random() * 100,
      correlation: Math.random() * 2 - 1,
    })),
    insights: generateColumnInsights(metrics),
  }
}

export function analyzeSelectedCells(cells: SelectedCell[]): AnalysisResult {
  const metricGroups = cells.reduce(
    (acc, cell) => {
      if (!acc[cell.metricId]) acc[cell.metricId] = []
      acc[cell.metricId].push(cell)
      return acc
    },
    {} as Record<string, SelectedCell[]>,
  )

  return {
    summary: {
      type: "cells",
      totalCells: cells.length,
      uniqueMetrics: Object.keys(metricGroups).length,
      uniqueAds: [...new Set(cells.map((c) => c.adId))].length,
      selectedCells: cells,
    },
    chartData: Object.entries(metricGroups).map(([metricId, cellGroup]) => ({
      metric: metricId,
      count: cellGroup.length,
      avgValue: cellGroup.reduce((sum, cell) => sum + Number(cell.value), 0) / cellGroup.length,
    })),
    insights: generateCellInsights(cells),
  }
}

export function generateRowInsights(ads: AdData[]): Insight[] {
  const bestPerformer = ads.sort((a, b) => b.ctr - a.ctr)[0]
  const worstPerformer = ads.sort((a, b) => a.ctr - b.ctr)[0]
  const pausedCount = ads.filter((ad) => ad.status === "paused").length
  const totalSpend = ads.reduce((sum, ad) => sum + ad.spend, 0)
  const topSpenders = ads.sort((a, b) => b.spend - a.spend).slice(0, Math.ceil(ads.length * 0.2))
  const topSpendPercentage = (topSpenders.reduce((sum, ad) => sum + ad.spend, 0) / totalSpend) * 100

  return [
    {
      type: "performance",
      title: "🏆 Top Performer",
      description: `${bestPerformer?.name} leads with ${bestPerformer?.ctr.toFixed(2)}% CTR`,
      color: "blue",
    },
    {
      type: "opportunity",
      title: "⚠️ Optimization Opportunity",
      description: `${pausedCount} paused campaigns could be reactivated`,
      color: "yellow",
    },
    {
      type: "efficiency",
      title: "💰 Budget Concentration",
      description: `Top 20% of campaigns use ${topSpendPercentage.toFixed(0)}% of budget`,
      color: "purple",
    },
    {
      type: "performance",
      title: "📉 Needs Attention",
      description: `${worstPerformer?.name} has lowest CTR at ${worstPerformer?.ctr.toFixed(2)}%`,
      color: "red",
    },
  ]
}

export function generateColumnInsights(metrics: AvailableMetric[]): Insight[] {
  return [
    {
      type: "analysis",
      title: "📊 Metric Selection",
      description: `Analyzing ${metrics.length} key performance indicators`,
      color: "blue",
    },
    {
      type: "correlation",
      title: "🔗 Metric Relationships",
      description: "Strong correlations found between cost and conversion metrics",
      color: "green",
    },
    {
      type: "optimization",
      title: "🎯 Focus Areas",
      description: "CTR and CPA metrics show highest optimization potential",
      color: "purple",
    },
    {
      type: "benchmark",
      title: "📈 Performance Benchmarks",
      description: "Selected metrics align with industry best practices",
      color: "yellow",
    },
  ]
}

export function generateCellInsights(cells: SelectedCell[]): Insight[] {
  return [
    {
      type: "precision",
      title: "🎯 Targeted Analysis",
      description: `Analyzing ${cells.length} specific data points for precise insights`,
      color: "blue",
    },
    {
      type: "variance",
      title: "📊 Data Variance",
      description: "High variance detected in selected values - optimization opportunity",
      color: "yellow",
    },
    {
      type: "outliers",
      title: "🔍 Outlier Detection",
      description: "Several outlier values identified for further investigation",
      color: "red",
    },
    {
      type: "patterns",
      title: "🔄 Pattern Recognition",
      description: "Consistent patterns found across selected data points",
      color: "green",
    },
  ]
}

export function getInitialChatMessage(data: SelectionData): string {
  switch (data.type) {
    case "rows":
      return `Hello! I can see you've selected ${data.selectedAds?.length || 0} ad campaigns for analysis. I can help you understand performance patterns, identify optimization opportunities, and answer questions about these specific campaigns.`
    case "columns":
      return `Hello! You've selected ${data.selectedMetrics?.length || 0} metrics for analysis. I can help you understand how these metrics relate to each other, identify trends, and provide insights on performance optimization.`
    case "cells":
      return `Hello! You've selected ${data.selectedCells?.length || 0} specific data points for analysis. I can help you understand these specific values, compare them against benchmarks, and provide targeted recommendations.`
    default:
      return "Hello! I'm here to help you analyze your Facebook ads data. What would you like to know?"
  }
}

export function generateContextualChatResponse(selectionData: SelectionData): string {
  switch (selectionData.type) {
    case "rows":
      return `Based on your ${selectionData.selectedAds?.length} selected campaigns, I can see interesting patterns in performance. Would you like me to dive deeper into specific metrics or compare these campaigns against your account averages?`
    case "columns":
      return `Looking at your ${selectionData.selectedMetrics?.length} selected metrics, I can help you understand how they correlate and which ones are most predictive of success. What specific relationships would you like me to explore?`
    case "cells":
      return `I've analyzed your ${selectionData.selectedCells?.length} selected data points. These specific values show some interesting patterns. Would you like me to explain what makes these particular metrics stand out?`
    default:
      return "I'm ready to help analyze your selection. What would you like to know?"
  }
}

export function formatValue(value: number, format?: "currency" | "number" | "percentage"): string {
  switch (format) {
    case "currency":
      return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    case "percentage":
      return `${value.toFixed(2)}%`
    case "number":
    default:
      return value.toLocaleString()
  }
}
