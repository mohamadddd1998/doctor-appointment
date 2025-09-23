"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">تنظیمات</h2>
          <p className="text-muted-foreground">مدیریت تنظیمات سیستم و پیکربندی</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات عمومی</CardTitle>
              <CardDescription>پیکربندی اصلی سیستم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">نام سایت</Label>
                  <Input id="site-name" placeholder="نام سایت خود را وارد کنید" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">آدرس سایت</Label>
                  <Input id="site-url" placeholder="https://example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">توضیحات</Label>
                <Input id="description" placeholder="توضیحات کوتاه درباره سایت" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تنظیمات امنیتی</CardTitle>
              <CardDescription>پیکربندی امنیت و دسترسی</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>احراز هویت دو مرحله‌ای</Label>
                  <p className="text-sm text-muted-foreground">فعال‌سازی احراز هویت دو مرحله‌ای برای امنیت بیشتر</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ورود خودکار</Label>
                  <p className="text-sm text-muted-foreground">اجازه ورود خودکار کاربران</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>لاگ فعالیت‌ها</Label>
                  <p className="text-sm text-muted-foreground">ثبت تمام فعالیت‌های کاربران</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تنظیمات اعلان‌ها</CardTitle>
              <CardDescription>مدیریت اعلان‌ها و پیام‌ها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اعلان‌های ایمیل</Label>
                  <p className="text-sm text-muted-foreground">ارسال اعلان‌ها از طریق ایمیل</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اعلان‌های پوش</Label>
                  <p className="text-sm text-muted-foreground">ارسال اعلان‌های پوش به مرورگر</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>ذخیره تغییرات</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
