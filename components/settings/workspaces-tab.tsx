"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
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
import { Building2, Plus, Globe, Users } from "lucide-react"

interface Workspace {
  id: string
  name: string
  website: string
  industry: string
  members: number
  createdBy: string
  createdDate: string
  color: string
}

export function WorkspacesTab() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: "1",
      name: "MindfulAI Marketing",
      website: "https://mindfulai.com",
      industry: "Technology",
      members: 12,
      createdBy: "John Doe",
      createdDate: "2024-01-01",
      color: "bg-blue-500",
    },
    {
      id: "2",
      name: "Digital Agency Pro",
      website: "https://digitalagency.com",
      industry: "Marketing",
      members: 8,
      createdBy: "Sarah Wilson",
      createdDate: "2024-01-15",
      color: "bg-purple-500",
    },
  ])

  const [isAddWorkspaceOpen, setIsAddWorkspaceOpen] = useState(false)
  const [newWorkspace, setNewWorkspace] = useState({
    name: "",
    website: "",
    industry: "",
  })

  const industries = [
    "Technology",
    "Marketing",
    "E-commerce",
    "Healthcare",
    "Finance",
    "Education",
    "Real Estate",
    "Food & Beverage",
    "Fashion",
    "Travel",
    "Entertainment",
    "Other",
  ]

  const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-pink-500"]

  const handleAddWorkspace = () => {
    const workspace: Workspace = {
      id: Date.now().toString(),
      name: newWorkspace.name,
      website: newWorkspace.website,
      industry: newWorkspace.industry,
      members: 1,
      createdBy: "John Doe",
      createdDate: new Date().toISOString().split("T")[0],
      color: colors[Math.floor(Math.random() * colors.length)],
    }
    setWorkspaces([...workspaces, workspace])
    setNewWorkspace({ name: "", website: "", industry: "" })
    setIsAddWorkspaceOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workspaces</h2>
          <p className="text-muted-foreground">Manage your teams and agencies</p>
        </div>
        <Dialog open={isAddWorkspaceOpen} onOpenChange={setIsAddWorkspaceOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
              <DialogDescription>Create a new workspace for your team or agency.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input
                  id="workspace-name"
                  value={newWorkspace.name}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                  placeholder="Enter workspace name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={newWorkspace.website}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={newWorkspace.industry}
                  onValueChange={(value) => setNewWorkspace({ ...newWorkspace, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddWorkspaceOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddWorkspace}>Create Workspace</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {workspaces.map((workspace) => (
          <Card key={workspace.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${workspace.color} rounded-lg flex items-center justify-center`}>
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{workspace.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="h-3 w-3" />
                    <span>{workspace.website}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      {workspace.industry}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="h-3 w-3" />
                      <span>{workspace.members} members</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>Created by {workspace.createdBy}</div>
                <div>{workspace.createdDate}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
