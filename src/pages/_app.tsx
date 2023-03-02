import type { NextPageContext } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { SWRConfig, type SWRConfiguration } from "swr";

import GlobalStyles from "~/styles/GlobalStyles";
import themes from "~/styles/themes";
import { fetcher } from "~/utils";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { fallback } = pageProps;
  const options: SWRConfiguration = {
    fetcher,
    fallback: fallback || {},
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
  return (
    <SWRConfig value={options}>
      <ThemeProvider theme={themes}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
};

export default MyApp;
