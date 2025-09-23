"use client";

import type React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";

import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-background">
      <div className="hidden lg:flex">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center justify-between
         h-16 px-4 border-b border-sidebar-border bg-sidebar">
          <img src={"/logo.png"} className="w-48" />

          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <AdminSidebar onItemClick={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:block">
          <AdminHeader />
        </div>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
