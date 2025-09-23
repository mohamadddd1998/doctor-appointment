"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Plus, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: Home,
  },
  {
    title: "نوبت جدید",
    href: "/admin/new-appointment",
    icon: Plus,
  },
  {
    title: "گزارش نوبت های من",
    href: "/admin/my-appointments",
    icon: Calendar,
  },
];

interface AdminSidebarProps {
  onItemClick?: () => void;
}

export function AdminSidebar({ onItemClick }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-r-gray-200!">
      <div className="flex h-16 items-center border-b border-b-gray-200! px-6">
        <span className="font-semibold text-sidebar-foreground">
          <img src={"/logo.png"} className="w-48" />
        </span>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-end gap-3 text-sidebar-foreground hover:text-primary hover:bg-light-primary",
                    isActive && "bg-light-primary text-primary"
                  )}
                  onClick={onItemClick} // Added click handler for mobile
                >
                  {item.title}
                  <item.icon className="h-4 w-4" />
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
