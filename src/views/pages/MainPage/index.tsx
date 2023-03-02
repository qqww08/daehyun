import type { ReactElement } from "react";
import styled from "styled-components";

import { ErrorAlertProvider } from "~/views/components";
import GnbHeader from "~/views/components/Header/GnbHeader";
import MainPageCampaign from "~/views/pages/MainPage/components/MainPageCampaign";

const MainPage = () => {
  return (
    <ErrorAlertProvider>
      <MainContainer>
        <MainPageCampaign />
      </MainContainer>
    </ErrorAlertProvider>
  );
};

export default MainPage;

const MainContainer = styled.main``;
MainPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <GnbHeader />
      {page}
    </>
  );
};
