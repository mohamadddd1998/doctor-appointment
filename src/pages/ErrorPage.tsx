import { ShieldAlert } from "lucide-react";
import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="font-yekanBakh flex flex-col items-center justify-center gap-8 max-w-md">
        <div className="bg-primary-500  animate-bounce text-white hover:bg-primary-600 flex flex-row gap-6 items-center justify-center rounded-xl px-12">
          {<ShieldAlert size={150} />}
          <p className="text-8xl font-bold pt-6">خطا</p>
        </div>
        <div className="flex flex-col gap-6 text-center items-center">
          <p className="font-bold text-3xl">{"اشکالی پیش آمده است!"}</p>
          <p className="text-sm px-2">
            {
              "ضمن عرض پوزش، گزارش وقوع این خطا، به واحد فنی ارسال گردیده و مشکل بزودی برطرف خواهد شد. لطفا مجددا تلاش فرمایید."
            }
          </p>
        </div>
        <Link
          to="/"
          className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-md"
        >
          بازگشت
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
