// useCaptcha.ts
import { useQuery } from "@tanstack/react-query";

type CaptchaApiResponse = {
  success: boolean;
  data: {
    key: string;
    imageBase64: string;
    expiresAt: string; // ISO string, e.g. "2025-09-23T19:24:15.2002927Z"
  };
  code: number;
};

export type Captcha = {
  key: string;
  imageUrl: string; // data:image/png;base64,...
};

const CAPTCHA_URL = "/Account/GenerateCaptcha"; // آدرس API رو اینجا بذارید یا از param بفرستید

async function fetchCaptcha(signal?: AbortSignal): Promise<CaptchaApiResponse> {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL, "process.env.BASE_URL");

  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + CAPTCHA_URL, {
    method: "GET",
    signal,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch captcha: ${res.status} ${text}`);
  }
  const body = (await res.json()) as CaptchaApiResponse;
  return body;
}

export function useCaptcha() {
  const query = useQuery({
    queryKey: ["captcha"],
    queryFn: async ({ signal }) => {
      const body = await fetchCaptcha(signal);
      if (!body.success || !body.data)
        throw new Error("Invalid captcha response");
      const { key, imageBase64 } = body.data;
      const imageUrl = `data:image/png;base64,${imageBase64}`;
      return {
        key,
        imageUrl,
      } as Captcha;
    },
  });

  return {
    captcha: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error ?? null,
    refresh: () => query.refetch(),
    key: query.data?.key ?? null,
  };
}
