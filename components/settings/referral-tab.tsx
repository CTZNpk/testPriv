"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Share2 } from "lucide-react"

export function ReferralTab() {
  const [referralStats] = useState({
    totalReferrals: 12,
    successfulReferrals: 8,
    totalEarned: "$240",
    referralCode: "FBADS2024",
  })

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralStats.referralCode)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Referral Program</h2>
        <p className="text-muted-foreground">Earn rewards by referring new users to our platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Stats</CardTitle>
            <CardDescription>Track your referral performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{referralStats.totalReferrals}</div>
                  <div className="text-sm text-muted-foreground">Total Referrals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{referralStats.successfulReferrals}</div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </div>
              </div>
              <div className="text-center pt-4 border-t">
                <div className="text-3xl font-bold text-green-600">{referralStats.totalEarned}</div>
                <div className="text-sm text-muted-foreground">Total Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Share Your Code</CardTitle>
            <CardDescription>Invite friends and earn $30 for each successful referral</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input value={referralStats.referralCode} readOnly />
                <Button variant="outline" size="sm" onClick={copyReferralCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Button className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via Email
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Social Media
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>How it works:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Share your referral code with friends</li>
                  <li>They sign up and subscribe to a paid plan</li>
                  <li>You earn $30 credit, they get 20% off first month</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
