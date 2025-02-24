"use client"

import { Calendar, Home, List, PlusCircle, Search, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export function ConferenceSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border px-2 py-4">
        <Link href="/" className="flex items-center gap-2 px-2">
         
          <span className="text-lg font-bold">ConferenceHub</span>
        </Link>
      
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/my-conferences">
                <Calendar className="mr-2 h-4 w-4" />
                My Conferences
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/registered-conferences">
                <List className="mr-2 h-4 w-4" />
                Registered Conferences
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/create-conference">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Conference
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/browse-conferences">
                <Search className="mr-2 h-4 w-4" />
                Browse Conferences
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

