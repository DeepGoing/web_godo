import React, { ReactNode } from "react";
import { SWRConfig } from "swr";
import { AxiosWithAllService, setAuthorization } from "./Axios";
import { AxiosRequestConfig, isAxiosError } from "axios";

interface Props {
  children: ReactNode;
}

interface FetcherConfig extends AxiosRequestConfig {
  hasGlobalLoading: boolean;
}

export const useFetcherGetter = () => {
  const fetcher = async (url: string, config?: FetcherConfig) => {
    const { hasGlobalLoading } = config || { hasGlobalLoading: false };
    setAuthorization();

    let res: any;

    try {
      res = await AxiosWithAllService.get(url);

      return res.data;
    } catch (e) {
      if (isAxiosError(e)) {
        throw e;
      }
    }
  };

  return {
    fetcher,
  };
};

const GlobalSWR: React.FC<Props> = ({ children }) => {
  const { fetcher } = useFetcherGetter();

  return (
    <SWRConfig
      value={{
        fetcher: (resource) => fetcher(resource),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default GlobalSWR;
