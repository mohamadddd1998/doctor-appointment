const Loading = ({ text }: { text?: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      <p className="mt-2 text-muted-foreground">
        {text || "در حال بارگذاری..."}
      </p>
    </div>
  </div>
);
export default Loading;
