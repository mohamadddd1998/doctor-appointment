"use server";
import { handleApiError } from "@/lib/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (payload: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Account/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      await handleApiError(response);
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "خطا در برقراری ارتباط با سرور");
  }
};
