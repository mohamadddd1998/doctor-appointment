import { useQuery } from "@tanstack/react-query";

type CaptchaApiResponse = {
  success: boolean;
  data: {
    key: string;
    imageBase64: string;
    expiresAt: string;
  };
  code: number;
};

export type Captcha = {
  key: string;
  imageUrl: string;
};

const CAPTCHA_URL = "/Account/GenerateCaptcha";

async function fetchCaptcha(): Promise<CaptchaApiResponse> {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL, "process.env.BASE_URL");

  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + CAPTCHA_URL);
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
    queryFn: async () => {
      const body = await fetchCaptcha();
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
