export interface IPagination {
  total: number;
  page: number;
  limit: number;
}

// // GET请求返回类型
export type PaginatedResponseDto<T> = {
  code: number;
  message: string;
  data: {
    data: T;
    pagination?: IPagination;
  };
};

import { getClientInfo } from "@/utils/get-client-info";
// POST请求返回类型
export type ResponseDto<T> = {
  code: number;
  message: string;
  data: T;
};

// HTTP 方法类型
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
import ky from "ky";
export default ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || "",
  // timeout: 10000,
  hooks: {
    beforeRequest: [
      async (request) => {
        request.headers.set(
          "Cache-Control",
          "no-cache, no-store, must-revalidate"
        );
        request.headers.set("Pragma", "no-cache");
        request.headers.set("Expires", "0");
        console.log(request, "==========");
        // if (typeof window !== "undefined") {
        //   console.log("beforeRequest---------------");
        //   const headers = await getClientInfo();
        //   Object.entries(headers).forEach(([key, value]) => {
        //     request.headers.set(key, value);
        //   });
        // }
      },
    ],
    afterResponse: [async () => {}],

    beforeError: [
      async (error) => {
        console.error("HTTPError---------------", error);
        // 返回要抛出的 HTTPError 对象
        return error;
      },
    ],
  },
});
