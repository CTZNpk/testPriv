"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Facebook, CheckCircle, AlertCircle, Trash2 } from "lucide-react"

interface AdAccount {
  id: string
  name: string
  accountId: string
  status: "connected" | "error" | "pending"
  lastSync: string
  spend: string
}

export function AdAccountsTab() {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([
    {
      id: "1",
      name: "Main Business Account",
      accountId: "act_123456789",
      status: "connected",
      lastSync: "2024-01-15 11:00 AM",
      spend: "$12,847",
    },
    {
      id: "2",
      name: "Secondary Account",
      accountId: "act_987654321",
      status: "error",
      lastSync: "2024-01-14 3:30 PM",
      spend: "$5,432",
    },
    {
      id: "3",
      name: "Test Account",
      accountId: "act_456789123",
      status: "pending",
      lastSync: "Never",
      spend: "$0",
    },
  ])

  const [isConnectAccountOpen, setIsConnectAccountOpen] = useState(false)

  const handleConnectAccount = () => {
    const newAccount: AdAccount = {
      id: Date.now().toString(),
      name: "New Connected Account",
      accountId: `act_${Math.random().toString().substr(2, 9)}`,
      status: "connected",
      lastSync: new Date().toLocaleString(),
      spend: "$0",
    }
    setAdAccounts([...adAccounts, newAccount])
    setIsConnectAccountOpen(false)
  }

  const handleTestConnection = (accountId: string) => {
    setAdAccounts(
      adAccounts.map((account) =>
        account.id === accountId
          ? { ...account, lastSync: new Date().toLocaleString(), status: "connected" as const }
          : account,
      ),
    )
  }

  const handleRemoveAccount = (accountId: string) => {
    setAdAccounts(adAccounts.filter((account) => account.id !== accountId))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ad Account Management</h2>
          <p className="text-muted-foreground">Connect and manage Facebook ad accounts</p>
        </div>
        <Dialog open={isConnectAccountOpen} onOpenChange={setIsConnectAccountOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Connect Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Facebook Ad Account</DialogTitle>
              <DialogDescription>Connect a new Facebook ad account to start tracking performance.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Facebook className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Connect with Facebook</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You'll be redirected to Facebook to authorize access to your ad accounts.
                  </p>
                  <Button onClick={handleConnectAccount}>
                    <Facebook className="h-4 w-4 mr-2" />
                    Connect Facebook Account
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Account Name</th>
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Account ID</th>
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Status</th>
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Data Synced Since</th>
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Last Sync</th>
                  <th className="text-left p-3 font-medium text-gray-900 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adAccounts.map((account) => (
                  <tr key={account.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {account.status === "connected" && <CheckCircle className="h-3 w-3 text-green-500" />}
                        {account.status === "error" && <AlertCircle className="h-3 w-3 text-red-500" />}
                        {account.status === "pending" && <AlertCircle className="h-3 w-3 text-yellow-500" />}
                        <span className="font-medium text-gray-900 text-sm">{account.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600 font-mono text-xs">{account.accountId}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          account.status === "connected"
                            ? "default"
                            : account.status === "error"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {account.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-gray-600 text-sm">
                      {account.id === "1" ? "2024-01-10" : account.id === "2" ? "2024-01-12" : "2024-01-14"}
                    </td>
                    <td className="p-3 text-gray-600 text-sm">{account.lastSync}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleTestConnection(account.id)}
                        >
                          Test
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleRemoveAccount(account.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
