import { RefreshCcw } from "lucide-react";
import { Input } from "../ui/input";
import { useCaptcha } from "@/hooks/use-captcha";

const Captcha = ({ field }: { field: any }) => {
  const { captcha, refresh } = useCaptcha();

  return (
    <div className="relative  flex items-center gap-2">
      <Input
        {...field}
        id="phone"
        className=" flex-1 placeholder:text-[10px] placeholder:text-right"
        placeholder="حاصل جمع اعداد را وارد نمایید"
      />
      <div className=" top-0 left-0 h-9 flex gap-2 py-1 px-2 items-center absolute">
        <img
          src={captcha?.imageUrl}
          className="h-full w-28  rounded-md"
        />
        <RefreshCcw
          size={18}
          className="text-primary cursor-pointer"
          onClick={refresh}
        />
      </div>
    </div>
  );
};
export default Captcha;
