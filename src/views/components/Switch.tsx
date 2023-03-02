import styled from "styled-components";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}
export const Switch = ({ checked, disabled, onCheckedChange }: SwitchProps) => {
  return (
    <SwitchArea checked={checked}>
      <SwitchThumb checked={checked} />
      <SwitchInput
        type={"checkbox"}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
    </SwitchArea>
  );
};
const SwitchArea = styled.div<{ checked: boolean }>`
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  position: relative;
  width: 40px;
  height: 22px;
  padding: 0 5px;
  background-color: ${({ theme, checked }) => (checked ? theme.color.main : theme.color.gray)};
  transition: background-color 300ms;
`;
const SwitchThumb = styled.div<{ checked: boolean }>`
  transition: left 250ms;
  position: absolute;
  left: ${({ checked }) => (checked ? "19px" : "5px")};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.white};
`;
const SwitchInput = styled.input`
  position: absolute;
  opacity: 0;
  inset: 0px;
  z-index: 1;
`;
