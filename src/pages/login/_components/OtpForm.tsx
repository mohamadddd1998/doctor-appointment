import {
  Formik,
  Form,
  type FormikValues,
  ErrorMessage,
  type FormikProps,
} from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCountdown } from "@/hooks/use-countdown";
import { useAuth } from "@/providers/AuthProvider";
import { LSService } from "@/services/ls-service";
import { post } from "@/services/http-service";

const OtpForm = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const {
    setIsLogin,
    setStep,
    state: { data },
  } = useAuth();
  const [counter, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 240,
    intervalMs: 100,
    countStop: 0,
    isIncrement: false,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "کد تایید باید 6 رقم باشد")
      .matches(/^\d{6}$/, "کد تایید باید فقط شامل اعداد باشد")
      .required("کد تایید الزامی است"),
  });

  const confirmOtpMutation = useMutation({
    mutationFn: async (payload: any) =>
      await post("/Account/ConfirmOtp", payload),
    onSuccess: (result) => {
      const _result = result?.data;
      if (data?.haveRegistered) {
        if (_result.accessToken) {
          window.location.href = '/'
          LSService.setToken(_result?.accessToken);
          toast.success("ورود با موفقیت انجام شد");
        } else {
          toast.error("مشکلی به وجود آمده است");
          formikRef?.current?.setFieldValue("otp", "");
        }
      } else {
        toast.success("تلفن همراه شما با موفقیت احراز شد");
        setStep("register");
      }
    },
    onError: (error: Error) => {
      formikRef?.current?.setFieldValue("otp", "");
      toast.error(error.message || "مشکلی به وجود آمده است");
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async (payload: any) =>
      await post("/Account/GenerateOtp", payload),
    onSuccess: () => {
      resetCountdown();
      startCountdown();
      toast.success(`کد تایید به تلفن همراه شما ارسال شد.`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در ارسال پیامک ");
    },
  });

  const resendOtpHandler = () => {
    resendOtpMutation.mutate({
      phoneNumber: data?.phoneNumber,
      haveRegistered: data?.haveRegistered,
    });
  };

  const backToPrevStepHandler = () => {
    setStep("login");
    formikRef?.current?.setFieldValue("otp", "");
  };

  const submitHandler = (values: FormikValues) => {
    confirmOtpMutation.mutate({
      phoneNumber: data?.phoneNumber,
      otp: values?.otp,
      haveRegistered: data?.haveRegistered,
    });
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
            otp: "",
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={values.otp}
                    onChange={(value) => setFieldValue("otp", value)}
                  >
                    <InputOTPGroup className="flex-row-reverse">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  کد تایید به شماره {data?.mobileNumber} ارسال شد.
                </p>
                <ErrorMessage name="otp" />
              </div>
              {counter !== 0 && (
                <div className="flex gap-4 justify-center text-sm">
                  <span className="text-gray-400">زمان باقی مانده:</span>
                  <span className="[word-spacing: 30px] font-bold text-primary">
                    {new Date(counter * 1000).toISOString().slice(14, 19)}
                  </span>
                </div>
              )}
              <div className="space-y-2">
                {counter !== 0 && (
                  <>
                    {confirmOtpMutation.isPending ? (
                      <Button type="button" className="w-full">
                        <Loader2Icon className="animate-spin" />
                        در حال تایید ...
                      </Button>
                    ) : (
                      <Button type="submit" className="w-full">
                        تایید و ورود
                      </Button>
                    )}
                  </>
                )}
                {counter === 0 && (
                  <>
                    {resendOtpMutation.isPending ? (
                      <Button type="button" className="w-full">
                        <Loader2Icon className="animate-spin" />
                        در حال ارسال ...
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={resendOtpHandler}
                        className="w-full"
                      >
                        ارسال مجدد
                      </Button>
                    )}
                  </>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={backToPrevStepHandler}
                >
                  بازگشت به مرحله قبل
                  <ArrowLeft className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
export default OtpForm;
