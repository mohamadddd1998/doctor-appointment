import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import MainHeader from "./main-header";
import MainSidebar from "./main-sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-background">
      <div className="hidden lg:flex">
        <MainSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          className="lg:hidden flex items-center justify-between
         h-16 px-4 border-b border-sidebar-border bg-sidebar"
        >
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
              <MainSidebar onItemClick={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:block">
          <MainHeader />
        </div>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
export default MainLayout;
