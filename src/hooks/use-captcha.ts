import { get } from "@/services/http-service";
import { useQuery } from "@tanstack/react-query";

export type Captcha = {
  key: string;
  imageUrl: string;
};

export function useCaptcha() {
  const query = useQuery({
    queryKey: ["captcha"],
    queryFn: async () => {
      const response = await get("/Account/GenerateCaptcha");
      const { key, imageBase64 } = response.data.data;
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
