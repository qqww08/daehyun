import { useState } from "react";
import styled from "styled-components";

import { Button } from "~/views/components/Button";

interface Value {
  name: string;
  value: string;
}
export interface SelectProps<TSelectValue> {
  value: TSelectValue[] | Value[];
  defaultValue?: TSelectValue | Value;
  onSelectClick: (val: TSelectValue | Value) => void;
}
export const Select = <TSelectValue extends Value>({
  value,
  defaultValue,
  onSelectClick,
}: SelectProps<TSelectValue>) => {
  const [initialValue, setInitialValue] = useState<string>(defaultValue.name);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleShowSelectClick = () => {
    setIsVisible((prev) => !prev);
  };
  const handleSelectClick = (val: Value) => {
    setIsVisible(false);
    onSelectClick(val);
    setInitialValue(val.name);
  };

  return (
    <SelectBox>
      <SelectButton onClick={handleShowSelectClick}>
        {initialValue}
      </SelectButton>
      {isVisible && (
        <SelectList>
          {value.map((item) => {
            return (
              <SelectMenu key={item.value}>
                <SelectMenuButton
                  active={item.name === initialValue}
                  onClick={() =>
                    handleSelectClick({ value: item.value, name: item.name })
                  }
                >
                  {item.name}
                </SelectMenuButton>
              </SelectMenu>
            );
          })}
        </SelectList>
      )}
    </SelectBox>
  );
};

const SelectBox = styled.div`
  width: 130px;
  height: 30px;
  position: relative;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`;
const SelectButton = styled(Button)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: ${({ theme }) => theme.color.main};
  &:hover {
    background-color: rgba(76, 117, 206, 0.1);
  }
`;
const SelectList = styled.ul`
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  padding: 5px 0;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.color.white};
`;

const SelectMenu = styled.li``;
const SelectMenuButton = styled(Button)<{ active: boolean }>`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  &:hover {
    background-color: rgba(76, 117, 206, 0.1);
  }
  color: ${({ active, theme }) =>
    active ? theme.color.main : theme.color.black};
  font-weight: ${({ active }) => (active ? 700 : 400)};
`;
