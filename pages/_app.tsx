import { NextPageContext } from "next";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import themes from "~/styles/themes";

interface MyAppProps extends AppProps {
  ctx: NextPageContext;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <ThemeProvider theme={themes}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
