import type { ReactElement } from "react";

import GnbHeader from "~/views/components/Header/GnbHeader";
import MainPageCampaign from "~/views/pages/MainPage/components/MainPageCampaign";

const MainPage = () => {
  return <MainPageCampaign />;
};

export default MainPage;
MainPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <GnbHeader />
      {page}
    </>
  );
};
