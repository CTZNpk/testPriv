"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, X } from "lucide-react"
import { useState } from "react"

interface FilterCondition {
  id: string
  field: string
  operator: string
  value: string
}

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedFilter: string
  onFilterChange: (value: string) => void
  onAdvancedFilter?: (filters: FilterCondition[], spendRange: [number, number]) => void
  onAnalyzeSelected?: () => void
}

const filterFields = [
  { value: "name", label: "Ad name" },
  { value: "adsetName", label: "Adset name" },
  { value: "campaignName", label: "Campaign name" },
]

const filterOperators = [
  { value: "is", label: "is" },
  { value: "is_not", label: "is not" },
  { value: "contains", label: "contains" },
  { value: "not_contains", label: "not contains" },
]

// Mock data for dropdown values
const adNames = [
  "Summer Collection Video Campaign",
  "Brand Awareness Video",
  "Product Demo Video",
  "Holiday Special Video",
  "Summer Sale Static Banner",
  "Product Showcase Image",
  "Brand Logo Campaign",
  "Holiday Promotion Static",
  "App Feature Highlight",
]

const adsetNames = [
  "Summer Collection Targeting",
  "Brand Awareness Lookalike",
  "Product Demo Retargeting",
  "Holiday Special Interest",
  "Summer Sale Broad",
]

const campaignNames = [
  "Q4 Holiday Campaign",
  "Summer Collection 2024",
  "Brand Awareness Drive",
  "Product Launch Campaign",
  "Retargeting Campaign",
]

const MAX_SPEND = 50000

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

// Helper function to parse formatted number string back to number
const parseFormattedNumber = (str: string): number => {
  return Number.parseInt(str.replace(/,/g, "")) || 0
}

export function SearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  onAdvancedFilter,
  onAnalyzeSelected,
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [spendRange, setSpendRange] = useState<[number, number]>([1300, 8300])
  const [minSpendInput, setMinSpendInput] = useState("1,300")
  const [maxSpendInput, setMaxSpendInput] = useState("8,300")
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([
    { id: "1", field: "", operator: "", value: "" },
  ])

  const addFilterCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: "name", // Set default field
      operator: "is", // Set default operator
      value: "",
    }
    setFilterConditions([...filterConditions, newCondition])
  }

  const removeFilterCondition = (id: string) => {
    if (filterConditions.length > 1) {
      setFilterConditions(filterConditions.filter((condition) => condition.id !== id))
    }
  }

  const updateFilterCondition = (id: string, field: keyof FilterCondition, value: string) => {
    setFilterConditions(
      filterConditions.map((condition) => {
        if (condition.id === id) {
          const updatedCondition = { ...condition, [field]: value }
          // Reset value when field or operator changes
          if (field === "field" || field === "operator") {
            updatedCondition.value = ""
          }
          return updatedCondition
        }
        return condition
      }),
    )
  }

  const handleSpendRangeChange = (value: [number, number]) => {
    setSpendRange(value)
    setMinSpendInput(formatNumber(value[0]))
    setMaxSpendInput(formatNumber(value[1]))
  }

  const handleMinSpendInputChange = (value: string) => {
    setMinSpendInput(value)
    const numValue = parseFormattedNumber(value)
    if (numValue <= spendRange[1]) {
      setSpendRange([numValue, spendRange[1]])
    }
  }

  const handleMaxSpendInputChange = (value: string) => {
    setMaxSpendInput(value)
    const numValue = parseFormattedNumber(value)
    if (numValue >= spendRange[0]) {
      setSpendRange([spendRange[0], numValue])
    }
  }

  const getDropdownValues = (field: string) => {
    switch (field) {
      case "name":
        return adNames
      case "adsetName":
        return adsetNames
      case "campaignName":
        return campaignNames
      default:
        return []
    }
  }

  const applyFilters = () => {
    if (onAdvancedFilter) {
      onAdvancedFilter(filterConditions, spendRange)
    }
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    setFilterConditions([{ id: "1", field: "", operator: "", value: "" }])
    setSpendRange([0, MAX_SPEND])
    setMinSpendInput("0")
    setMaxSpendInput(formatNumber(MAX_SPEND))
  }

  const shouldShowDropdown = (operator: string) => {
    return operator === "is" || operator === "is_not"
  }

  const shouldShowTextInput = (operator: string) => {
    return operator === "contains" || operator === "not_contains"
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search ads..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9"
          />
        </div>

        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-[hsl(var(--accent-10))] hover:border-[hsl(var(--primary))]"
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Advanced Filters</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Ad Spend Range Filter */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900">Ad Spend Range</h4>
                <div className="px-3">
                  {/* Custom Dual Range Slider */}
                  <div className="relative w-full h-6 flex items-center">
                    <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                    <div
                      className="absolute h-2 bg-[hsl(var(--primary))] rounded-full"
                      style={{
                        left: `${(spendRange[0] / MAX_SPEND) * 100}%`,
                        width: `${((spendRange[1] - spendRange[0]) / MAX_SPEND) * 100}%`,
                      }}
                    ></div>

                    {/* Left Handle */}
                    <div
                      className="absolute w-5 h-5 bg-white border-2 border-[hsl(var(--primary))] rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow z-10"
                      style={{ left: `calc(${(spendRange[0] / MAX_SPEND) * 100}% - 10px)` }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        const startX = e.clientX
                        const startValue = spendRange[0]
                        const slider = e.currentTarget.parentElement
                        const sliderRect = slider!.getBoundingClientRect()

                        const handleMouseMove = (e: MouseEvent) => {
                          const deltaX = e.clientX - startX
                          const deltaPercent = (deltaX / sliderRect.width) * 100
                          const deltaValue = (deltaPercent / 100) * MAX_SPEND
                          const newValue = Math.max(
                            0,
                            Math.min(spendRange[1] - 100, Math.round((startValue + deltaValue) / 100) * 100),
                          )
                          setSpendRange([newValue, spendRange[1]])
                          setMinSpendInput(formatNumber(newValue))
                        }

                        const handleMouseUp = () => {
                          document.removeEventListener("mousemove", handleMouseMove)
                          document.removeEventListener("mouseup", handleMouseUp)
                        }

                        document.addEventListener("mousemove", handleMouseMove)
                        document.addEventListener("mouseup", handleMouseUp)
                      }}
                    ></div>

                    {/* Right Handle */}
                    <div
                      className="absolute w-5 h-5 bg-white border-2 border-[hsl(var(--primary))] rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow z-10"
                      style={{ left: `calc(${(spendRange[1] / MAX_SPEND) * 100}% - 10px)` }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        const startX = e.clientX
                        const startValue = spendRange[1]
                        const slider = e.currentTarget.parentElement
                        const sliderRect = slider!.getBoundingClientRect()

                        const handleMouseMove = (e: MouseEvent) => {
                          const deltaX = e.clientX - startX
                          const deltaPercent = (deltaX / sliderRect.width) * 100
                          const deltaValue = (deltaPercent / 100) * MAX_SPEND
                          const newValue = Math.max(
                            spendRange[0] + 100,
                            Math.min(MAX_SPEND, Math.round((startValue + deltaValue) / 100) * 100),
                          )
                          setSpendRange([spendRange[0], newValue])
                          setMaxSpendInput(formatNumber(newValue))
                        }

                        const handleMouseUp = () => {
                          document.removeEventListener("mousemove", handleMouseMove)
                          document.removeEventListener("mouseup", handleMouseUp)
                        }

                        document.addEventListener("mousemove", handleMouseMove)
                        document.addEventListener("mouseup", handleMouseUp)
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-500">$</span>
                      <Input
                        value={minSpendInput}
                        onChange={(e) => handleMinSpendInputChange(e.target.value)}
                        className="w-28 h-8 text-sm"
                        type="text"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-500">$</span>
                      <Input
                        value={maxSpendInput}
                        onChange={(e) => handleMaxSpendInputChange(e.target.value)}
                        className="w-28 h-8 text-sm"
                        type="text"
                        placeholder="50,000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditional Filters */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900">Conditions</h4>

                <div className="pl-4 space-y-4">
                  {filterConditions.map((condition, index) => (
                    <div key={condition.id} className="space-y-3">
                      <div className="flex items-center gap-3">
                        {index === 0 && <span className="text-sm text-gray-600 w-12">Where</span>}
                        {index > 0 && <span className="text-sm text-gray-600 w-12">And</span>}

                        <Select
                          value={condition.field}
                          onValueChange={(value) => updateFilterCondition(condition.id, "field", value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Ad name" />
                          </SelectTrigger>
                          <SelectContent>
                            {filterFields.map((field) => (
                              <SelectItem key={field.value} value={field.value}>
                                {field.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={condition.operator}
                          onValueChange={(value) => updateFilterCondition(condition.id, "operator", value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="is" />
                          </SelectTrigger>
                          <SelectContent>
                            {filterOperators.map((operator) => (
                              <SelectItem key={operator.value} value={operator.value}>
                                {operator.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Conditional third element */}
                        {condition.field && condition.operator && (
                          <>
                            {shouldShowDropdown(condition.operator) && (
                              <Select
                                value={condition.value}
                                onValueChange={(value) => updateFilterCondition(condition.id, "value", value)}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Select value" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getDropdownValues(condition.field).map((value) => (
                                    <SelectItem key={value} value={value}>
                                      {value}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}

                            {shouldShowTextInput(condition.operator) && (
                              <Input
                                placeholder="Enter value"
                                value={condition.value}
                                onChange={(e) => updateFilterCondition(condition.id, "value", e.target.value)}
                                className="w-40"
                              />
                            )}
                          </>
                        )}

                        {/* Show placeholder when field or operator is not selected */}
                        {(!condition.field || !condition.operator) && (
                          <div className="w-40 h-10 border border-gray-200 rounded-md flex items-center px-3 text-gray-400 text-sm">
                            {!condition.field ? "Select field first" : "Select operator"}
                          </div>
                        )}

                        {filterConditions.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFilterCondition(condition.id)}
                            className="p-1 h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button variant="ghost" onClick={addFilterCondition} className="flex items-center gap-2 text-sm">
                    <Plus className="h-4 w-4" />
                    Add condition
                  </Button>
                </div>
              </div>

              {/* Group By Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h4 className="text-sm font-medium text-gray-900">Group by</h4>
                  <Select defaultValue="">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select grouping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Ad name</SelectItem>
                      <SelectItem value="adsetName">Adset name</SelectItem>
                      <SelectItem value="campaignName">Campaign name</SelectItem>
                      <SelectItem value="landingPage">Landing page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={applyFilters} className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-50))]">
                  Apply
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onAnalyzeSelected}
          className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-50))] text-white analyze-selected-btn"
        >
          Analyze Selected
        </Button>
      </div>
    </div>
  )
}
