import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from "react";
import styled from "styled-components";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const ButtonRef = ({ children, type = "button", ...rest }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  return (
    <ButtonStyled {...rest} type={type} ref={ref}>
      {children}
    </ButtonStyled>
  );
};

export const Button = forwardRef(ButtonRef);
const ButtonStyled = styled.button`
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
