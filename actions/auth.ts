"use server";
import { httpService } from "@/lib/http-service";

export const register = async (payload: any) => {
  return await httpService({
    url: "/Account/Register",
    method: "POST",
    payload,
  });
};
