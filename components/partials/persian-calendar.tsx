"use client";

import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { cn, p2e } from "@/lib/utils";
import "react-multi-date-picker/styles/colors/green.css";
import * as moment from "jalali-moment";

type PersianCalendarProps = {
  onChange?: (date: string) => void;
  className?: string;
};

export function PersianCalendar({ onChange, className }: PersianCalendarProps) {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      className="green"
      containerClassName="w-full"
      onChange={(date: DateObject) => {
        const object = { date };
        const formattedDate = new DateObject(object).format();

        const parsedDate = moment
          .from(p2e(formattedDate), "fa", "YYYY/MM/DD")
          .locale("en")
          .format("YYYY-MM-DDT05:00:00");

        onChange?.(parsedDate);
      }}
      inputClass={cn(
        "w-full text-sm text-gray-500 border border-gray-200! rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
    />
  );
}
