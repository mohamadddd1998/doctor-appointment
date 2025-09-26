import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const p2e = (s: string): string =>
  s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());

export const handleApiError = async (response: Response) => {
  const errorData = await response.json().catch(() => null);

  if (errorData?.errors) {
    let errText = "";
    Object.keys(errorData.errors).forEach((key: string, index: number) => {
      errText += errorData.errors[key].join(" - ");
      errText +=
        Object.keys(errorData.errors).length === index + 1 ? "  " : " - ";
    });
    throw new Error(errText);
  }

  throw new Error(`خطا در درخواست - کد: ${response.status}`);
};
