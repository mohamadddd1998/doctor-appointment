"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Package,
  BarChart3,
  DollarSign,
  ClipboardCheck,
} from "lucide-react";

const stats = [
  {
    title: "کل کاربران",
    value: "2,543",
    description: "+12% نسبت به ماه گذشته",
    icon: Users,
    bg: "bg-gradient-success",
  },
  {
    title: " کل نوبت ها",
    value: "1,234",
    description: "+5% نسبت به ماه گذشته",
    icon: ClipboardCheck,
    bg: "bg-gradient-info",
  },
  {
    title: "نوبت های انجام شده",
    value: "$45,231",
    description: "+20% نسبت به ماه گذشته",
    icon: DollarSign,
    bg: "bg-gradient-warning",
  },
  {
    title: "نوبت های در انتظار",
    value: "12,543",
    description: "+8% نسبت به ماه گذشته",
    icon: BarChart3,
    bg: "bg-gradient-danger",
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className={`border-none ${stat.bg}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>نمودار نوبت دهی</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              نمودار تعداد نوبت ها در هر ماه اینجا نمایش داده می‌شود
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
