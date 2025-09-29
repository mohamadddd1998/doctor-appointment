import { AlertCircle, RefreshCcw } from "lucide-react";
import { Input } from "../ui/input";
import { useCaptcha } from "@/hooks/use-captcha";
import { Skeleton } from "../ui/skeleton";
import { ErrorMessage, useFormikContext, type FieldInputProps } from "formik";
import { useEffect } from "react";

interface CaptchaProps {
  field: FieldInputProps<string>;
}

const Captcha = ({ field }: CaptchaProps) => {
  const { captcha, refresh, isFetching, isLoading, key } = useCaptcha();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (key) {
      setFieldValue("key", key);
    }
  }, [key]);

  return (
    <div className="flex flex-col gap-2 relative">
      <Input
        {...field}
        id={field.name}
        className="placeholder:text-[10px] placeholder:text-right"
        placeholder="عبارت مقابل را وارد نمایید"
      />
      <div className="absolute top-2 left-0 h-9 flex gap-2 py-1 px-2 items-center">
        {isFetching || isLoading ? (
          <Skeleton className="h-full w-28" />
        ) : (
          <img
            src={captcha?.imageUrl}
            alt="captcha"
            className="h-full w-28 rounded-md"
          />
        )}
        <RefreshCcw
          size={18}
          className="text-primary cursor-pointer"
          onClick={refresh}
        />
      </div>

      <ErrorMessage name="captcha">
        {(msg) => (
          <div className="text-[10px] text-red-500 flex gap-2 items-center">
            <AlertCircle size={12} />
            <span>{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default Captcha;
