"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share, Bookmark, ChevronDown, Info } from "lucide-react"
import type { AdData } from "@/types/ads"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AdInfoModalProps {
  isOpen: boolean
  onClose: () => void
  ad?: AdData
}

export function AdInfoModal({ isOpen, onClose, ad }: AdInfoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeTab, setActiveTab] = useState<"adInfo" | "scriptAnalysis">("adInfo")

  const [openSections, setOpenSections] = useState({
    conversions: true,
    engagement: false,
    performance: false,
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    video.currentTime = newTime
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (!ad) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Ad Information - {ad.name}</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">View detailed performance metrics and script analysis</p>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Left Side - Video Player */}
          <div className="w-1/2 bg-gray-100 flex items-center justify-center relative py-8">
            <div className="relative h-full max-h-[calc(100vh-200px)] aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden shadow-2xl mx-auto">
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/placeholder.svg?height=720&width=405"
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={ad.videoUrl} type="video/mp4" />
              </video>

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20">
                {/* Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={togglePlay}
                    className="bg-black/30 hover:bg-black/50 text-white rounded-full p-4"
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>
                </div>

                {/* Top Controls */}
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Progress Bar */}
                  <div
                    className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-4"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>

                  {/* Time Display */}
                  <div className="flex justify-between text-white text-xs mb-4">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Social Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className="text-white hover:bg-white/20 p-2"
                      >
                        <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                        <MessageCircle className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                        <Share className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Ad Information */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab("adInfo")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "adInfo"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Ad Info
              </button>
              <button
                onClick={() => setActiveTab("scriptAnalysis")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "scriptAnalysis"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Script Analysis
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "adInfo" && (
              <div className="space-y-0">
                {/* Conversions Section */}
                <Collapsible open={openSections.conversions} onOpenChange={() => toggleSection("conversions")}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <h3 className="text-sm text-gray-900">Conversions</h3>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${openSections.conversions ? "rotate-180" : ""}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4">
                    <div className="space-y-0">
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">App Installs</p>
                        <p className="text-sm text-gray-900">{ad.appInstalls?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Cost per Install</p>
                        <p className="text-sm text-gray-900">${ad.costPerAppInstall?.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Purchases</p>
                        <p className="text-sm text-gray-900">{ad.purchases?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Cost per Purchase</p>
                        <p className="text-sm text-gray-900">${ad.costPerPurchase?.toFixed(2)}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Engagement Section */}
                <Collapsible open={openSections.engagement} onOpenChange={() => toggleSection("engagement")}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <h3 className="text-sm text-gray-900">Engagement</h3>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${openSections.engagement ? "rotate-180" : ""}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4">
                    <div className="space-y-0">
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Likes</p>
                        <p className="text-sm text-gray-900">{ad.likes?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Comments</p>
                        <p className="text-sm text-gray-900">{ad.comments?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Shares</p>
                        <p className="text-sm text-gray-900">{ad.shares?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Engagement Time</p>
                        <p className="text-sm text-gray-900">{ad.engagementTime?.toFixed(1)}s</p>
                      </div>
                      {ad.videoViews && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                          <p className="text-sm text-gray-500">Video Views</p>
                          <p className="text-sm text-gray-900">{ad.videoViews?.toLocaleString()}</p>
                        </div>
                      )}
                      {ad.videoViewRate && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                          <p className="text-sm text-gray-500">View Rate</p>
                          <p className="text-sm text-gray-900">{ad.videoViewRate?.toFixed(1)}%</p>
                        </div>
                      )}
                      {ad.watchTime && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                          <p className="text-sm text-gray-500">Avg Watch Time</p>
                          <p className="text-sm text-gray-900">{ad.watchTime?.toFixed(1)}s</p>
                        </div>
                      )}
                      {ad.completionRate && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                          <p className="text-sm text-gray-500">Completion Rate</p>
                          <p className="text-sm text-gray-900">{ad.completionRate?.toFixed(1)}%</p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Performance Section */}
                <Collapsible open={openSections.performance} onOpenChange={() => toggleSection("performance")}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <h3 className="text-sm text-gray-900">Performance</h3>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${openSections.performance ? "rotate-180" : ""}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4">
                    <div className="space-y-0">
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Amount Spent</p>
                        <p className="text-sm text-gray-900">${ad.spend?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Impressions</p>
                        <p className="text-sm text-gray-900">{ad.impressions?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Clicks</p>
                        <p className="text-sm text-gray-900">{ad.clicks?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">CTR</p>
                        <p className="text-sm text-gray-900">{ad.ctr?.toFixed(2)}%</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">CPM</p>
                        <p className="text-sm text-gray-900">${ad.cpm?.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                        <p className="text-sm text-gray-500">Reach</p>
                        <p className="text-sm text-gray-900">{ad.reach?.toLocaleString()}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {activeTab === "scriptAnalysis" && (
              <div className="space-y-6">
                {/* Video Script Section */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Video Script</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm leading-relaxed text-gray-700">
                      {ad.script || "No script available for this ad."}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Call to Action</p>
                      <Badge variant="outline" className="text-xs">
                        {ad.callToAction || "Learn More"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Hook Recommendations Section */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Recommended Hooks</h3>
                  <div className="space-y-3">
                    <TooltipProvider>
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 relative">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-2">
                            <h4 className="text-xs font-medium text-indigo-900 mb-1">Question Hook</h4>
                            <p className="text-xs text-indigo-800 font-medium">
                              "Are you tired of spending hours on [problem]?"
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-indigo-600 cursor-help flex-shrink-0" />
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <p className="text-xs">
                                This hook is suggested because it matches your ad's problem-solving theme and is used by
                                a top-performing ad with a $2.34 CPA cost - 45% lower than your current CPA.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 relative">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-2">
                            <h4 className="text-xs font-medium text-rose-900 mb-1">Urgency Hook</h4>
                            <p className="text-xs text-rose-800 font-medium">
                              "Only 24 hours left to get [benefit]..."
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-rose-600 cursor-help flex-shrink-0" />
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <p className="text-xs">
                                This urgency-based hook is recommended because similar ads in your industry using
                                time-sensitive language achieve 67% higher CTR and $1.89 CPA.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 relative">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-2">
                            <h4 className="text-xs font-medium text-teal-900 mb-1">Social Proof Hook</h4>
                            <p className="text-xs text-teal-800 font-medium">
                              "Join 50,000+ people who already discovered..."
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-teal-600 cursor-help flex-shrink-0" />
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <p className="text-xs">
                                Social proof hooks like this one are performing 23% better in your target demographic,
                                with a leading competitor achieving $2.12 CPA using similar messaging.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
