import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Plus, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router";

const sidebarItems = [
  {
    title: "داشبورد",
    href: "/",
    icon: Home,
  },
  {
    title: "نوبت جدید",
    href: "/new-appointment",
    icon: Plus,
  },
  {
    title: "گزارش نوبت های من",
    href: "/my-appointments",
    icon: Calendar,
  },
];

interface AdminSidebarProps {
  onItemClick?: () => void;
}

const MainSidebar = ({ onItemClick }: AdminSidebarProps) => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6 bg-sidebar">
        <div className="flex items-center gap-3">
          <img src="/logo.png" />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4" dir="rtl">
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:text-sidebar-foreground admin-sidebar-item",
                    isActive &&
                      "bg-sidebar-accent text-sidebar-foreground  border border-sidebar-border/50"
                  )}
                  onClick={onItemClick}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.title}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};
export default MainSidebar;
