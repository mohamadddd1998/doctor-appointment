import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface StateManagementProviderProps {
  children: React.ReactNode;
}

/** Provider of state manager library that used inside project */
const StateManagementProvider = (props: StateManagementProviderProps) => {
  const { children } = props;

  // React Query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // جلوگیری از refetch خودکار هنگام فوکوس پنجره
        staleTime: 0, // زمان منسوخ شدن داده‌ها (صفر به معنای منسوخ شدن فوری)
        refetchOnMount: true, // refetch هنگام mount شدن کامپوننت
        refetchOnReconnect: true, // refetch هنگام اتصال مجدد به اینترنت
        retry: 0, // غیرفعال کردن تلاش مجدد خودکار در صورت خطا
      },
    },
  });
  // throw new Error("Test Error");
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default StateManagementProvider;
