import { Portal } from "./Portal";

import { ReactNode } from "react";
import styled, { css } from "styled-components";

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}
export const Modal = ({ isVisible, onClose, children }: ModalProps) => {
  return (
    <Portal>
      <Container visible={isVisible}>
        <Overlay visible={isVisible} onClick={() => onClose()} />
        <Box visible={isVisible}>{isVisible && children}</Box>
      </Container>
    </Portal>
  );
};
const Container = styled.div<{ visible: boolean }>`
  ${({ visible }) =>
    visible &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 110;
      display: flex;
      align-items: center;
      justify-content: center;
    `};
`;
const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0);
  opacity: ${({ visible }) => (visible ? 0.6 : 0)};
  pointer-events: ${({ visible }) => (visible ? "all" : "none")};
  transition: opacity 300ms ease-in-out;
  z-index: 110;
`;
const Box = styled.div<{ visible: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0.1)};
  transform: ${({ visible }) => (visible ? "scale(1)" : "scale(0.6)")};
  pointer-events: ${({ visible }) => (visible ? "all" : "none")};
  transition: all 300ms ease-in-out;
  z-index: 120;
`;
