import Loading from "@/components/partials/loading";
import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";

const LayoutRoutesProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation(); // دریافت موقعیت فعلی

  const {
    userInfoLoading,
    state: { isLogin },
  } = useAuth();

  // تابع برای رندر کردن  لودینگ
  const renderLoading = () => (
    <div className="flex justify-center items-center h-screen">
      <Loading text="در حال دریافت اطلاعات کاربر" />
    </div>
  );
  
  // اگر کاربر وارد نشده باشد، به صفحه ورود هدایت می‌شود
  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // اگر اطلاعات کاربر در حال بارگذاری باشد، کامپوننت بارگذاری نمایش داده می‌شود
  if (userInfoLoading) {
    return renderLoading();
  }

  // در غیر این صورت، children نمایش داده می‌شود
  return <>{children}</>;
};

export default LayoutRoutesProvider;
