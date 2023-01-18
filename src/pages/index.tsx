import { useRef } from "react";
import styled from "styled-components";

import { Button, NextLink, SafeLink } from "~/views/components";

const Index = () => {
  const first = useRef(null);
  return (
    <__Wrapper>
      <Button ref={first}>asd</Button>
      <NextLink href="/ssr-example">NEXT LINK</NextLink>
      <SafeLink href="https://www.naver.com">SafeLink</SafeLink>
    </__Wrapper>
  );
};

export default Index;

const __Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
