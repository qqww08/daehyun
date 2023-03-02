import { useRecoilState } from "recoil";
import styled from "styled-components";

import { Button, Select } from "~/views/components";
import GnbUserBox from "~/views/components/Header/GnbHeader/GnbUserBox";
import { roleSelectState } from "~/views/recoil/roleSelectState";

type Role = "admin" | "manager" | "viewer" | "";
interface IRoleSelect {
  name: string;
  value: Role;
}
const dummySelectValue: IRoleSelect[] = [
  { name: "어드민", value: "admin" },
  { name: "매니저", value: "manager" },
  { name: "뷰어", value: "viewer" },
];
const GnbHeader = () => {
  const [roleSelect, setRoleSelect] = useRecoilState<Role>(roleSelectState);
  const isAdminValue = roleSelect === "admin";

  const handleSelectClick = ({ value }: IRoleSelect) => {
    setRoleSelect(value);
  };

  return (
    <Header>
      <HeaderLeft>
        <Logo>Wisebirds</Logo>
        <ManuButton>캠페인</ManuButton>
        {isAdminValue && <ManuButton>사용자</ManuButton>}
      </HeaderLeft>
      <HeaderRight>
        <GnbUserBox />
        <Select<IRoleSelect>
          defaultValue={dummySelectValue[0]}
          value={dummySelectValue}
          onSelectClick={handleSelectClick}
        />
      </HeaderRight>
    </Header>
  );
};

export default GnbHeader;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.color.main};
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled(HeaderLeft)``;

const Logo = styled.h1`
  text-align: center;
  width: 120px;
  color: ${({ theme }) => theme.color.white};
`;

const ManuButton = styled(Button)`
  width: 100px;
  height: 60px;
  color: ${({ theme }) => theme.color.white};
`;
