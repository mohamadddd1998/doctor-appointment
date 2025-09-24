import { useFormikContext } from "formik";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ name }: { name: string }) => {
  const { errors, touched } = useFormikContext<any>();
  return (
    <>
      {errors[name] && touched[name] && (
        <div className="flex items-center gap-2 text-destructive text-[10px]">
          <AlertCircle className="h-3 w-3" />
          {errors[name] as string}
        </div>
      )}
    </>
  );
};
export default ErrorMessage;
