"use client";

import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import Captcha from "./partials/captcha";
import { toast } from "sonner";
import TextInputField from "./partials/text-input-field";
import ErrorMessage from "./partials/error-message";
import { useMutation } from "@tanstack/react-query";
import { httpService } from "@/lib/http-service";

export function RegisterForm() {
  const { isLoading } = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شده و 11 رقم باشد")
      .required("شماره تلفن الزامی است"),
    firstName: Yup.string().required(" نام الزامی است"),
    lastName: Yup.string().required(" نام خانوادگی الزامی است"),
    nationalCode: Yup.string()
      .required("لطفا کدملی را وارد نمایید")
      .min(10, "کد ملی باید 10 رقم باشد"),
    password: Yup.string()
      .required("رمز عبور را وارد نمایید")
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
      .matches(/[a-z]+/, "رمز عبور باید شامل حداقل  یک حرف کوچک انگلیسی باشد.")
      .matches(/[A-Z]+/, "رمز عبور باید شامل حداقل  یک حرف بزرگ انگلیسی باشد.")
      .matches(
        /[@$!%*#?&]+/,
        "رمز عبور باید شامل حداقل یک کاراکتر خاص (@ یا $ یا ! یا % یا * یا # یا ? یا &) باشد."
      )
      .matches(/\d+/, "رمز عبور باید حداقل شامل یک عدد باشد."),
    captcha: Yup.string().required(" کپچا الزامی است"),
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await httpService({
        url: "/Account/Register",
        method: "POST",
        payload,
      });
    },
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در ثبت نام");
    },
  });

  const submitHandler = async (values: FormikValues) => {
    const payload = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      nationalCode: values?.nationalCode?.toString(),
      mobileNumber: "0" + values?.mobileNumber?.toString(),
      gender: Number(values?.gender),
      captcha: values?.captcha,
    };
    registerMutation.mutate(payload);
  };

  // const submitHandler = async (values: FormikValues) => {
  //   console.log(values, "values");

  //   const payload = {
  //     firstName: values?.firstName,
  //     lastName: values?.lastName,
  //     nationalCode: values?.nationalCode?.toString(),
  //     mobileNumber: "0" + values?.mobileNumber?.toString(),
  //     gender: Number(values?.gender),
  //     captcha: values?.captcha,
  //   };
  //   try {
  //     const result = (await register(payload)) as any;
  //     if (result?.success) {
  //       toast.success("ثبت نام با موفقیت انجام شد");
  //       router.push("/login");
  //       return;
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-gray-500 text-sm flex flex-col items-center">
            <img src={"/logo.png"} className="w-72" />
            ثبت نام در پنل نوبت دهی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              nationalCode: "",
              mobileNumber: "",
              gender: "1",
              captcha: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="flex gap-2">
                  <div className="space-y-2 w-1/2">
                    <TextInputField name="firstName" label="نام" />
                  </div>
                  <div className="space-y-2 w-1/2">
                    <TextInputField name="lastName" label="نام خانوادگی" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="space-y-2 w-1/2">
                    <TextInputField
                      name="nationalCode"
                      label="کد ملی"
                      type="number"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2 w-1/2">
                    <TextInputField
                      name="mobileNumber"
                      label="شماره تلفن"
                      type="number"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender"> جنسیت </Label>
                  <Select
                    value={values.gender}
                    onValueChange={(value) => setFieldValue("gender", value)}
                    dir="rtl"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { value: "0", label: "مرد" },
                        { value: "1", label: "زن" },
                      ].map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="gender" />
                </div>
                <div className="space-y-2">
                  <Field name="captcha">
                    {({ field }: any) => <Captcha field={field} />}
                  </Field>
                  <ErrorMessage name="captcha" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      "در حال ثبت نام..."
                    ) : (
                      <>
                        ثبت نام
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs">
                    قبلا ثبت نام کرده ام ؟{" "}
                    <Link href={"/login"} className="font-bold text-primary">
                      ورود
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
