import { Formik, Form, type FormikValues } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import TextField from "@/components/partials/formik-fields/text-field";
import { useAuth } from "@/providers/AuthProvider";
import SelectField from "@/components/partials/formik-fields/select-field";
import { Gender } from "@/services/enums";
import { post } from "@/services/http-service";
import { LSService } from "@/services/ls-service";

const RegisterForm = () => {
  const {
    state: { data },
  } = useAuth();

  const validationSchema = Yup.object({});

  const registerMutation = useMutation({
    mutationFn: async (payload: any) =>
      await post("/Account/register", payload),
    onSuccess: (result: any) => {
      toast.success("ثبت نام  با موفقیت انجام شد");
      LSService.setToken(result?.data?.accessToken);
      window.location.href = '/'
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در ثبت نام ");
    },
  });

  const submitHandler = (values: FormikValues) => {
    registerMutation.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      nationalCode: values.nationalCode.toString(),
      phoneNumber: data?.phoneNumber,
      gender: Number(values?.gender),
    });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-sm text-gray-500 flex flex-col items-center">
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
            gender: "0",
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {() => (
            <Form className="space-y-6">
              <>
                <div className="flex gap-2">
                  <div className="space-y-2 w-1/2">
                    <TextField name="firstName" label="نام" />
                  </div>
                  <div className="space-y-2 w-1/2">
                    <TextField name="lastName" label="نام خانوادگی" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="space-y-2 w-1/2">
                    <TextField
                      name="nationalCode"
                      label="کد ملی"
                      type="number"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2 w-1/2">
                    <SelectField name="gender" label="جنسیت" options={Gender} />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  {registerMutation.isPending ? (
                    <Button type="button" className="w-full">
                      <Loader2Icon className="animate-spin" />
                      در حال ثبت نام
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      ثبت نام
                    </Button>
                  )}
                </div>
              </>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
export default RegisterForm;
