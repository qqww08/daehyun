import { useState } from "react";
import styled from "styled-components";

import { Button } from "~/views/components/Button";

interface IValue {
  name: string;
  value: string;
}
export interface SelectProps {
  value: IValue[];
  defaultValue?: IValue;
  onSelectClick: (val: IValue) => void;
}
export const Select = ({ value, defaultValue, onSelectClick }: SelectProps) => {
  const [initialValue, setInitialValue] = useState<string>(defaultValue.name);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleShowSelectClick = () => {
    setIsVisible((prev) => !prev);
  };
  const handleSelectClick = (val: IValue) => {
    setIsVisible(false);
    onSelectClick(val);
    setInitialValue(val.name);
  };

  return (
    <SelectBox>
      <SelectButton onClick={handleShowSelectClick}>{initialValue}</SelectButton>
      {isVisible && (
        <SelectList>
          {value.map((item) => {
            return (
              <SelectMenu key={item.value}>
                <SelectMenuButton onClick={() => handleSelectClick({ value: item.value, name: item.name })}>
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
const SelectMenuButton = styled(Button)`
  width: 100%;
  padding: 10px;
  &:hover {
    background-color: rgba(76, 117, 206, 0.1);
  }
`;
