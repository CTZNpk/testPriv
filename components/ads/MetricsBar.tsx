"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, Plus, Info, CalendarDays } from "lucide-react";
import { useState } from "react";
import type { AvailableMetric } from "@/types/ads";
import { DatePicker } from "./DatePicker";

interface MetricsBarProps {
  selectedMetrics: AvailableMetric[];
  availableMetrics: AvailableMetric[];
  onAddMetric: (metric: AvailableMetric) => void;
  onRemoveMetric: (metricId: string) => void;
  onAdInfo?: () => void;
  startDate?: string;
  endDate?: string;
  onDateChange?: (startDate: string, endDate: string) => void;
}

export function MetricsBar({
  selectedMetrics,
  availableMetrics,
  onAddMetric,
  onRemoveMetric,
  onAdInfo,
  startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  endDate = new Date().toISOString().split("T")[0],
  onDateChange = () => { },
}: MetricsBarProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap items-center gap-2">
          {selectedMetrics.map((metric) => (
            <Badge
              key={metric.id}
              className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium"
            >
              <span>{metric.label}</span>
              <button
                onClick={() => onRemoveMetric(metric.id)}
                className="ml-0.5 hover:bg-blue-100 rounded-full p-0.5 transition-colors"
              >
                <X className="h-2.5 w-2.5 text-blue-500 hover:text-blue-700" />
              </button>
            </Badge>
          ))}
          {availableMetrics.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Add Metrics
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {availableMetrics.map((metric) => (
                  <DropdownMenuItem
                    key={metric.id}
                    onClick={() => onAddMetric(metric)}
                    className="cursor-pointer"
                  >
                    {metric.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Date Picker - positioned just to the left of Ad Info button */}
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
          />
          {onAdInfo && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAdInfo}
              className="flex items-center gap-1"
            >
              <Info className="h-3 w-3" />
              Ad Info
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
