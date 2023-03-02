import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { SWRConfig, type SWRConfiguration } from "swr";

import GlobalStyles from "~/styles/GlobalStyles";
import themes from "~/styles/themes";
import { fetcher } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { fallback } = pageProps;
  const getLayout = Component.getLayout || ((page) => page);
  const options: SWRConfiguration = {
    fetcher,
    fallback: fallback || {},
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
  return (
    <SWRConfig value={options}>
      <RecoilRoot>
        <ThemeProvider theme={themes}>
          <GlobalStyles />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </RecoilRoot>
    </SWRConfig>
  );
};

export default MyApp;
