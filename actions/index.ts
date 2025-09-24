"use server";

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
      const errorData = await response.json();
      let errText = "";
      Object.keys(errorData.errors).forEach((key: string, index: number) => {
        errText += errorData.errors[key].join(" - ");
        errText +=
          Object.keys(errorData.errors).length === index + 1 ? "  " : " - ";
      });
      throw new Error(`${errText || `خطا در ثبت نام - ${response.status}`}`);
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "خطا در برقراری ارتباط با سرور");
  }
};
