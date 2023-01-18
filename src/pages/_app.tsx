import type { NextPageContext } from "next";
import type { AppProps } from "next/app";

import GlobalStyles from "~/styles/GlobalStyles";

interface MyAppProps extends AppProps {
  ctx: NextPageContext;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
