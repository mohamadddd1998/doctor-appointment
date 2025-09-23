"use client"

import React from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { cn } from "@/lib/utils"

type PersianCalendarProps = {
  value?: Date | null
  onChange?: (date: Date | null) => void
  className?: string
}

export function PersianCalendar({ value, onChange, className }: PersianCalendarProps) {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      value={value}
      containerClassName="w-full"
      onChange={(date) => onChange?.(date ? date.toDate?.() : null)}
      inputClass={cn(
        "w-full text-sm text-gray-500 border border-gray-200! rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
    />
  )
}
