"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { SearchAndFilter } from "@/components/ads/SearchAndFilter";
import { MetricsBar } from "@/components/ads/MetricsBar";
import { AdsTable } from "@/components/ads/AdsTable";
import { AnalysisPanel } from "@/components/ads/AnalysisPanel";
import { AdInfoModal } from "@/components/ads/AdInfoModal";
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

// Mock data for static ads
const mockStaticAds: AdData[] = [
  {
    id: "1",
    name: "Summer Sale Static Banner",
    status: "active",
    spend: 1850,
    appInstalls: 95,
    costPerAppInstall: 19.47,
    purchases: 38,
    costPerPurchase: 48.68,
    impressions: 98000,
    clicks: 2450,
    ctr: 2.5,
    cpm: 18.88,
    reach: 78000,
    frequency: 1.26,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "Summer Sale! Get up to 50% off on all items. Limited time offer - shop now and save big on your favorite products.",
    callToAction: "Shop Now",
    engagementTime: 8.5,
    likes: 650,
    comments: 32,
    shares: 89,
  },
  {
    id: "2",
    name: "Product Showcase Image",
    status: "active",
    spend: 2200,
    appInstalls: 110,
    costPerAppInstall: 20.0,
    purchases: 42,
    costPerPurchase: 52.38,
    impressions: 115000,
    clicks: 2875,
    ctr: 2.5,
    cpm: 19.13,
    reach: 92000,
    frequency: 1.25,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "Discover our latest product lineup. Premium quality, innovative design, and unbeatable value.",
    callToAction: "Learn More",
    engagementTime: 6.2,
    likes: 890,
    comments: 45,
    shares: 67,
  },
  {
    id: "3",
    name: "Brand Logo Campaign",
    status: "paused",
    spend: 1650,
    appInstalls: 78,
    costPerAppInstall: 21.15,
    purchases: 28,
    costPerPurchase: 58.93,
    impressions: 85000,
    clicks: 2125,
    ctr: 2.5,
    cpm: 19.41,
    reach: 68000,
    frequency: 1.25,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "Building trust through quality. Our brand represents excellence and innovation in every product we create.",
    callToAction: "Discover More",
    engagementTime: 5.8,
    likes: 420,
    comments: 18,
    shares: 34,
  },
  {
    id: "4",
    name: "Holiday Promotion Static",
    status: "completed",
    spend: 4200,
    appInstalls: 240,
    costPerAppInstall: 17.5,
    purchases: 95,
    costPerPurchase: 44.21,
    impressions: 210000,
    clicks: 6300,
    ctr: 3.0,
    cpm: 20.0,
    reach: 168000,
    frequency: 1.25,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "Holiday Special! Celebrate the season with our exclusive holiday collection. Perfect gifts for everyone on your list.",
    callToAction: "Shop Holiday Collection",
    engagementTime: 9.3,
    likes: 1560,
    comments: 89,
    shares: 156,
  },

  {
    id: "5",
    name: "App Feature Highlight",
    status: "active",
    spend: 2950,
    appInstalls: 165,
    costPerAppInstall: 17.88,
    purchases: 72,
    costPerPurchase: 40.97,
    impressions: 148000,
    clicks: 4440,
    ctr: 3.0,
    cpm: 19.93,
    reach: 118000,
    frequency: 1.25,
    videoUrl: "/placeholder.svg?height=720&width=405",
    script:
      "Experience the power of our new features. Streamlined interface, enhanced functionality, and improved user experience.",
    callToAction: "Download App",
    engagementTime: 7.1,
    likes: 980,
    comments: 56,
    shares: 78,
  },
];

for (let i = 5; i <= 54; i++) {
  const base = mockStaticAds[i % mockStaticAds.length];
  mockStaticAds.push({
    id: `static-${i}`,
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
];

export default function StaticAdsPage() {
  const params = useParams();
  const accountId = params.id as string;

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMetrics, setSelectedMetrics] =
    useState<AvailableMetric[]>(defaultMetrics);
  const [advancedFilters, setAdvancedFilters] = useState<FilterCondition[]>([]);
  const [spendRange, setSpendRange] = useState<[number, number]>([1300, 8300]);
  const [isAnalysisPanelOpen, setIsAnalysisPanelOpen] = useState(false);
  const [isAdInfoModalOpen, setIsAdInfoModalOpen] = useState(false);
  const [selectionData, setSelectionData] = useState<SelectionData>({
    type: "rows",
  });
  const [tableSelection, setTableSelection] = useState<TableSelection | null>(
    null,
  );

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
    return mockStaticAds.filter((ad) => {
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
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-full max-w-full overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
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
            Static Ads
          </h2>
          <p className="text-sm text-gray-500">
            Manage and analyze your static advertising campaigns
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          onAdvancedFilter={handleAdvancedFilter}
          onAnalyzeSelected={handleAnalyzeSelected}
        />

        <MetricsBar
          selectedMetrics={selectedMetrics}
          availableMetrics={availableMetrics}
          onAddMetric={handleAddMetric}
          onRemoveMetric={handleRemoveMetric}
          onAdInfo={handleAdInfo}
        />

        <AdsTable
          ads={filteredAds}
          adType="static"
          selectedMetrics={selectedMetrics}
          onSelectionChange={setTableSelection}
        />

        {filteredAds.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No static ads found
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
