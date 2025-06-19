"use client"

import type React from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Users,
  Zap,
  LogOut,
  Video,
  ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const workspaces = [
  {
    id: "1",
    name: "MindfulAI Marketing",
    industry: "Technology",
  },
  {
    id: "2",
    name: "Digital Agency Pro",
    industry: "Marketing",
  },
]

interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
  expanded?: boolean
  hasChildren?: boolean
  onClick?: () => void
  isOpen?: boolean
  onToggle?: () => void
}

const NavItem = ({
  icon: Icon,
  label,
  href,
  active,
  expanded,
  hasChildren,
  onClick,
  isOpen,
  onToggle,
}: NavItemProps) => {
  if (hasChildren) {
    return (
      <Collapsible open={isOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full text-left",
              active
                ? "bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))] font-medium"
                : "text-gray-600 hover:bg-[hsl(var(--accent-10))] hover:text-[hsl(var(--primary))]",
            )}
            onClick={() => {
              onClick?.()
              onToggle?.()
            }}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1">{label}</span>
            {hasChildren &&
              (isOpen ? (
                <ChevronDown className="ml-auto h-4 w-4 transition-transform" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4 transition-transform" />
              ))}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-0 pl-6 pr-2 pb-1">
          <Link
            href={`${href}/video`}
            className="flex items-center gap-3 rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-[hsl(var(--accent-10))] hover:text-[hsl(var(--primary))] transition-colors"
          >
            <Video className="h-3 w-3" />
            <span>Video Ads</span>
          </Link>
          <Link
            href={`${href}/static`}
            className="flex items-center gap-3 rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-[hsl(var(--accent-10))] hover:text-[hsl(var(--primary))] transition-colors"
          >
            <ImageIcon className="h-3 w-3" />
            <span>Static Ads</span>
          </Link>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <button
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full text-left",
        active
          ? "bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))] font-medium"
          : "text-gray-600 hover:bg-[hsl(var(--accent-10))] hover:text-[hsl(var(--primary))]",
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [currentWorkspace, setCurrentWorkspace] = useState("MindfulAI Marketing")

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <div className="fixed left-4 top-4 bottom-4 w-64 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <div className="text-sm text-gray-500 mb-1">MindfulAI</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors">
              <div className="font-bold text-gray-900">{currentWorkspace}</div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => setCurrentWorkspace(workspace.name)}
                className="cursor-pointer"
              >
                <div>
                  <div className="font-medium">{workspace.name}</div>
                  <div className="text-sm text-gray-500">{workspace.industry}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full text-left",
              pathname === "/"
                ? "bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))] font-medium"
                : "text-gray-600 hover:bg-[hsl(var(--accent-10))] hover:text-[hsl(var(--primary))]",
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="mt-2">
          <div className="px-3 pt-2 pb-0 text-xs font-medium text-gray-500 uppercase tracking-wider">Navigation</div>
          <div className="space-y-0 p-2">
            <NavItem
              icon={Users}
              label="Ad Account 1"
              href="/account/1"
              hasChildren
              isOpen={openItems.includes("account-1")}
              onToggle={() => toggleItem("account-1")}
            />
            <NavItem
              icon={Users}
              label="Ad Account 2"
              href="/account/2"
              hasChildren
              isOpen={openItems.includes("account-2")}
              onToggle={() => toggleItem("account-2")}
            />
            <NavItem
              icon={Users}
              label="Ad Account 3"
              href="/account/3"
              hasChildren
              isOpen={openItems.includes("account-3")}
              onToggle={() => toggleItem("account-3")}
            />
            <NavItem
              icon={Users}
              label="Ad Account 4"
              href="/account/4"
              hasChildren
              isOpen={openItems.includes("account-4")}
              onToggle={() => toggleItem("account-4")}
            />
            <NavItem
              icon={Users}
              label="Ad Account 5"
              href="/account/5"
              hasChildren
              isOpen={openItems.includes("account-5")}
              onToggle={() => toggleItem("account-5")}
            />
          </div>
        </div>

        <div className="mt-2">
          <div className="px-3 pt-2 pb-0 text-xs font-medium text-gray-500 uppercase tracking-wider">Tools</div>
          <div className="space-y-0 p-2">
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full text-left",
                pathname === "/admin"
                  ? "bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))] font-medium"
                  : "text-gray-600 hover:bg-[hsl(var(--accent-10))] hover:text-[hsl(var(--primary))]",
              )}
            >
              <Users className="h-4 w-4" />
              <span>Admin</span>
            </Link>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full text-left",
                pathname === "/settings"
                  ? "bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))] font-medium"
                  : "text-gray-600 hover:bg-[hsl(var(--accent-10))] hover:text-[hsl(var(--primary))]",
              )}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <Link
              href="/integrations"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full text-left",
                pathname === "/integrations"
                  ? "bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))] font-medium"
                  : "text-gray-600 hover:bg-[hsl(var(--accent-10))] hover:text-[hsl(var(--primary))]",
              )}
            >
              <Zap className="h-4 w-4" />
              <span>Integrations</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]"></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <Link href="/auth/signin" className="p-1 rounded-md hover:bg-[hsl(var(--accent-10))] transition-colors">
            <LogOut className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          </Link>
        </div>
      </div>
    </div>
  )
}
