"use client";

import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Captcha from "./partials/captcha";
import { authApi } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import TextInputField from "./partials/text-input-field";
import ErrorMessage from "./partials/error-message";

export function LoginForm() {
  const { isLoading } = useAuth();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const router = useRouter();

  const phoneValidationSchema = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شده و 11 رقم باشد")
      .required("شماره تلفن الزامی است"),
  });

  const otpValidationSchema = Yup.object({
    otp: Yup.string()
      .length(4, "کد تایید باید 4 رقم باشد")
      .matches(/^\d{4}$/, "کد تایید باید فقط شامل اعداد باشد")
      .required("کد تایید الزامی است"),
  });

  const sendotpMutation = useMutation({
    mutationFn: authApi.sendOtp,
    onSuccess: () => {
      toast.success("ورود با موفقیت انجام شد");
      router.push("/admin");
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در ورود ");
    },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      toast.success(" کد تایید ارسال شد .");
      setStep("otp");
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در  ارسال کد تایید");
    },
  });

  const submitHandler = (values: FormikValues) => {
    if (step === "mobile") {
      loginMutation.mutate({
        mobileNumber: values?.mobileNumber,
        captcha: values?.captcha,
      });
    }
    if (step === "otp") {
      sendotpMutation.mutate({
        phoneNumber: values?.mobileNumber,
        otp: values?.otp,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-sm text-gray-500 flex flex-col items-center">
            <img src={"/logo.png"} className="w-72" />
            ورود به پنل نوبت دهی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              mobileNumber: "",
              otp: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={() =>
              step === "mobile" ? phoneValidationSchema : otpValidationSchema
            }
            onSubmit={submitHandler}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="space-y-6">
                {step === "mobile" && (
                  <>
                    <div className="space-y-2">
                      <TextInputField
                        name="mobileNumber"
                        label="شماره تلفن"
                        type="number"
                        dir="ltr"
                        maxLength={11}
                      />
                    </div>
                    <div className="space-y-2">
                      <Field name="captcha">
                        {({ field }: any) => <Captcha field={field} />}
                      </Field>
                      <ErrorMessage name="captcha" />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          "در حال ارسال..."
                        ) : (
                          <>
                            ارسال کد تایید
                            <ArrowLeft className="mr-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      <p className="text-xs">
                        ثبت نام نکرده ام ؟{" "}
                        <Link
                          href={"/register"}
                          className="font-bold text-primary"
                        >
                          ثبت نام
                        </Link>
                      </p>
                    </div>
                  </>
                )}

                {step === "otp" && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={4}
                          value={values.otp}
                          onChange={(value) => setFieldValue("otp", value)}
                        >
                          <InputOTPGroup className="flex-row-reverse">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        کد تایید به شماره {values.mobileNumber} ارسال شد.
                      </p>
                      <ErrorMessage name="otp" />
                    </div>
                    <div className="space-y-2">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "در حال تایید..." : "تایید و ورود"}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full border-none"
                        onClick={() => {
                          setStep("otp");
                          setFieldValue("otp", "");
                        }}
                        disabled={isLoading}
                      >
                        بازگشت به مرحله قبل
                        <ArrowLeft className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
