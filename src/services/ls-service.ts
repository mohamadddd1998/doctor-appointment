export interface ILSService {
  setToken: (accessToken: string) => void;
  getToken: () => string;
  clearToken: () => void;
}

export const LSService: ILSService = {
  setToken: (accessToken) => {
    localStorage.setItem("access-token", accessToken);
  },
  getToken: () => localStorage.getItem("access-token")!,
  clearToken: () => {
    localStorage.removeItem("access-token");
  },
};
