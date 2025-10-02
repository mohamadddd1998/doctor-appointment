import { Formik, Form, type FormikValues } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Captcha from "@/components/partials/captcha";
import { useAuth } from "@/providers/AuthProvider";
import TextField from "@/components/partials/formik-fields/text-field";
import { post } from "@/services/http-service";
import { useCaptcha } from "@/hooks/use-captcha";

const LoginForm = () => {
  const { setStep, setData } = useAuth();
  const { key, ...captcha } = useCaptcha();
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("تلفن همراه را وارد نمایید ")
      .matches(/^09\d{9}$/, "فرمت تلفن همراه اشتباه می‌باشد"),
    captcha: Yup.string().required(" کپچا را وارد نمایید "),
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: any) => await post("/Account/Login", payload),
    onSuccess: () => {
      toast.success(" کد تایید ارسال شد .");
      setStep("otp");
    },
    onError: (error: Error) => {
      captcha.refresh();
      toast.error(error.message || "خطا در  ارسال کد تایید");
    },
  });

  const submitHandler = (values: FormikValues) => {
    loginMutation.mutate(
      {
        phoneNumber: values?.phoneNumber,
        code: values?.captcha,
        key,
      },
      {
        onSuccess: (result) =>
        {
          console.log(result , 'r');
          
            setData({
            phoneNumber: values?.phoneNumber,
            haveRegistered: result?.data?.haveRegistered,
          })
        }
      }
    );
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-sm text-gray-500 flex flex-col items-center">
          <img src={"/logo.png"} className="w-72" />
          ورود به پنل نوبت دهی
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            phoneNumber: "",
            captcha: "",
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {() => (
            <Form className="space-y-6">
              <TextField name="phoneNumber" label="تلفن همراه" dir="ltr" />
              <Captcha {...captcha} />
              {loginMutation.isPending ? (
                <Button type="button" className="w-full">
                  <Loader2Icon className="animate-spin" />
                  در حال ارسال ...
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  ارسال کد تایید
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
export default LoginForm;
