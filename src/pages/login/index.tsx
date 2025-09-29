import { useAuth } from "@/providers/AuthProvider";
import LoginForm from "./_components/LoginForm";

const Login = () => {
  const {
    state: { step },
  } = useAuth();

  const renderForm = () => {
    switch (step) {
      case "login":
        return <LoginForm />;
      case "otp":
        return <h1>otp</h1>;
      case "register":
        return <h1>register</h1>;
      default:
        return null;
    }
  };
  return <>{renderForm()}</>;
};
export default Login;
