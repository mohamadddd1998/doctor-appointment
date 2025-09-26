import { handleApiError } from "./utils";

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
      await handleApiError(response);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "خطا در برقراری ارتباط با سرور");
  }
};
