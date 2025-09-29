import { createRoot } from "react-dom/client";
import { router } from "./routes/index.tsx";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import BaseProvider from "./providers/BaseProviders.tsx";

createRoot(document.getElementById("root")!).render(
  <BaseProvider>
    <RouterProvider router={router} />
  </BaseProvider>
);
