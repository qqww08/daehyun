import { ReactNode } from "react";
import {
  atom,
  SetterOrUpdater,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";

import { Button } from "~/views/components/Button";
import { Modal } from "~/views/components/Modal";

export const errorAlertState = atom<boolean>({
  key: "errorAlertState",
  default: false,
});
export interface ErrorAlertProviderProps {
  children: ReactNode;
}
export const useErrorAlert = (): SetterOrUpdater<boolean> => {
  const setErrorAlert = useSetRecoilState<boolean>(errorAlertState);
  return setErrorAlert;
};
export const ErrorAlertProvider = ({ children }: ErrorAlertProviderProps) => {
  const [errorAlertValue, setErrorAlert] =
    useRecoilState<boolean>(errorAlertState);
  const handleClose = () => {
    setErrorAlert(false);
  };
  return (
    <>
      <Modal isVisible={errorAlertValue} onClose={handleClose} zIndex={100000}>
        <ErrorModalBox>
          <Contents>
            에러가 발생했습니다.
            <br />
            같은 현상이 반복되면 고객센터로 문의 바랍니다.
            <br />
            <br />
            고객센터
            <br />- email: helpdesk@wisebirds.ai
          </Contents>
          <CloseButton onClick={handleClose}>확인</CloseButton>
        </ErrorModalBox>
      </Modal>
      {children}
    </>
  );
};
const ErrorModalBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40vw;
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
`;
const Contents = styled.div``;
const CloseButton = styled(Button)`
  margin-left: auto;
  width: 50px;
  height: 40px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
`;
