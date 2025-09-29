import { createContext } from "react";

export type TStep = "login" | "register" | "otp";

export interface IAuthState {
  step: TStep;
  isLogin: boolean;
  userInfo: Record<string, any> | null;
  data: Record<string, any> | null;
}

// از enum معمولی استفاده کن، نه const enum
export enum AuthActionTypes {
  Set_Step = "Set_Step",
  Set_IsLogin = "Set_IsLogin",
  Set_User_Info = "Set_User_Info",
  Set_Data = "Set_Data",
}

// تعریف نوع‌های اکشن‌ها
export type TAuthAction =
  | { type: AuthActionTypes.Set_Step; value: TStep }
  | { type: AuthActionTypes.Set_IsLogin; value: boolean }
  | { type: AuthActionTypes.Set_User_Info; value: Record<string, any> | null }
  | { type: AuthActionTypes.Set_Data; value: Record<string, any> | null };

// مقدار پیش‌فرض کانتکست (می‌تونی بعداً مقداردهی کامل کنی)
export const AuthContext = createContext<{
  state: IAuthState;
  dispatch: React.Dispatch<TAuthAction>;
  userInfoLoading: boolean;
} | null>(null);
