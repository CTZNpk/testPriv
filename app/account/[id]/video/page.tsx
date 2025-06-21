"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { SearchAndFilter } from "@/components/ads/SearchAndFilter";
import { MetricsBar } from "@/components/ads/MetricsBar";
import { AdsTable } from "@/components/ads/AdsTable";
import { AnalysisPanel } from "@/components/ads/AnalysisPanel";
import { AdInfoModal } from "@/components/ads/AdInfoModal";
import { DateRangePicker } from "@/components/ui/date-picker";
import type {
  AdData,
  AvailableMetric,
  SelectionData,
  TableSelection,
} from "@/types/ads";

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

// Mock data for video ads
const mockVideoAds: AdData[] = [
  {
    id: "1",
    name: "Summer Collection Video Campaign",
    status: "active",
    spend: 2450,
    appInstalls: 125,
    costPerAppInstall: 19.6,
    purchases: 45,
    costPerPurchase: 54.44,
    impressions: 125000,
    clicks: 3250,
    ctr: 2.6,
    cpm: 19.6,
    reach: 98000,
    frequency: 1.28,
    videoViews: 85000,
    videoViewRate: 68.0,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "Break personal records and maximize your gains! Fitbod's innovative training algorithm will guide you through the right sets, reps, and weight to reach your fitness goals. Just open the app and start making progress!",
    callToAction: "Install mobile app",
    engagementTime: 15.2,
    likes: 1250,
    comments: 89,
    shares: 156,
    watchTime: 12.8,
    completionRate: 65.5,
  },
  {
    id: "2",
    name: "Brand Awareness Video",
    status: "active",
    spend: 1890,
    appInstalls: 89,
    costPerAppInstall: 21.24,
    purchases: 32,
    costPerPurchase: 59.06,
    impressions: 95000,
    clicks: 2380,
    ctr: 2.5,
    cpm: 19.89,
    reach: 76000,
    frequency: 1.25,
    videoViews: 62000,
    videoViewRate: 65.3,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "Discover the power of our innovative platform. Join thousands of users who have transformed their experience with our cutting-edge technology.",
    callToAction: "Learn More",
    engagementTime: 12.8,
    likes: 890,
    comments: 45,
    shares: 78,
    watchTime: 10.2,
    completionRate: 58.3,
  },
  {
    id: "3",
    name: "Product Demo Video",
    status: "paused",
    spend: 3200,
    appInstalls: 180,
    costPerAppInstall: 17.78,
    purchases: 68,
    costPerPurchase: 47.06,
    impressions: 160000,
    clicks: 4800,
    ctr: 3.0,
    cpm: 20.0,
    reach: 125000,
    frequency: 1.28,
    videoViews: 110000,
    videoViewRate: 68.8,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "See our product in action! This comprehensive demo shows you exactly how to get the most out of our features and achieve your goals faster.",
    callToAction: "Try For Free",
    engagementTime: 18.5,
    likes: 1680,
    comments: 124,
    shares: 245,
    watchTime: 16.2,
    completionRate: 72.1,
  },
  {
    id: "4",
    name: "Holiday Special Video",
    status: "completed",
    spend: 5600,
    appInstalls: 320,
    costPerAppInstall: 17.5,
    purchases: 145,
    costPerPurchase: 38.62,
    impressions: 280000,
    clicks: 8400,
    ctr: 3.0,
    cpm: 20.0,
    reach: 220000,
    frequency: 1.27,
    videoViews: 195000,
    videoViewRate: 69.6,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "Limited time holiday offer! Don't miss out on our biggest sale of the year. Get premium features at an unbeatable price.",
    callToAction: "Shop Now",
    engagementTime: 14.7,
    likes: 2340,
    comments: 189,
    shares: 312,
    watchTime: 13.9,
    completionRate: 68.2,
  },
];
for (let i = 5; i <= 54; i++) {
  const base = mockVideoAds[i % mockVideoAds.length];
  mockVideoAds.push({
    id: `video-${i}`,
    name: `${base.name} #${i}`,
    status: base.status,
    spend: Math.floor(Math.random() * 5000 + 1000),
    appInstalls: Math.floor(Math.random() * 300 + 50),
    costPerAppInstall: parseFloat((Math.random() * 10 + 10).toFixed(2)),
    purchases: Math.floor(Math.random() * 150 + 20),
    costPerPurchase: parseFloat((Math.random() * 30 + 25).toFixed(2)),
    impressions: Math.floor(Math.random() * 300000 + 50000),
    clicks: Math.floor(Math.random() * 9000 + 1000),
    ctr: parseFloat((Math.random() * 2 + 1.5).toFixed(2)),
    cpm: parseFloat((Math.random() * 10 + 15).toFixed(2)),
    reach: Math.floor(Math.random() * 200000 + 50000),
    frequency: parseFloat((Math.random() * 0.5 + 1).toFixed(2)),
    videoViews: Math.floor(Math.random() * 200000 + 20000),
    videoViewRate: parseFloat((Math.random() * 15 + 60).toFixed(2)),
    videoUrl: "/placeholder.svg?height=720&width=405",
    script: base.script,
    callToAction: base.callToAction,
    engagementTime: parseFloat((Math.random() * 10 + 10).toFixed(1)),
    likes: Math.floor(Math.random() * 2000),
    comments: Math.floor(Math.random() * 200),
    shares: Math.floor(Math.random() * 300),
    watchTime: parseFloat((Math.random() * 5 + 10).toFixed(1)),
    completionRate: parseFloat((Math.random() * 15 + 55).toFixed(1)),
  });
}

const defaultMetrics: AvailableMetric[] = [
  { id: "spend", label: "Amount Spent", format: "currency" },
  { id: "appInstalls", label: "App Installs", format: "number" },
  {
    id: "costPerAppInstall",
    label: "Cost per App Install",
    format: "currency",
  },
  { id: "purchases", label: "Purchases", format: "number" },
  { id: "costPerPurchase", label: "Cost per Purchase", format: "currency" },
];

const additionalMetrics: AvailableMetric[] = [
  { id: "impressions", label: "Impressions", format: "number" },
  { id: "clicks", label: "Clicks", format: "number" },
  { id: "ctr", label: "CTR", format: "percentage" },
  { id: "cpm", label: "CPM", format: "currency" },
  { id: "reach", label: "Reach", format: "number" },
  { id: "frequency", label: "Frequency", format: "number" },
  { id: "videoViews", label: "Video Views", format: "number" },
  { id: "videoViewRate", label: "Video View Rate", format: "percentage" },
];

export default function VideoAdsPage() {
  const params = useParams();
  const accountId = params.id as string;

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMetrics, setSelectedMetrics] =
    useState<AvailableMetric[]>(defaultMetrics);
  const [advancedFilters, setAdvancedFilters] = useState<FilterCondition[]>([]);
  const [spendRange, setSpendRange] = useState<[number, number]>([0, 10000]);
  const [isAnalysisPanelOpen, setIsAnalysisPanelOpen] = useState(false);
  const [isAdInfoModalOpen, setIsAdInfoModalOpen] = useState(false);
  const [selectionData, setSelectionData] = useState<SelectionData>({
    type: "rows",
  });
  const [tableSelection, setTableSelection] = useState<TableSelection | undefined>(
    undefined,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  const availableMetrics = useMemo(() => {
    return additionalMetrics.filter(
      (metric) =>
        !selectedMetrics.some((selected) => selected.id === metric.id),
    );
  }, [selectedMetrics]);

  const applyConditionFilter = (
    ad: AdData,
    condition: FilterCondition,
  ): boolean => {
    if (!condition.field || !condition.operator || !condition.value)
      return true;

    const fieldValue = ad[condition.field as keyof AdData];
    const filterValue = condition.value.toLowerCase();

    switch (condition.operator) {
      case "is":
        return String(fieldValue).toLowerCase() === filterValue;
      case "is_not":
        return String(fieldValue).toLowerCase() !== filterValue;
      case "contains":
        return String(fieldValue).toLowerCase().includes(filterValue);
      case "not_contains":
        return !String(fieldValue).toLowerCase().includes(filterValue);
      case "greater_than":
        return Number(fieldValue) > Number(condition.value);
      case "less_than":
        return Number(fieldValue) < Number(condition.value);
      default:
        return true;
    }
  };

  const filteredAds = useMemo(() => {
    return mockVideoAds.filter((ad) => {
      // Search term filter
      const matchesSearch = ad.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        selectedFilter === "all" || ad.status === selectedFilter;

      // Spend range filter
      const matchesSpendRange =
        ad.spend >= spendRange[0] && ad.spend <= spendRange[1];

      // Advanced condition filters
      const matchesConditions =
        advancedFilters.length === 0 ||
        advancedFilters.every((condition) =>
          applyConditionFilter(ad, condition),
        );

      return (
        matchesSearch && matchesStatus && matchesSpendRange && matchesConditions
      );
    });
  }, [searchTerm, selectedFilter, spendRange, advancedFilters]);

  const handleAdvancedFilter = (
    filters: FilterCondition[],
    newSpendRange: [number, number],
  ) => {
    setAdvancedFilters(filters.filter((f) => f.field && f.operator && f.value));
    setSpendRange(newSpendRange);
  };

  const handleAddMetric = (metric: AvailableMetric) => {
    setSelectedMetrics((prev) => [...prev, metric]);
  };

  const handleRemoveMetric = (metricId: string) => {
    setSelectedMetrics((prev) =>
      prev.filter((metric) => metric.id !== metricId),
    );
  };

  const handleAnalyzeSelected = () => {
    // For now, we'll simulate row selection (multiple campaigns)
    // In a real implementation, this would come from table selection state
    const mockSelectionData: SelectionData = {
      type: "rows",
      selectedAds: filteredAds, // All filtered ads as selected
    };

    setSelectionData(mockSelectionData);
    setIsAnalysisPanelOpen(true);
  };

  const handleAdInfo = () => {
    setIsAdInfoModalOpen(true);
  };

  // Define columns for passing to AnalysisPanel
  const allColumns = [
    { id: "rowNumber", label: "#" },
    { id: "thumbnail", label: "" },
    { id: "name", label: "Ad Name" },
    { id: "status", label: "Status" },
    { id: "spend", label: "Spend" },
    { id: "appInstalls", label: "App Installs" },
    { id: "costPerAppInstall", label: "Cost/Install" },
    { id: "purchases", label: "Purchases" },
    { id: "costPerPurchase", label: "Cost/Purchase" },
    { id: "impressions", label: "Impressions" },
    { id: "clicks", label: "Clicks" },
    { id: "ctr", label: "CTR" },
    { id: "cpm", label: "CPM" },
    { id: "reach", label: "Reach" },
    { id: "frequency", label: "Frequency" },
    { id: "videoViews", label: "Video Views" },
    { id: "videoViewRate", label: "View Rate" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-full max-w-full overflow-hidden">
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
        <div>
          <h1 className="text-lg font-semibold">Ad Account {accountId}</h1>
          <p className="text-sm text-muted-foreground">
            Account ID: act_43098234098
          </p>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-4 pt-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Video Ads
          </h2>
          <p className="text-sm text-gray-500">
            Manage and analyze your video advertising campaigns
          </p>
        </div>

        <div className="space-y-4">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            onAdvancedFilter={handleAdvancedFilter}
            onAnalyzeSelected={handleAnalyzeSelected}
            dateRangePicker={
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                startPlaceholder="Start date"
                endPlaceholder="End date"
              />
            }
          />
        </div>

        <MetricsBar
          selectedMetrics={selectedMetrics}
          availableMetrics={availableMetrics}
          onAddMetric={handleAddMetric}
          onRemoveMetric={handleRemoveMetric}
          onAdInfo={handleAdInfo}
        />

        <AdsTable
          ads={filteredAds}
          adType="video"
          selectedMetrics={selectedMetrics}
          onSelectionChange={setTableSelection}
        />

        {filteredAds.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No video ads found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>

      <AnalysisPanel
        isOpen={isAnalysisPanelOpen}
        onClose={() => setIsAnalysisPanelOpen(false)}
        selectionData={selectionData}
        selection={tableSelection}
        ads={filteredAds}
        columns={allColumns}
      />

      <AdInfoModal
        isOpen={isAdInfoModalOpen}
        onClose={() => setIsAdInfoModalOpen(false)}
        ad={filteredAds[0]} // Show first ad as example
      />
    </div>
  );
}
