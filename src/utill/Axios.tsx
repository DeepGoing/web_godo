import axios from "axios";

const options = {
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const CommonAxios = axios.create({
  ...options,
  baseURL: process.env.NEXT_PUBLIC_COMMON_API_URL,
});

const Axios = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api/v1/app/',
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosWithAllService = axios.create({
  ...options,
});

AxiosWithAllService.interceptors.request.use((config) => {
  const urls = config?.url?.split("/");
  //   const servicePath = urls?.get(urls, "[2]");
  const url = `/${urls?.slice(3).join("/")}`;

  //   if (servicePath === "coach") {
  //     config.baseURL = process.env.NEXT_PUBLIC_COACH_API_URL;
  //     config.url = url;
  //   }

  return config;
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("#error : ", error);
    console.log("#error response : ", JSON.stringify(error.response));
    return error.response;
  }
);

export function setAuthorization() {
  const cookies = window?.document?.cookie?.split(";") ?? [];
  // TODO: 1 부분 따로 수정 필요
  const token = cookies.find((cookie) => cookie.includes("1"))?.split("=")[1];

  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  CommonAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  AxiosWithAllService.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function emptyAuthorization() {
  Axios.defaults.headers.common.Authorization = "";
  CommonAxios.defaults.headers.common.Authorization = "";
  AxiosWithAllService.defaults.headers.common.Authorization = "";
}

export default Axios;
