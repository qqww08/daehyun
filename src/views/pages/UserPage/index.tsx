import type { ReactElement } from "react";

import GnbHeader from "~/views/components/Header/GnbHeader";

const UserPage = () => {
  return <div />;
};

export default UserPage;
UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <GnbHeader />
      {page}
    </>
  );
};
