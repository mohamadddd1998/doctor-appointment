import { Button } from "@/components/ui/button";
import { useAuth, useLogout } from "@/providers/AuthProvider";
import { LogOut } from "lucide-react";

const MainHeader = () => {
  const {
    state: { userInfo },
  } = useAuth();
  const { handleLogout, logoutLoading } = useLogout();
  return (
    <header className="h-16 border-b-1 border-b-gray-200! bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">پنل نوبت دهی</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button className="relative rounded-md">
            {userInfo?.firstName + " " + userInfo?.lastName}
          </Button>
          {logoutLoading ? (
            <Button
              variant={"destructive"}
              className="rounded-md text-white"
            >
              <span>در حال خروج ...</span>
              <LogOut className="mr-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant={"destructive"}
              className="rounded-md text-white"
              onClick={handleLogout}
            >
              <span>خروج</span>
              <LogOut className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default MainHeader;
