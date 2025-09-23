"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { appointmentsApi, type Appointment } from "@/lib/api"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react"

const statusColors = {
  confirmed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
}

const statusLabels = {
  confirmed: "تایید شده",
  pending: "در انتظار",
  completed: "انجام شده",
  cancelled: "لغو شده",
}

const editAppointmentSchema = Yup.object().shape({
  patientName: Yup.string().min(2, "نام بیمار باید حداقل ۲ کاراکتر باشد").required("نام بیمار الزامی است"),
  phoneNumber: Yup.string()
    .matches(/^09[0-9]{9}$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن الزامی است"),
  service: Yup.string().required("انتخاب خدمات الزامی است"),
  status: Yup.string().required("انتخاب وضعیت الزامی است"),
  notes: Yup.string().max(500, "یادداشت نباید بیش از ۵۰۰ کاراکتر باشد"),
})

export default function MyAppointmentsPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const {
    data: appointments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: appointmentsApi.getAll,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Appointment> }) => appointmentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      toast({
        title: "موفقیت",
        description: "نوبت با موفقیت بروزرسانی شد",
      })
      setEditModalOpen(false)
      setSelectedAppointment(null)
    },
    onError: () => {
      toast({
        title: "خطا",
        description: "خطا در بروزرسانی نوبت",
        variant: "destructive",
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => appointmentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      toast({
        title: "موفقیت",
        description: "نوبت با موفقیت حذف شد",
      })
      setDeleteModalOpen(false)
      setSelectedAppointment(null)
    },
    onError: () => {
      toast({
        title: "خطا",
        description: "خطا در حذف نوبت",
        variant: "destructive",
      })
    },
  })

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phoneNumber.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage)

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment({ ...appointment })
    setEditModalOpen(true)
  }

  const handleDelete = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDeleteModalOpen(true)
  }

  const handleSaveEdit = (values: any) => {
    if (selectedAppointment?.id) {
      updateMutation.mutate({
        id: selectedAppointment.id,
        data: values,
      })
    }
  }

  const handleConfirmDelete = () => {
    if (selectedAppointment?.id) {
      deleteMutation.mutate(selectedAppointment.id)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="mr-2">در حال بارگذاری...</span>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">خطا در بارگذاری نوبت‌ها</p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["appointments"] })}>تلاش مجدد</Button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">گزارش نوبت های من</h1>
          <p className="text-muted-foreground">مشاهده و مدیریت تمام نوبت‌های ثبت شده</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>فیلتر و جستجو</CardTitle>
            <CardDescription>برای یافتن نوبت مورد نظر از فیلترها استفاده کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="جستجو بر اساس نام بیمار یا شماره تلفن..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="وضعیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                    <SelectItem value="confirmed">تایید شده</SelectItem>
                    <SelectItem value="pending">در انتظار</SelectItem>
                    <SelectItem value="completed">انجام شده</SelectItem>
                    <SelectItem value="cancelled">لغو شده</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>لیست نوبت‌ها ({filteredAppointments.length} نوبت)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">نام بیمار</TableHead>
                    <TableHead className="text-right">شماره تلفن</TableHead>
                    <TableHead className="text-right">خدمات</TableHead>
                    <TableHead className="text-right">تاریخ</TableHead>
                    <TableHead className="text-right">ساعت</TableHead>
                    <TableHead className="text-right">وضعیت</TableHead>
                    <TableHead className="text-right">یادداشت</TableHead>
                    <TableHead className="text-right">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        هیچ نوبتی یافت نشد
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {appointment.patientName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {appointment.phoneNumber}
                          </div>
                        </TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {appointment.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {appointment.time}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                            {statusLabels[appointment.status as keyof typeof statusLabels]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 max-w-32">
                            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate text-sm">{appointment.notes}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(appointment)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(appointment)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  نمایش {startIndex + 1} تا {Math.min(startIndex + itemsPerPage, filteredAppointments.length)} از{" "}
                  {filteredAppointments.length} نوبت
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                    قبلی
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    بعدی
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ویرایش نوبت</DialogTitle>
              <DialogDescription>اطلاعات نوبت را ویرایش کنید و تغییرات را ذخیره کنید.</DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <Formik
                initialValues={{
                  patientName: selectedAppointment.patientName || "",
                  phoneNumber: selectedAppointment.phoneNumber || "",
                  service: selectedAppointment.service || "",
                  status: selectedAppointment.status || "",
                  notes: selectedAppointment.notes || "",
                }}
                validationSchema={editAppointmentSchema}
                onSubmit={handleSaveEdit}
                enableReinitialize
              >
                {({ values, setFieldValue, isSubmitting, errors, touched }) => (
                  <Form>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="patientName" className="text-right">
                          نام بیمار
                        </Label>
                        <div className="col-span-3">
                          <Field
                            as={Input}
                            id="patientName"
                            name="patientName"
                            className={errors.patientName && touched.patientName ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="patientName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right">
                          شماره تلفن
                        </Label>
                        <div className="col-span-3">
                          <Field
                            as={Input}
                            id="phoneNumber"
                            name="phoneNumber"
                            className={errors.phoneNumber && touched.phoneNumber ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="service" className="text-right">
                          خدمات
                        </Label>
                        <div className="col-span-3">
                          <Select value={values.service} onValueChange={(value) => setFieldValue("service", value)}>
                            <SelectTrigger className={errors.service && touched.service ? "border-red-500" : ""}>
                              <SelectValue placeholder="انتخاب خدمات" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="مشاوره">مشاوره</SelectItem>
                              <SelectItem value="معاینه">معاینه</SelectItem>
                              <SelectItem value="درمان">درمان</SelectItem>
                              <SelectItem value="پیگیری">پیگیری</SelectItem>
                              <SelectItem value="جراحی">جراحی</SelectItem>
                            </SelectContent>
                          </Select>
                          <ErrorMessage name="service" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          وضعیت
                        </Label>
                        <div className="col-span-3">
                          <Select value={values.status} onValueChange={(value) => setFieldValue("status", value)}>
                            <SelectTrigger className={errors.status && touched.status ? "border-red-500" : ""}>
                              <SelectValue placeholder="انتخاب وضعیت" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">تایید شده</SelectItem>
                              <SelectItem value="pending">در انتظار</SelectItem>
                              <SelectItem value="completed">انجام شده</SelectItem>
                              <SelectItem value="cancelled">لغو شده</SelectItem>
                            </SelectContent>
                          </Select>
                          <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">
                          یادداشت
                        </Label>
                        <div className="col-span-3">
                          <Field
                            as={Textarea}
                            id="notes"
                            name="notes"
                            className={errors.notes && touched.notes ? "border-red-500" : ""}
                          />
                          <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                        لغو
                      </Button>
                      <Button type="submit" disabled={isSubmitting || updateMutation.isPending}>
                        {updateMutation.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
                      </Button>
                    </DialogFooter>
                  </Form>
                )}
              </Formik>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تایید حذف</DialogTitle>
              <DialogDescription>آیا از حذف این نوبت اطمینان دارید؟ این عمل قابل بازگشت نیست.</DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="py-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p>
                    <strong>نام بیمار:</strong> {selectedAppointment.patientName}
                  </p>
                  <p>
                    <strong>تاریخ:</strong> {selectedAppointment.date}
                  </p>
                  <p>
                    <strong>ساعت:</strong> {selectedAppointment.time}
                  </p>
                  <p>
                    <strong>خدمات:</strong> {selectedAppointment.service}
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDeleteModalOpen(false)}>
                لغو
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "در حال حذف..." : "حذف نوبت"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
