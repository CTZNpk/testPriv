export interface AdData {
  id: string
  name: string
  status: "active" | "paused" | "completed"
  spend: number
  appInstalls?: number
  costPerAppInstall?: number
  purchases?: number
  costPerPurchase?: number
  impressions?: number
  clicks?: number
  ctr?: number
  cpm?: number
  reach?: number
  frequency?: number
  videoViews?: number
  videoViewRate?: number
  // New fields for Ad Info Modal
  videoUrl?: string
  script?: string
  callToAction?: string
  engagementTime?: number
  likes?: number
  comments?: number
  shares?: number
  watchTime?: number
  completionRate?: number
}

export interface AvailableMetric {
  id: string
  label: string
  format: "currency" | "number" | "percentage"
}

export interface SelectionData {
  type: "rows" | "cells"
  selectedAds?: AdData[]
  selectedCells?: {
    adId: string
    metricId: string
    value: number
  }[]
}

export type SelectionMode = 'row' | 'column' | 'cell';

export interface TableSelection {
  mode: SelectionMode;
  rows: string[];
  columns: string[];
  cell: { row: string; col: string } | null;
}
