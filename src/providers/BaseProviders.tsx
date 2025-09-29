import { Slide, ToastContainer } from "react-toastify";
import ErrorBoundryProvider from "./ErrorBoundryProvider";
import StateManagementProvider from "./StateManagementProvider";

const BaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundryProvider>
      <StateManagementProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
          transition={Slide}
          limit={2}
        />
        {children}
      </StateManagementProvider>
    </ErrorBoundryProvider>
  );
};

export default BaseProvider;
