import { useState } from "react";
import styled from "styled-components";

import { Button } from "~/views/components";
import GnbHeaderUserPopup from "~/views/components/Header/GnbHeader/GnbHeaderUserPopup";
import { useMe } from "~/views/swr/auth";

const GnbUserBox = () => {
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const { data: meData } = useMe();

  const handlePopupClick = () => {
    setIsPopupShow((prev) => !prev);
  };
  return (
    <UserBox>
      <PopupButton onClick={handlePopupClick}>{meData.email}</PopupButton>
      {isPopupShow && <GnbHeaderUserPopup />}
    </UserBox>
  );
};

export default GnbUserBox;
const PopupButton = styled(Button)`
  display: flex;
  align-items: center;
  position: relative;
  height: 60px;
  padding: 0 10px;
  color: ${({ theme }) => theme.color.white};
`;
const UserBox = styled.div`
  position: relative;
`;
