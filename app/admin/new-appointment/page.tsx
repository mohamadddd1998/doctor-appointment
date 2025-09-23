"use client";
import { Formik, Form, Field, FieldProps } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentsApi, type Appointment } from "@/lib/api";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Clock } from "lucide-react";

export default function NewAppointmentPage() {
  const queryClient = useQueryClient();

  const createAppointmentMutation = useMutation({
    mutationFn: appointmentsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("نوبت با موفقیت ثبت شد!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در ثبت نوبت");
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>نوبت های موجود</CardTitle>
            <CardDescription>
              لطفاً ساعت و تاریخ مورد نظر خود را برای ثبت نویت انتخاب نمایید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                date: "",
                time: "",
              }}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  if (!values.date) {
                    toast.error("لطفاً تاریخ نوبت را انتخاب کنید");
                    return;
                  }
                  if (!values.date) {
                    toast.error("لطفاً زمان نوبت را انتخاب کنید");
                    return;
                  }

                  const appointmentData: Omit<Appointment, "id" | "createdAt"> =
                    {
                      date: values.date,
                      time: values.time,
                    };

                  await createAppointmentMutation.mutateAsync(appointmentData);
                  resetForm();
                } catch (error) {
                  // Error is handled in mutation onError
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
                    <Field name="date">
                      {({ field }: FieldProps) =>
                        ["date-1", "date-2"].map((date, index: number) => (
                          <Label
                            key={index}
                            className={`hover:bg-green-50 cursor-pointer flex justify-center 
                                           gap-3 rounded-lg border-1 border-gray-200! p-3 ${
                                             values.date === date
                                               ? "bg-green-50"
                                               : ""
                                           }`}
                          >
                            <input
                              type="radio"
                              {...field}
                              value={date}
                              className="hidden"
                            />
                            <div className="flex flex-col gap-4">
                              <p className="text-xs leading-none font-medium">
                                دوشنبه
                              </p>
                              <p className="text-muted-foreground text-base">
                                3 مهر
                              </p>
                              <p className="text-primary text-xs">10 نوبت</p>
                            </div>
                          </Label>
                        ))
                      }
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
                    <Field name="time">
                      {({ field }: FieldProps) =>
                        ["time-1", "time-2"].map((time, index: number) => (
                          <Label
                            key={index}
                            className={`hover:bg-primary hover:text-white cursor-pointer flex justify-center 
                                           gap-3 rounded-lg border-1 border-primary! p-3 ${
                                             values.time === time
                                               ? "bg-primary text-white"
                                               : ""
                                           }`}
                          >
                            <input
                              type="radio"
                              {...field}
                              value={time}
                              className="hidden"
                            />
                            <p className="text-sm leading-none font-medium">
                              9:22
                            </p>
                          </Label>
                        ))
                      }
                    </Field>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button
                      type="submit"
                      disabled={
                        isSubmitting || createAppointmentMutation.isPending
                      }
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {isSubmitting || createAppointmentMutation.isPending
                        ? "در حال ثبت..."
                        : "ثبت نوبت"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
