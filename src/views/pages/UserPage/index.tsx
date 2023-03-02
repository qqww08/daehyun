import type { ReactElement } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { ErrorAlertProvider } from "~/views/components";
import GnbHeader from "~/views/components/Header/GnbHeader";
import UserCreateSection from "~/views/pages/UserPage/components/UserCreateSection";
import UserPageAdmin from "~/views/pages/UserPage/components/UserPageAdmin";
import { roleSelectState } from "~/views/recoil";

const UserPage = () => {
  const roleSelectValue = useRecoilValue(roleSelectState);
  const isAdmin = roleSelectValue === "admin";
  if (!isAdmin) return <div>접근 불가능한 기능입니다.</div>;
  return (
    <ErrorAlertProvider>
      <MainContainer>
        <Title>사용자 관리</Title>
        <UserCreateSection />
        <UserPageAdmin />
      </MainContainer>
    </ErrorAlertProvider>
  );
};
export default UserPage;
const MainContainer = styled.main``;
const Title = styled.h2`
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
`;

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <GnbHeader />
      {page}
    </>
  );
};
