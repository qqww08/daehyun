import { AnchorHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

export interface SafeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}
export const SafeLink = ({ children, ...rest }: SafeLinkProps) => {
  return (
    <SafeLinkStyled target={"_blank"} rel="noopener noreferrer" {...rest}>
      {children}
    </SafeLinkStyled>
  );
};

const SafeLinkStyled = styled.a`
  cursor: pointer;
`;
