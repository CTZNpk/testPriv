"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Facebook,
  Mail,
  MessageSquare,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: any
  status: "connected" | "disconnected" | "error"
  lastSync?: string
  category: string
}

export default function IntegrationsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false)

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "Facebook Ads",
      description: "Connect your Facebook ad accounts to track performance and optimize campaigns",
      icon: Facebook,
      status: "connected",
      lastSync: "2024-01-15 11:00 AM",
      category: "Advertising",
    },
    {
      id: "2",
      name: "Google Analytics",
      description: "Track website traffic and user behavior from your ad campaigns",
      icon: BarChart3,
      status: "connected",
      lastSync: "2024-01-15 10:45 AM",
      category: "Analytics",
    },
    {
      id: "3",
      name: "Mailchimp",
      description: "Sync your email marketing campaigns with ad performance data",
      icon: Mail,
      status: "disconnected",
      category: "Email Marketing",
    },
    {
      id: "4",
      name: "Slack",
      description: "Get real-time notifications about campaign performance in your Slack channels",
      icon: MessageSquare,
      status: "error",
      lastSync: "2024-01-14 3:30 PM",
      category: "Communication",
    },
    {
      id: "5",
      name: "Zapier",
      description: "Automate workflows and connect with 5000+ apps using Zapier integration",
      icon: Zap,
      status: "disconnected",
      category: "Automation",
    },
    {
      id: "6",
      name: "Google Ads",
      description: "Import and analyze your Google Ads campaigns alongside Facebook data",
      icon: BarChart3,
      status: "disconnected",
      category: "Advertising",
    },
    {
      id: "7",
      name: "Notion",
      description: "Sync campaign data and performance reports to your Notion workspace",
      icon: FileText,
      status: "disconnected",
      category: "Productivity",
    },
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration)
    setIsConnectDialogOpen(true)
  }

  const handleConfirmConnection = () => {
    if (selectedIntegration) {
      setIntegrations(
        integrations.map((integration) =>
          integration.id === selectedIntegration.id
            ? { ...integration, status: "connected" as const, lastSync: new Date().toLocaleString() }
            : integration,
        ),
      )
    }
    setIsConnectDialogOpen(false)
    setSelectedIntegration(null)
  }

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === integrationId
          ? { ...integration, status: "disconnected" as const, lastSync: undefined }
          : integration,
      ),
    )
  }

  const handleTestConnection = (integrationId: string) => {
    // Simulate testing connection
    setIntegrations(
      integrations.map((integration) =>
        integration.id === integrationId ? { ...integration, lastSync: new Date().toLocaleString() } : integration,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Disconnected</Badge>
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div>
          <h1 className="text-lg font-semibold">Integrations</h1>
          <p className="text-sm text-muted-foreground">Connect third-party services to enhance your workflow</p>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon
            return (
              <Card key={integration.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">{getStatusIcon(integration.status)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <CardDescription className="text-sm">{integration.description}</CardDescription>

                    <div className="flex items-center justify-between">
                      {getStatusBadge(integration.status)}
                      {integration.lastSync && (
                        <span className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {integration.status === "disconnected" ? (
                        <Button size="sm" className="flex-1" onClick={() => handleConnect(integration)}>
                          Connect
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleTestConnection(integration.id)}>
                            Test
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDisconnect(integration.id)}>
                            Disconnect
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
            <p className="text-gray-500">Try adjusting your search terms to find the integration you're looking for.</p>
          </div>
        )}

        <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect {selectedIntegration?.name}</DialogTitle>
              <DialogDescription>
                You'll be redirected to {selectedIntegration?.name} to authorize the connection.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  {selectedIntegration && (
                    <>
                      <selectedIntegration.icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Authorize Connection</h3>
                      <p className="text-sm text-muted-foreground mb-4">{selectedIntegration.description}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConnectDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmConnection}>Connect {selectedIntegration?.name}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
