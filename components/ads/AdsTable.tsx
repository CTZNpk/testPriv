"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AdData, AvailableMetric } from "@/types/ads";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface AdsTableProps {
  ads: AdData[];
  adType: "video" | "static";
  selectedMetrics: AvailableMetric[];
  onSelectionChange?: (selection: TableSelection) => void;
}

interface ColumnConfig {
  id: string;
  label: string;
  accessor: keyof AdData;
  format?: "currency" | "number" | "percentage" | "spend";
  minWidth: string;
}

export type SelectionMode = "row" | "column" | "cell";
export interface TableSelection {
  mode: SelectionMode;
  rows: string[];
  columns: string[];
  cell: { row: string; col: string } | null;
}

// Use picsum.photos for ad thumbnails
const getPlaceholderImg = (seed: string | number) =>
  `https://picsum.photos/seed/${seed}/50/50`;

export function AdsTable({
  ads,
  adType,
  selectedMetrics,
  onSelectionChange,
}: AdsTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<{
    isResizing: boolean;
    columnId: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  // --- Column width state ---
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  // --- Pagination State ---
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const pageSizes = [25, 50, 100];
  const totalPages = Math.ceil(ads.length / pageSize);

  // --- Sorting State ---
  const [sortConfig, setSortConfig] = useState<{
    column: string;
    direction: "asc" | "desc";
  } | null>(null);

  // --- Selection State ---
  const [selectionMode, setSelectionMode] = useState<"row" | "column" | "cell">(
    "row",
  );
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(
    new Set(),
  );
  const [selectedCell, setSelectedCell] = useState<{
    row: string;
    col: string;
  } | null>(null);

  // Define all possible columns
  const allColumns: ColumnConfig[] = [
    { id: "name", label: "Ad Name", accessor: "name", minWidth: "330px" },
    {
      id: "spend",
      label: "Spend",
      accessor: "spend",
      format: "spend",
      minWidth: "140px",
    },
    {
      id: "appInstalls",
      label: "App Installs",
      accessor: "appInstalls",
      format: "number",
      minWidth: "140px",
    },
    {
      id: "costPerAppInstall",
      label: "Cost/Install",
      accessor: "costPerAppInstall",
      format: "currency",
      minWidth: "140px",
    },
    {
      id: "purchases",
      label: "Purchases",
      accessor: "purchases",
      format: "number",
      minWidth: "140px",
    },
    {
      id: "costPerPurchase",
      label: "Cost/Purchase",
      accessor: "costPerPurchase",
      format: "currency",
      minWidth: "140px",
    },
    {
      id: "impressions",
      label: "Impressions",
      accessor: "impressions",
      format: "number",
      minWidth: "140px",
    },
    {
      id: "clicks",
      label: "Clicks",
      accessor: "clicks",
      format: "number",
      minWidth: "140px",
    },
    {
      id: "ctr",
      label: "CTR",
      accessor: "ctr",
      format: "percentage",
      minWidth: "140px",
    },
    {
      id: "cpm",
      label: "CPM",
      accessor: "cpm",
      format: "currency",
      minWidth: "140px",
    },
    {
      id: "reach",
      label: "Reach",
      accessor: "reach",
      format: "number",
      minWidth: "140px",
    },
    {
      id: "frequency",
      label: "Frequency",
      accessor: "frequency",
      format: "number",
      minWidth: "140px",
    },
    ...(adType === "video"
      ? [
          {
            id: "videoViews",
            label: "Video Views",
            accessor: "videoViews" as keyof AdData,
            format: "number" as const,
            minWidth: "140px",
          },
          {
            id: "videoViewRate",
            label: "View Rate",
            accessor: "videoViewRate" as keyof AdData,
            format: "percentage" as const,
            minWidth: "140px",
          },
        ]
      : []),
  ];

  // Always include name column, then add selected metrics (removed status column)
  const baseColumns = allColumns.filter(
    (col: ColumnConfig) => col.id === "name",
  );
  const metricColumns = allColumns.filter((col: ColumnConfig) =>
    selectedMetrics.some((metric: AvailableMetric) => metric.id === col.id),
  );
  const visibleColumns: ColumnConfig[] = [...baseColumns, ...metricColumns];

  const columnsWithExtras: ColumnConfig[] = [
    {
      id: "rowNumber",
      label: "#",
      accessor: "rowNumber" as keyof AdData,
      minWidth: "40px",
    },
    ...visibleColumns,
  ];

  // Column resize handlers
  const handleMouseDown = (e: React.MouseEvent, columnId: string) => {
    e.preventDefault();
    const startX = e.clientX;
    const column = columnsWithExtras.find((col) => col.id === columnId);
    const currentWidth =
      columnWidths[columnId] || parseInt(column?.minWidth || "140px");

    resizeRef.current = {
      isResizing: true,
      columnId,
      startX,
      startWidth: currentWidth,
    };

    // Add cursor style to body during resize
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!resizeRef.current?.isResizing) return;

    const { columnId, startX, startWidth } = resizeRef.current;
    const deltaX = e.clientX - startX;
    const newWidth = Math.max(50, startWidth + deltaX); // Minimum width of 50px

    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: newWidth,
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    if (resizeRef.current?.isResizing) {
      resizeRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Get column width
  const getColumnWidth = (column: ColumnConfig) => {
    return columnWidths[column.id] || parseInt(column.minWidth);
  };

  // --- Sorting logic ---
  const sortedAds = useMemo(() => {
    if (!sortConfig) return ads;
    const { column, direction } = sortConfig;
    return [...ads].sort((a, b) => {
      const aValue = a[column as keyof AdData];
      const bValue = b[column as keyof AdData];
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (aValue === bValue) return 0;
      if (direction === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }, [ads, sortConfig]);

  // --- Pagination logic ---
  const pagedAds = useMemo(() => {
    const start = page * pageSize;
    return sortedAds.slice(start, start + pageSize);
  }, [sortedAds, page, pageSize]);

  // Click outside to deselect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Don't deselect if clicking on the Analyze Selected button
      if ((target as Element).closest?.(".analyze-selected-btn")) {
        return;
      }
      // Don't deselect if clicking on the AnalysisPanel
      if ((target as Element).closest?.("[data-analysis-panel]")) {
        return;
      }
      if (tableRef.current && !tableRef.current.contains(target)) {
        setSelectedRows(new Set());
        setSelectedColumns(new Set());
        setSelectedCell(null);
        if (onSelectionChange) {
          onSelectionChange({
            mode: "row",
            rows: [],
            columns: [],
            cell: null,
          });
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onSelectionChange]);

  // --- Selection logic ---
  const handleRowNumberClick = (
    adId: string,
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
  ) => {
    setSelectionMode("row");
    setSelectedCell(null);
    setSelectedColumns(new Set());
    setSelectedRows((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (e.metaKey || e.ctrlKey) {
        newSet.has(adId) ? newSet.delete(adId) : newSet.add(adId);
      } else {
        newSet.clear();
        newSet.add(adId);
      }
      if (onSelectionChange) {
        onSelectionChange({
          mode: "row",
          rows: Array.from(newSet),
          columns: [],
          cell: null,
        });
      }
      return newSet;
    });
  };
  const handleColumnHeaderClick = (
    colId: string,
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLElement).closest(".sort-icon")) return;
    if ((e.target as HTMLElement).closest(".resize-handle")) return;
    // Don't allow selection of Ad Name column
    if (colId === "name") return;
    setSelectionMode("column");
    setSelectedCell(null);
    setSelectedRows(new Set());
    setSelectedColumns((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (e.metaKey || e.ctrlKey) {
        newSet.has(colId) ? newSet.delete(colId) : newSet.add(colId);
      } else {
        newSet.clear();
        newSet.add(colId);
      }
      if (onSelectionChange) {
        onSelectionChange({
          mode: "column",
          rows: [],
          columns: Array.from(newSet),
          cell: null,
        });
      }
      return newSet;
    });
  };
  const handleCellClick = (adId: string, colId: string) => {
    // Don't allow selection of Ad Name column
    if (colId === "name") return;
    setSelectionMode("cell");
    setSelectedRows(new Set());
    setSelectedColumns(new Set());
    setSelectedCell((_prev: { row: string; col: string } | null) => {
      if (onSelectionChange) {
        onSelectionChange({
          mode: "cell",
          rows: [],
          columns: [],
          cell: { row: adId, col: colId },
        });
      }
      return { row: adId, col: colId };
    });
  };

  // --- Visual highlighting ---
  const isRowSelected = (adId: string) =>
    selectionMode === "row" && selectedRows.has(adId);
  const isColSelected = (colId: string) =>
    selectionMode === "column" && selectedColumns.has(colId);
  const isCellSelected = (adId: string, colId: string) =>
    selectionMode === "cell" &&
    selectedCell &&
    selectedCell.row === adId &&
    selectedCell.col === colId;

  // --- Format value ---
  const formatValue = (value: any, format?: string): string => {
    if (value === null || value === undefined) return "N/A";
    switch (format) {
      case "spend":
        return `$${Number(value).toLocaleString()}`;
      case "currency":
        return `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case "number":
        return Number(value).toLocaleString();
      case "percentage":
        return `${Number(value).toFixed(2)}%`;
      default:
        return String(value);
    }
  };

  // --- Render cell content ---
  const renderCellContent = (
    ad: AdData,
    column: ColumnConfig,
    rowIdx: number,
  ): React.ReactNode => {
    if (column.id === "rowNumber") {
      return (
        <span className="text-xs text-gray-500 select-none">
          {rowIdx + 1 + page * pageSize}
        </span>
      );
    }
    if (column.id === "name") {
      // Use picsum.photos for placeholder images
      const imgSrc =
        ad.videoUrl && !ad.videoUrl.includes("placeholder")
          ? ad.videoUrl
          : getPlaceholderImg(ad.id || rowIdx);

      const value = ad[column.accessor];
      return (
        <div className="flex items-center gap-2">
          <img
            src={imgSrc}
            alt="thumbnail"
            className="w-[50px] h-[50px] object-cover rounded border"
          />
          <span className="text-sm text-gray-900">
            {formatValue(value, column.format)}
          </span>
        </div>
      );
    }
    const value = ad[column.accessor];
    return (
      <span className="text-sm text-gray-900">
        {formatValue(value, column.format)}
      </span>
    );
  };

  // --- Render ---
  return (
    <Card className="w-full min-w-0" ref={tableRef}>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto min-w-0 max-w-full">
          <div className="min-w-full inline-block align-middle">
            <table
              className="min-w-full divide-y divide-gray-200"
              style={{
                width: "max-content",
                minWidth: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
              }}
            >
              <thead className="bg-[hsl(var(--accent-10))]">
                <tr>
                  {columnsWithExtras.map((column) => (
                    <th
                      key={column.id}
                      className={`text-xs font-medium text-gray-500 uppercase tracking-wider select-none relative group border-r border-b border-gray-200 last:border-r-0 ${
                        column.id === "rowNumber" ? "text-center" : "text-left"
                      }`}
                      style={{
                        width: `${getColumnWidth(column)}px`,
                        minWidth: `${getColumnWidth(column)}px`,
                        maxWidth: `${getColumnWidth(column)}px`,
                        padding:
                          column.id === "name"
                            ? "12px 5px 12px 12px"
                            : "12px 5px",
                        userSelect: "none",
                      }}
                      onClick={(
                        e: React.MouseEvent<
                          HTMLTableHeaderCellElement,
                          MouseEvent
                        >,
                      ) => handleColumnHeaderClick(column.id, e)}
                    >
                      <div className={`flex items-center ${column.id === "rowNumber" ? "justify-center" : "justify-between"}`}>
                        <span className={`${column.id === "rowNumber" ? "" : "flex-1 pr-2"} truncate`}>
                          {column.label}
                        </span>
                        {column.id !== "rowNumber" && column.id !== "name" && (
                          <span
                            className="sort-icon cursor-pointer p-1 rounded hover:bg-gray-200 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSortConfig(
                                (
                                  prev: {
                                    column: string;
                                    direction: "asc" | "desc";
                                  } | null,
                                ) =>
                                  prev && prev.column === column.id
                                    ? {
                                        column: column.id,
                                        direction:
                                          prev.direction === "asc"
                                            ? "desc"
                                            : "asc",
                                      }
                                    : { column: column.id, direction: "asc" },
                              );
                            }}
                          >
                            {sortConfig?.column === column.id ? (
                              sortConfig.direction === "asc" ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )
                            ) : (
                              <ChevronDown className="w-4 h-4 opacity-70" />
                            )}
                          </span>
                        )}
                      </div>
                      {/* Resize handle */}
                      <div
                        className="resize-handle absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-400 group-hover:bg-gray-300"
                        onMouseDown={(e) => handleMouseDown(e, column.id)}
                        style={{ zIndex: 10 }}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {pagedAds.map((ad: AdData, rowIdx: number) => (
                  <tr
                    key={ad.id}
                    className={`${isRowSelected(ad.id) ? "bg-blue-100" : ""} border-b border-gray-200`}
                  >
                    {columnsWithExtras.map((column) => (
                      <td
                        key={`${ad.id}-${column.id}`}
                        className={
                          `whitespace-nowrap border-r border-gray-100 last:border-r-0 border-b border-gray-200 overflow-hidden ${
                            column.id === "rowNumber" ? "text-center" : ""
                          } ` +
                          (isColSelected(column.id) ? "bg-blue-100" : "") +
                          (isCellSelected(ad.id, column.id)
                            ? "bg-blue-200"
                            : "")
                        }
                        style={{
                          width: `${getColumnWidth(column)}px`,
                          minWidth: `${getColumnWidth(column)}px`,
                          maxWidth: `${getColumnWidth(column)}px`,
                          padding:
                            column.id === "name" ? "5px 5px 5px 12px" : "5px",
                          cursor:
                            column.id === "rowNumber"
                              ? "pointer"
                              : column.id !== "name"
                                ? "pointer"
                                : "default",
                          userSelect: "none",
                        }}
                        onClick={(
                          e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
                        ) => {
                          if (column.id === "rowNumber")
                            return handleRowNumberClick(ad.id, e);
                          if (column.id !== "rowNumber" && column.id !== "name")
                            handleCellClick(ad.id, column.id);
                        }}
                      >
                        <div className={`truncate ${column.id === "rowNumber" ? "text-center" : ""}`}>
                          {renderCellContent(ad, column, rowIdx)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-t bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Rows per page:</span>
            <select
              className="border rounded px-2 py-1 text-xs"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(0);
              }}
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded disabled:opacity-50"
              onClick={() => setPage((p: number) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-500">
              Page {page + 1} of {totalPages}
            </span>
            <button
              className="p-1 rounded disabled:opacity-50"
              onClick={() =>
                setPage((p: number) => Math.min(totalPages - 1, p + 1))
              }
              disabled={page >= totalPages - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
