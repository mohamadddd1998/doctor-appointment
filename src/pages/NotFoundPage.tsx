import { ArrowLeft, MessageSquareMore } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="font-shabnam flex flex-col items-center justify-center gap-8 max-w-md">
        <div
          className="bg-primary shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] animate-bounce text-white hover:bg-primary-600
       flex flex-row gap-6 items-center justify-center rounded-xl p-6"
        >
          <p className="text-8xl font-bold pt-6">
            404 <span className="opacity-30">|</span>
          </p>
          <MessageSquareMore size={120} />
        </div>
        <div className="flex flex-col gap-6 text-center items-center">
          <p className="font-bold text-4xl bg-gradient-to-l from-secondary-500 to-gray-600 bg-clip-text text-transparent">
            صفحه‌ی مورد نظر یافت نشد!
          </p>
          <p className="text-xs px-2">
            صفحه‌ای با این نشانی وجود ندارد یا اجازه دسترسی به این صفحه را
            ندارید!
          </p>
          <Link
            to="/"
            className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-md"
          >
            <span className="flex flex-row justify-center items-center gap-2">
              <ArrowLeft />
              <p>بازگشت</p>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
