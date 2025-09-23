"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    id: 1,
    name: "احمد محمدی",
    email: "ahmad@example.com",
    role: "مدیر",
    status: "فعال",
    joinDate: "1402/01/15",
  },
  {
    id: 2,
    name: "فاطمه احمدی",
    email: "fateme@example.com",
    role: "کاربر",
    status: "فعال",
    joinDate: "1402/02/20",
  },
  {
    id: 3,
    name: "علی رضایی",
    email: "ali@example.com",
    role: "کاربر",
    status: "غیرفعال",
    joinDate: "1402/03/10",
  },
]

export default function UsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">مدیریت کاربران</h2>
            <p className="text-muted-foreground">مدیریت و نظارت بر کاربران سیستم</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            افزودن کاربر
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>لیست کاربران</CardTitle>
            <CardDescription>مشاهده و مدیریت تمام کاربران سیستم</CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="جستجوی کاربر..." className="pl-10 w-64" dir="rtl" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام</TableHead>
                  <TableHead>ایمیل</TableHead>
                  <TableHead>نقش</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تاریخ عضویت</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "فعال" ? "default" : "secondary"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>ویرایش</DropdownMenuItem>
                          <DropdownMenuItem>مشاهده جزئیات</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
