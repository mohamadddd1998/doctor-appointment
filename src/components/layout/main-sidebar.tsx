import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Plus, Calendar, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";

// تعریف منو با زیرمنوهای تو در تو
const sidebarItems = [
  {
    title: "داشبورد",
    href: "/",
    icon: Home,
  },
  {
    title: "مدیریت نوبت‌ها",
    icon: Calendar,
    children: [
      {
        title: "نوبت جدید",
        href: "/new-appointment",
        icon: Plus,
      },
      {
        title: "گزارش نوبت‌های من",
        href: "/my-appointments",
        icon: Calendar,
      },
      {
        title: "گزارشات",
        icon: Calendar,
        children: [
          {
            title: "گزارش روزانه",
            href: "/reports/daily",
            icon: Calendar,
          },
          {
            title: "گزارش ماهانه",
            href: "/reports/monthly",
            icon: Calendar,
          },
        ],
      },
    ],
  },
];

interface SidebarItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  children?: SidebarItem[];
}

interface SidebarItemProps {
  item: SidebarItem;
  depth?: number;
  onItemClick?: () => void;
}

const SidebarItemComponent = ({
  item,
  depth = 0,
  onItemClick,
}: SidebarItemProps) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = item.href && pathname === item.href;

  if (item.children) {
    return (
      <div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between text-sidebar-foreground hover:text-sidebar-foreground",
            depth > 0 && "pl-6"
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-4 w-4" />
            <span className="font-medium">{item.title}</span>
          </div>
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <div
          className={cn(
            "ml-4 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out",
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {item.children.map((child) => (
            <SidebarItemComponent
              key={child.title}
              item={child}
              depth={depth + 1}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link to={item.href || "#"}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 text-sidebar-foreground hover:text-sidebar-foreground",
          depth > 0 && "pl-6",
          isActive &&
            "bg-sidebar-accent text-sidebar-foreground border border-sidebar-border/50"
        )}
        onClick={onItemClick}
      >
        <item.icon className="h-4 w-4" />
        <span className="font-medium">{item.title}</span>
      </Button>
    </Link>
  );
};

interface AdminSidebarProps {
  onItemClick?: () => void;
}

const MainSidebar = ({ onItemClick }: AdminSidebarProps) => {
  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6 bg-sidebar">
        <div className="flex items-center gap-3">
          <img src="/logo.png" />
        </div>
      </div>

      {/* Items */}
      <ScrollArea className="flex-1 px-3 py-4" dir="rtl">
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <SidebarItemComponent
              key={item.title}
              item={item}
              onItemClick={onItemClick}
            />
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default MainSidebar;
