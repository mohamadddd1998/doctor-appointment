"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/lib/auth";
import { AlertCircle, ArrowLeft, ClipboardCheck, RefreshCcw } from "lucide-react";
import { useState } from "react";

const phoneSchema = Yup.object({
  phone: Yup.string()
    .matches(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شده و 11 رقم باشد")
    .required("شماره تلفن الزامی است"),
});

const otpSchema = Yup.object({
  otp: Yup.string()
    .length(4, "کد تایید باید 4 رقم باشد")
    .matches(/^\d{4}$/, "کد تایید باید فقط شامل اعداد باشد")
    .required("کد تایید الزامی است"),
});

export function LoginForm() {
  const { sendOTP, verifyOTP, isLoading } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-xl flex flex-col items-center gap-4">
            <ClipboardCheck size={48} className="text-primary" />
      
            ورود به پنل نوبت دهی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              phone: "",
              otp: "",
              error: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={() =>
              step === "phone" ? phoneSchema : otpSchema
            }
            onSubmit={async (values, { setFieldValue, setFieldError }) => {
              if (step === "phone") {
                const success = await sendOTP(values.phone);
                if (success) {
                  setStep("otp");
                  setFieldValue("error", "");
                } else {
                  setFieldError("phone", "شماره تلفن نامعتبر است");
                }
              } else {
                const success = await verifyOTP(values.phone, values.otp);
                if (success) {
                  router.push("/admin");
                } else {
                  setFieldError("otp", "کد تایید اشتباه است");
                }
              }
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="space-y-4">
                {step === "phone" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">شماره تلفن : </Label>
                      <Field name="phone">
                        {({ field }: any) => (
                          <Input
                            {...field}
                            id="phone"
                            type="tel"
                            dir="ltr"
                            maxLength={11}
                          />
                        )}
                      </Field>
                      {errors.phone && touched.phone && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Field name="captcha">
                        {({ field }: any) => (
                          <div className="relative flex items-center gap-2">
                            <Input
                              {...field}
                              id="phone"
                              type="tel"
                              dir="ltr"
                              maxLength={11}
                              className=" flex-1 placeholder:text-[10px] placeholder:text-right"
                              placeholder="حاصل جمع اعداد را وارد نمایید"
                            />
                            <div className=" top-0 left-0 h-9 flex gap-2 items-center shrink-0">
                              <img src="/captcha.PNG" className="h-full" />
                               <RefreshCcw size={20} className="text-primary cursor-pointer" />
                            </div>
                          </div>
                        )}
                      </Field>

                      {errors.phone && touched.phone && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "در حال ارسال..."
                      ) : (
                        <>
                          ارسال کد تایید
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
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
                        کد تایید به شماره {values.phone} ارسال شد.
                      </p>
                      {errors.otp && touched.otp && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.otp}
                        </div>
                      )}
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
                          setStep("phone");
                          setFieldValue("otp", "");
                          setFieldValue("error", "");
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
