import type { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";

const AuthRoutesProvider = ({ children }: { children: ReactNode }) => {
  const {
    state: { isLogin },
  } = useAuth();
  const location = useLocation(); // دریافت موقعیت فعلی
  const from = location.state?.from || "/"; // آدرس قبلی یا ریشه

  // اگر کاربر وارد شده باشد، به آدرس قبلی هدایت می‌شود، در غیر این صورت children نمایش داده می‌شود
  return isLogin ? <Navigate to={from} /> : <>{children}</>;
};

export default AuthRoutesProvider;
