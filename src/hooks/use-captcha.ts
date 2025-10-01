import { get } from "@/services/http-service";
import { useQuery, type QueryObserverResult } from "@tanstack/react-query";

export type Captcha = {
  key: string;
  imageUrl: string;
};

type UseCaptchaResult = {
  captcha: Captcha | null;
  isLoading: boolean;
  isFetching: boolean;
  refresh: () => Promise<QueryObserverResult<Captcha, Error>>;
  key: string | null;
};

export function useCaptcha(): UseCaptchaResult {
  const { data, isLoading, isFetching, refetch } = useQuery<Captcha>({
    queryKey: ["captcha"],
    queryFn: async () => {
      const { data } = await get("/Account/GenerateCaptcha");
      const { key, imageBase64 } = data;
      return {
        key,
        imageUrl: `data:image/png;base64,${imageBase64}`,
      };
    },
  });

  return {
    captcha: data ?? null,
    isLoading,
    isFetching,
    refresh: refetch,
    key: data?.key ?? null,
  };
}
