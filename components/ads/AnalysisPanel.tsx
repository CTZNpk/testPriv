"use client";

import { useState } from "react";
import {
  X,
  TrendingUp,
  BarChart3,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SelectionData } from "@/types/ads";
import { getAnalysisData } from "@/lib/analysisLogic";
import InsightsTab from "./analysis/InsightsTab";
import VisualizationsTab from "./analysis/VisualizationsTab";
import RecommendationsTab from "./analysis/RecommendationsTab";
import AskAITab from "./analysis/AskAITab";
import type { TableSelection } from "./AdsTable";

interface AnalysisPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectionData: SelectionData;
  selection?: TableSelection;
  ads?: any[];
  columns?: any[];
}

export function AnalysisPanel({
  isOpen,
  onClose,
  selectionData,
  selection,
  ads = [],
  columns = [],
}: AnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState("insights");

  // Helper to get column label from id
  const getColumnLabel = (colId: string) => {
    const col = columns.find((c: any) => c.id === colId);
    return col ? col.label : colId;
  };

  // Helper to get ad by id
  const getAdById = (adId: string) => ads.find((ad: any) => ad.id === adId);

  // Render selected data summary
  const renderSelectionSummary = () => {
    if (!selection) return null;
    if (selection.mode === "row") {
      // Show a list of selected row names (ad names)
      return (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Selected Rows</h3>
          <div className="space-y-2">
            {selection.rows.map((adId) => {
              const ad = getAdById(adId);
              if (!ad) return null;
              return (
                <div key={adId} className="border rounded p-3">
                  <div className="font-medium text-sm mb-2">{ad.name}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Status:</span> {ad.status}
                    </div>
                    <div>
                      <span className="font-medium">Spend:</span> $
                      {ad.spend?.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">App Installs:</span>{" "}
                      {ad.appInstalls?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Cost/Install:</span> $
                      {ad.costPerAppInstall?.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">Purchases:</span>{" "}
                      {ad.purchases?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Cost/Purchase:</span> $
                      {ad.costPerPurchase?.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">Impressions:</span>{" "}
                      {ad.impressions?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Clicks:</span>{" "}
                      {ad.clicks?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">CTR:</span>{" "}
                      {ad.ctr?.toFixed(2)}%
                    </div>
                    <div>
                      <span className="font-medium">CPM:</span> $
                      {ad.cpm?.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-medium">Reach:</span>{" "}
                      {ad.reach?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Frequency:</span>{" "}
                      {ad.frequency?.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (selection.mode === "column") {
      // Show selected columns with sample data
      return (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Selected Columns</h3>
          <div className="space-y-2">
            {selection.columns.map((colId) => {
              const col = columns.find((c: any) => c.id === colId);
              if (!col) return null;
              return (
                <div key={colId} className="border rounded p-2">
                  <div className="font-medium text-sm">{col.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    values: {ads.map((ad: any) => ad[colId]).join(", ")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (selection.mode === "cell" && selection.cell) {
      // Show the selected cell value
      if (!selection.cell) return null;
      const ad = getAdById(selection.cell.row);
      const col = columns.find((c: any) => c.id === selection.cell.col);
      return (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Selected Cell</h3>
          <div className="text-sm">
            <span className="font-medium">
              {col ? col.label : selection.cell.col}:
            </span>{" "}
            {ad ? ad[selection.cell.col] : "N/A"}
          </div>
        </div>
      );
    }
    return null;
  };

  const tabs = [
    { id: "insights", label: "Insights", icon: TrendingUp },
    { id: "visualizations", label: "Visualizations", icon: BarChart3 },
    { id: "recommendations", label: "Recommendations", icon: Lightbulb },
    { id: "ask-ai", label: "Ask AI", icon: MessageSquare },
  ];

  const analysisData = getAnalysisData(selectionData);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" data-analysis-panel>
      {/* Backdrop - Darker and less transparent */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* Panel - Double width */}
      <div className="w-[768px] bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Analysis Dashboard
            </h2>
            {/* No selection title needed */}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              {/* Original tabbed content */}
              {activeTab === "insights" && (
                <InsightsTab
                  selectionData={selectionData}
                  analysisData={analysisData}
                />
              )}
              {activeTab === "visualizations" && (
                <VisualizationsTab
                  selectionData={selectionData}
                  analysisData={analysisData}
                />
              )}
              {activeTab === "recommendations" && (
                <RecommendationsTab selectionData={selectionData} />
              )}
              {activeTab === "ask-ai" && (
                <AskAITab selectionData={selectionData} />
              )}

              {/* Always show selection summary at the end */}
              <div className="mt-8">{renderSelectionSummary()}</div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
