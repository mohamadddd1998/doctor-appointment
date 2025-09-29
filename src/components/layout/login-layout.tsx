const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4  bg-no-repeat bg-cover">
      {children}
    </div>
  );
};
export default LoginLayout;
