type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface HttpOptions {
  url: string;
  method?: HttpMethod;
  payload?: any;
  headers?: Record<string, string>;
}

export const httpService = async <T>({
  url,
  method = "GET",
  payload,
  headers = {},
}: HttpOptions): Promise<T> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        },
        body: payload ? JSON.stringify(payload) : undefined,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      // هندل خطاهای برگشتی سرور
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
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "خطا در برقراری ارتباط با سرور");
  }
};
