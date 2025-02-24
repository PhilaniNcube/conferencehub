import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type React from "react"
import { ConferenceSidebar } from "./_components/conference-sidebar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <ConferenceSidebar />
        <div className="flex-1 w-full ">
          <main className="p-6 w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

