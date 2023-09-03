import Head from "next/head";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import GlobalSWR from "../utill/GlobalSWR";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta />
      </Head>
      <Script />
      <RecoilRoot>
        <GlobalSWR>
          <Component {...pageProps} />
        </GlobalSWR>
      </RecoilRoot>
    </>
  );
}
