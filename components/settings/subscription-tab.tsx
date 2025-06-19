"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard } from "lucide-react"

export function SubscriptionTab() {
  const [isUpdatePaymentOpen, setIsUpdatePaymentOpen] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  })

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Netherlands",
    "Other",
  ]

  const handleUpdatePayment = () => {
    console.log("Payment method updated:", cardDetails)
    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      billingAddress: "",
      city: "",
      zipCode: "",
      country: "",
    })
    setIsUpdatePaymentOpen(false)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Subscription</h2>
        <p className="text-muted-foreground">Manage your billing and subscription</p>
      </div>

      {/* Current Plan Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-md flex items-center justify-center">
            <span className="text-white text-sm">⭐</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Current Plan: Professional</h3>
            <p className="text-gray-600 text-sm">You're currently paying $99/month</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-yellow-200">
          <div>
            <h4 className="font-medium text-gray-900 text-sm mb-1">Payment Method</h4>
            <p className="text-gray-600 text-sm">•••• •••• •••• 4242</p>
          </div>
          <Dialog open={isUpdatePaymentOpen} onOpenChange={setIsUpdatePaymentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm">
                <CreditCard className="h-3 w-3 mr-2" />
                Update Card
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Update Payment Method</DialogTitle>
                <DialogDescription>Enter your new card details to update your payment method.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="cardholder-name">Cardholder Name</Label>
                  <Input
                    id="cardholder-name"
                    value={cardDetails.cardholderName}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: formatCardNumber(e.target.value) })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input
                      id="expiry-date"
                      value={cardDetails.expiryDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: formatExpiryDate(e.target.value) })}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="billing-address">Billing Address</Label>
                  <Input
                    id="billing-address"
                    value={cardDetails.billingAddress}
                    onChange={(e) => setCardDetails({ ...cardDetails, billingAddress: e.target.value })}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={cardDetails.city}
                      onChange={(e) => setCardDetails({ ...cardDetails, city: e.target.value })}
                      placeholder="New York"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip-code">ZIP Code</Label>
                    <Input
                      id="zip-code"
                      value={cardDetails.zipCode}
                      onChange={(e) => setCardDetails({ ...cardDetails, zipCode: e.target.value })}
                      placeholder="10001"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={cardDetails.country}
                    onValueChange={(value) => setCardDetails({ ...cardDetails, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpdatePaymentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdatePayment}>Update Payment Method</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Available Plans Section */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Starter Plan */}
          <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="text-center mb-5">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-lg">⚡</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Starter</h4>
              <div className="text-2xl font-bold">
                $29<span className="text-sm font-normal text-gray-600">/month</span>
              </div>
            </div>
            <ul className="space-y-2 mb-5 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Up to 3 ad accounts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Email support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>7-day data retention</span>
              </li>
            </ul>
            <Button className="w-full text-sm">Upgrade</Button>
          </div>

          {/* Professional Plan (Current) */}
          <div className="border-2 border-blue-500 rounded-lg p-5 relative bg-blue-50/30">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white text-xs px-2 py-1">Current Plan</Badge>
            </div>
            <div className="text-center mb-5">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-600 text-lg">⭐</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Professional</h4>
              <div className="text-2xl font-bold">
                $99<span className="text-sm font-normal text-gray-600">/month</span>
              </div>
            </div>
            <ul className="space-y-2 mb-5 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Up to 15 ad accounts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>30-day data retention</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Custom reports</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>API access</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full text-sm" disabled>
              Current Plan
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="text-center mb-5">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 text-lg">🚀</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Enterprise</h4>
              <div className="text-2xl font-bold">
                $299<span className="text-sm font-normal text-gray-600">/month</span>
              </div>
            </div>
            <ul className="space-y-2 mb-5 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Unlimited ad accounts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Full analytics suite</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>24/7 phone support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Unlimited data retention</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>White-label reports</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Advanced API access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>
                <span>Custom integrations</span>
              </li>
            </ul>
            <Button className="w-full text-sm">Upgrade</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
