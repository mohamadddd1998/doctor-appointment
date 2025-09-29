import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import ErrorPage from "@/pages/ErrorPage";
import LoginLayout from "@/components/layout/login-layout";
import { createBrowserRouter, Outlet } from "react-router";
import MainLayout from "@/components/layout/main-layout";
import Login from "@/pages/login";
import Loading from "@/components/partials/loading";
import AuthProvider from "@/providers/AuthProvider";

const Home = lazy(() => import("@/pages/home"));

export const router = createBrowserRouter([
  {
    path: "*",
    handle: { title: "404" },
    element: (
      <Suspense fallback={<Loading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    errorElement: <ErrorPage />,
    element: (
      <AuthProvider>
        <LoginLayout>
          <Outlet />
        </LoginLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: "login",
        handle: { title: "ورود / ثبت نام" },
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
  {
    errorElement: <ErrorPage />,
    element: (
      <AuthProvider isPrivateRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        handle: {
          title: "صفحه اصلی",
        },
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
]);
