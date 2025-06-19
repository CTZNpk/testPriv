"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AdData, AvailableMetric } from "@/types/ads"
import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Filter } from "lucide-react"

interface AdsTableProps {
  ads: AdData[]
  adType: "video" | "static"
  selectedMetrics: AvailableMetric[]
  onSelectionChange?: (selection: TableSelection) => void
}

interface ColumnConfig {
  id: string
  label: string
  accessor: keyof AdData
  format?: "currency" | "number" | "percentage"
  minWidth: string
}

export type SelectionMode = 'row' | 'column' | 'cell';
export interface TableSelection {
  mode: SelectionMode;
  rows: string[];
  columns: string[];
  cell: { row: string; col: string } | null;
}

// Use picsum.photos for ad thumbnails
const getPlaceholderImg = (seed: string | number) => `https://picsum.photos/seed/${seed}/50/50`;

export function AdsTable({ ads, adType, selectedMetrics, onSelectionChange }: AdsTableProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  // --- Pagination State ---
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const pageSizes = [10, 25, 50]
  const totalPages = Math.ceil(ads.length / pageSize)

  // --- Sorting State ---
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null)

  // --- Selection State ---
  const [selectionMode, setSelectionMode] = useState<'row' | 'column' | 'cell'>('row')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set())
  const [selectedCell, setSelectedCell] = useState<{ row: string; col: string } | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border border-green-200"
      case "paused":
        return "bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))] border border-[hsl(var(--accent-30))]"
      case "completed":
        return "bg-[hsl(var(--primary-10))] text-[hsl(var(--primary))] border border-[hsl(var(--primary-20))]"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  // Define all possible columns
  const allColumns: ColumnConfig[] = [
    { id: "name", label: "Ad Name", accessor: "name", minWidth: "200px" },
    { id: "status", label: "Status", accessor: "status", minWidth: "80px" },
    { id: "spend", label: "Spend", accessor: "spend", format: "currency", minWidth: "100px" },
    { id: "appInstalls", label: "App Installs", accessor: "appInstalls", format: "number", minWidth: "100px" },
    {
      id: "costPerAppInstall",
      label: "Cost/Install",
      accessor: "costPerAppInstall",
      format: "currency",
      minWidth: "100px",
    },
    { id: "purchases", label: "Purchases", accessor: "purchases", format: "number", minWidth: "100px" },
    {
      id: "costPerPurchase",
      label: "Cost/Purchase",
      accessor: "costPerPurchase",
      format: "currency",
      minWidth: "120px",
    },
    { id: "impressions", label: "Impressions", accessor: "impressions", format: "number", minWidth: "100px" },
    { id: "clicks", label: "Clicks", accessor: "clicks", format: "number", minWidth: "80px" },
    { id: "ctr", label: "CTR", accessor: "ctr", format: "percentage", minWidth: "80px" },
    { id: "cpm", label: "CPM", accessor: "cpm", format: "currency", minWidth: "80px" },
    { id: "reach", label: "Reach", accessor: "reach", format: "number", minWidth: "100px" },
    { id: "frequency", label: "Frequency", accessor: "frequency", format: "number", minWidth: "100px" },
    ...(adType === "video"
      ? [
          {
            id: "videoViews",
            label: "Video Views",
            accessor: "videoViews" as keyof AdData,
            format: "number" as const,
            minWidth: "100px",
          },
          {
            id: "videoViewRate",
            label: "View Rate",
            accessor: "videoViewRate" as keyof AdData,
            format: "percentage" as const,
            minWidth: "100px",
          },
        ]
      : []),
  ]

  // Always include name and status columns, then add selected metrics
  const baseColumns = allColumns.filter((col: ColumnConfig) => col.id === "name" || col.id === "status")
  const metricColumns = allColumns.filter((col: ColumnConfig) => selectedMetrics.some((metric: AvailableMetric) => metric.id === col.id))
  const visibleColumns: ColumnConfig[] = [...baseColumns, ...metricColumns]

  // --- Add row number and thumbnail columns ---
  const columnsWithExtras: ColumnConfig[] = [
    { id: "rowNumber", label: "#", accessor: "rowNumber" as keyof AdData, minWidth: "40px" },
    { id: "thumbnail", label: "", accessor: "videoUrl" as keyof AdData, minWidth: "60px" },
    ...visibleColumns,
  ]

  // --- Sorting logic ---
  const sortedAds = useMemo(() => {
    if (!sortConfig) return ads
    const { column, direction } = sortConfig
    return [...ads].sort((a, b) => {
      const aValue = a[column as keyof AdData]
      const bValue = b[column as keyof AdData]
      if (aValue == null) return 1
      if (bValue == null) return -1
      if (aValue === bValue) return 0
      if (direction === 'asc') return aValue > bValue ? 1 : -1
      return aValue < bValue ? 1 : -1
    })
  }, [ads, sortConfig])

  // --- Pagination logic ---
  const pagedAds = useMemo(() => {
    const start = page * pageSize
    return sortedAds.slice(start, start + pageSize)
  }, [sortedAds, page, pageSize])

  // Click outside to deselect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      // Don't deselect if clicking on the Analyze Selected button
      if ((target as Element).closest?.('.analyze-selected-btn')) {
        return
      }
      // Don't deselect if clicking on the AnalysisPanel
      if ((target as Element).closest?.('[data-analysis-panel]')) {
        return
      }
      if (tableRef.current && !tableRef.current.contains(target)) {
        setSelectedRows(new Set())
        setSelectedColumns(new Set())
        setSelectedCell(null)
        if (onSelectionChange) {
          onSelectionChange({
            mode: 'row',
            rows: [],
            columns: [],
            cell: null,
          })
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onSelectionChange])

  // --- Selection logic ---
  const handleRowNumberClick = (adId: string, e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    setSelectionMode('row')
    setSelectedCell(null)
    setSelectedColumns(new Set())
    setSelectedRows((prev: Set<string>) => {
      const newSet = new Set(prev)
      if (e.metaKey || e.ctrlKey) {
        newSet.has(adId) ? newSet.delete(adId) : newSet.add(adId)
      } else {
        newSet.clear()
        newSet.add(adId)
      }
      if (onSelectionChange) {
        onSelectionChange({
          mode: 'row',
          rows: Array.from(newSet),
          columns: [],
          cell: null,
        })
      }
      return newSet
    })
  }
  const handleColumnHeaderClick = (colId: string, e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
    if ((e.target as HTMLElement).closest('.sort-icon')) return
    // Don't allow selection of Ad Name column
    if (colId === 'name') return
    setSelectionMode('column')
    setSelectedCell(null)
    setSelectedRows(new Set())
    setSelectedColumns((prev: Set<string>) => {
      const newSet = new Set(prev)
      if (e.metaKey || e.ctrlKey) {
        newSet.has(colId) ? newSet.delete(colId) : newSet.add(colId)
      } else {
        newSet.clear()
        newSet.add(colId)
      }
      if (onSelectionChange) {
        onSelectionChange({
          mode: 'column',
          rows: [],
          columns: Array.from(newSet),
          cell: null,
        })
      }
      return newSet
    })
  }
  const handleCellClick = (adId: string, colId: string) => {
    // Don't allow selection of Ad Name column
    if (colId === 'name') return
    setSelectionMode('cell')
    setSelectedRows(new Set())
    setSelectedColumns(new Set())
    setSelectedCell((_prev: { row: string; col: string } | null) => {
      if (onSelectionChange) {
        onSelectionChange({
          mode: 'cell',
          rows: [],
          columns: [],
          cell: { row: adId, col: colId },
        })
      }
      return { row: adId, col: colId }
    })
  }

  // --- Visual highlighting ---
  const isRowSelected = (adId: string) => selectionMode === 'row' && selectedRows.has(adId)
  const isColSelected = (colId: string) => selectionMode === 'column' && selectedColumns.has(colId)
  const isCellSelected = (adId: string, colId: string) => selectionMode === 'cell' && selectedCell && selectedCell.row === adId && selectedCell.col === colId

  // --- Format value ---
  const formatValue = (value: any, format?: string): string => {
    if (value === null || value === undefined) return "N/A"
    switch (format) {
      case "currency":
        return `$${Number(value).toFixed(2)}`
      case "number":
        return Number(value).toLocaleString()
      case "percentage":
        return `${Number(value).toFixed(2)}%`
      default:
        return String(value)
    }
  }

  // --- Render cell content ---
  const renderCellContent = (ad: AdData, column: ColumnConfig, rowIdx: number): React.ReactNode => {
    if (column.id === "rowNumber") {
      return <span className="text-xs text-gray-500 select-none">{rowIdx + 1 + page * pageSize}</span>
    }
    if (column.id === "thumbnail") {
      // Use picsum.photos for placeholder images
      const imgSrc = ad.videoUrl && !ad.videoUrl.includes('placeholder')
        ? ad.videoUrl
        : getPlaceholderImg(ad.id || rowIdx)
      return (
        <img
          src={imgSrc}
          alt="thumbnail"
          className="w-[50px] h-[50px] object-cover rounded border py-1"
          width={50}
          height={50}
        />
      )
    }
    if (column.id === "status") {
      return <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ad.status)}`}>{ad.status}</div>
    }
    const value = ad[column.accessor]
    return <span className="text-sm text-gray-900">{formatValue(value, column.format)}</span>
  }

  // --- Render ---
  return (
    <Card className="w-full min-w-0" ref={tableRef}>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto min-w-0">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[hsl(var(--accent-10))]">
                <tr>
                  {columnsWithExtras.map((column) => (
                    <th
                      key={column.id}
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none relative group"
                      style={{ minWidth: column.minWidth }}
                      onClick={(e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => handleColumnHeaderClick(column.id, e)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex-1 cursor-pointer pr-2">{column.label}</span>
                        {column.id !== "rowNumber" && column.id !== "thumbnail" && column.id !== "name" && (
                          <span
                            className="sort-icon cursor-pointer p-1 rounded hover:bg-gray-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSortConfig((prev: { column: string; direction: 'asc' | 'desc' } | null) =>
                                prev && prev.column === column.id
                                  ? { column: column.id, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                                  : { column: column.id, direction: 'asc' }
                              )
                            }}
                          >
                            {sortConfig?.column === column.id ? (
                              sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4 opacity-70" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pagedAds.map((ad: AdData, rowIdx: number) => (
                  <tr
                    key={ad.id}
                    className={
                      isRowSelected(ad.id)
                        ? 'bg-blue-100'
                        : ''
                    }
                  >
                    {columnsWithExtras.map((column) => (
                      <td
                        key={column.id}
                        className={
                          `px-3 py-4 whitespace-nowrap ` +
                          (isColSelected(column.id) ? 'bg-blue-100' : '') +
                          (isCellSelected(ad.id, column.id) ? 'bg-blue-200' : '')
                        }
                        onClick={(e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
                          if (column.id === 'rowNumber') return handleRowNumberClick(ad.id, e)
                          if (column.id !== 'rowNumber' && column.id !== 'thumbnail' && column.id !== 'name') handleCellClick(ad.id, column.id)
                        }}
                        style={{ cursor: column.id === 'rowNumber' ? 'pointer' : column.id === 'name' ? 'default' : 'cell' }}
                      >
                        {renderCellContent(ad, column, rowIdx)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Rows per page:</span>
            <select
              className="border rounded px-2 py-1 text-xs"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPage(0)
              }}
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
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
              onClick={() => setPage((p: number) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
