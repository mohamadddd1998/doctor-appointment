import {
  AuthActionTypes,
  AuthContext,
  type IAuthState,
  type TAuthAction,
  type TStep,
} from "@/contexts/AuthContext";
import LayoutRoutesProvider from "./LayoutRoutesProvider";
import AuthRoutesProvider from "./AuthRoutesProvider";
import { useContext, useEffect, useReducer } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LSService } from "@/services/ls-service";
import Loading from "@/components/partials/loading";
import { get, post } from "@/services/http-service";

// مقدار اولیه حالت
const initialState: IAuthState = {
  step: "login",
  isLogin: false,
  userInfo: null,
  data: null,
};

// ریدوسر با تایپ‌های مشخص شده
function reducer(state: IAuthState, action: TAuthAction): IAuthState {
  switch (action.type) {
    case AuthActionTypes.Set_IsLogin:
      return { ...state, isLogin: action.value };
    case AuthActionTypes.Set_User_Info:
      return { ...state, userInfo: action.value };
    case AuthActionTypes.Set_Step:
      return { ...state, step: action.value };
    case AuthActionTypes.Set_Data:
      return { ...state, data: { ...state.data, ...action.value } };
    default:
      throw new Error(`اکشن نامعتبر در Auth Reducer`);
  }
}
interface AuthProviderProps {
  children: React.ReactNode;
  isPrivateRoute?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  isPrivateRoute = false,
}) => {
  const Provider = isPrivateRoute ? LayoutRoutesProvider : AuthRoutesProvider;

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isValidTokenLoading } = useValidToken(dispatch);

  const { userInfoLoading } = useUserInfo(dispatch, state);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        userInfoLoading,
      }}
    >
      {isValidTokenLoading ? (
        <div className="flex flex-col justify-center items-center h-screen bg-main-primary">
          <Loading text="در حال اعتبار سنجی" />
        </div>
      ) : (
        <Provider>{children}</Provider>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): {
  state: IAuthState;
  dispatch: React.Dispatch<TAuthAction>;
  setIsLogin: (value: boolean) => void;
  setData: (value: Record<string, any> | null) => void;
  setStep: (value: TStep) => void;
  setUserInfo: (value: any) => void;
  userInfoLoading: boolean;
} => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth باید داخل AuthProvider استفاده شود");
  }
  const { state, dispatch, userInfoLoading } = context;

  const setIsLogin = (value: boolean): void =>
    dispatch({ type: AuthActionTypes.Set_IsLogin, value });

  const setData = (value: Record<string, any> | null): void =>
    dispatch({ type: AuthActionTypes.Set_Data, value });

  const setStep = (value: TStep): void =>
    dispatch({ type: AuthActionTypes.Set_Step, value });

  const setUserInfo = (value: Record<string, any> | null): void =>
    dispatch({ type: AuthActionTypes.Set_User_Info, value });

  return {
    state,
    dispatch,
    setIsLogin,
    setData,
    setStep,
    setUserInfo,
    userInfoLoading,
  };
};

const useUserInfo = (
  dispatch: React.Dispatch<TAuthAction>,
  state: IAuthState
) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["userInfo", state.isLogin],
    queryFn: async () => await get("/Account/GetCurrentUserInfo"),
    enabled: Boolean(state.isLogin),
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch({
        type: AuthActionTypes.Set_User_Info,
        value: data?.data,
      });
    }
  }, [data]);

  return {
    userInfoLoading: isLoading,
  };
};

const useValidToken = (dispatch: React.Dispatch<TAuthAction>) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["validateToken"],
    queryFn: async () => await get("/Account/ValidateToken"),
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch({
        type: AuthActionTypes.Set_IsLogin,
        value: data?.data as boolean,
      });
    }
  }, [data]);

  return {
    isValidTokenLoading: isLoading,
  };
};

export const useLogout = (): {
  handleLogout: () => void;
  logoutLoading: boolean;
} => {
  const logoutMutation = useMutation({
    mutationFn: async (payload: any) => await post("/Account/logout", payload),
    onSuccess: () => {
      LSService.clearToken();
      window.location.reload();
    },
  });

  const handleLogout = () =>
    logoutMutation.mutate({
      refreshToken: "",
    });

  return {
    handleLogout,
    logoutLoading: logoutMutation.isPending,
  };
};
