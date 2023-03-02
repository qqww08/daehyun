import styled from "styled-components";

import { useMe } from "~/views/swr/auth";

const GnbHeaderUserPopup = () => {
  const { data: meData } = useMe();
  return (
    <PopupContainer>
      <UserName>{meData.name}</UserName>
      <UserEmail>{meData.email}</UserEmail>
      <CompanyName>{meData.company.name}</CompanyName>
    </PopupContainer>
  );
};

export default GnbHeaderUserPopup;
const PopupContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  top: 70px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 0px 5px 8px rgba(0, 0, 0, 0.1);
`;
const UserName = styled.span``;
const UserEmail = styled.span``;
const CompanyName = styled.span``;
