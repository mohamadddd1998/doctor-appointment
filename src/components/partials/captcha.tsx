import { AlertCircle, RefreshCcw } from "lucide-react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { ErrorMessage, Field } from "formik";
import type { QueryObserverResult } from "@tanstack/react-query";

type Captcha = {
  key: string;
  imageUrl: string;
};

interface CaptchaProps {
  captcha: Captcha | null;
  refresh: () => Promise<QueryObserverResult<Captcha | null, Error>>;
  isFetching: boolean;
  isLoading: boolean;
  key: string | null;
}

const Captcha = (props: CaptchaProps) => {
  const { captcha, refresh, isFetching, isLoading } = props;
  return (
    <Field name="captcha">
      {({ field }: any) => (
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
      )}
    </Field>
  );
};

export default Captcha;
