import ErrorPage from "@/pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

function FallbackComponent() {
  return <ErrorPage />;
}

const ErrorBoundryProvider = ({ children }: any) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundryProvider;
