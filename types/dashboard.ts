export interface SpendPerformanceData {
  date: string
  spend: number
  purchases: number
  appInstalls: number
  revenue: number
}

export interface RoasCpaData {
  date: string
  roas: number
  cpa: number
}

export interface ConversionFunnelData {
  stage: string
  count: number
  percentage: number
}

export interface PlacementData {
  placement: string
  spend: number
  conversions: number
  percentage: number
}

export interface DemographicsData {
  ageGroup: string
  maleCpa: number
  femaleCpa: number
  maleRoas: number
  femaleRoas: number
}

export interface CtrCpmData {
  campaignId: string
  campaignName: string
  cpm: number
  ctr: number
  spend: number
  impressions: number
}

export interface HeatmapData {
  hour: number
  dayOfWeek: string
  cpa: number
  ctr: number
  value: number
}

export interface BudgetBubbleData {
  campaignId: string
  campaignName: string
  roas: number
  cpa: number
  budget: number
}
