import { useAuth } from "@/providers/AuthProvider";
import LoginForm from "./_components/LoginForm";
import OtpForm from "./_components/OtpForm";
import RegisterForm from "./_components/RegisterForm";

const Login = () => {
  const {
    state: { step },
  } = useAuth();

  const renderForm = () => {
    switch (step) {
      case "login":
        return <LoginForm />;
      case "otp":
        return <OtpForm />;
      case "register":
        return <RegisterForm />;
      default:
        return null;
    }
  };
  return <>{renderForm()}</>;
};
export default Login;
