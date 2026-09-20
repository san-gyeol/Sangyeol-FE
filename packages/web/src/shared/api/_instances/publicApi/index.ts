import { ErrorResponse } from "@shared/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseURL) throw new Error("NEXT_PUBLIC_BASE_URL env값이 없습니다");

const publicApi = axios.create({
  baseURL: baseURL.replace(/\/$/, ""),
  timeout: 5000,
  headers:
    process.env.NODE_ENV === "development"
      ? {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
          Accept: "*/*",
        }
      : {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
});

publicApi.interceptors.response.use(
  // api 패키지 함수가 `response.data`로 body를 읽으므로 AxiosResponse를 그대로 넘긴다
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const err = Object.assign(
      new Error(
        error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
      ),
      {
        name: "ApiError",
        status: "error" as const,
        errorCode: error.response?.data?.errorCode ?? "UNKNOWN_ERROR",
        httpStatus: error.response?.status,
        url: error.config?.url,
        cause: error,
      },
    ) as Error &
      ErrorResponse & { httpStatus?: number; url?: string; cause?: unknown };

    return Promise.reject(err);
  },
);

export default publicApi;
