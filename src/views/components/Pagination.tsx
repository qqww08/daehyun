import styled from "styled-components";

import { Button } from "~/views/components/Button";

export interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}
export const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
  const handlePageClick = (page: number) => {
    onPageChange(page + 1);
  };
  return (
    <PaginationArea>
      {[...Array(totalPages)].map((_, idx) => {
        return (
          <PaginationButton key={idx} onClick={() => handlePageClick(idx)}>
            {idx + 1}
          </PaginationButton>
        );
      })}
    </PaginationArea>
  );
};

const PaginationArea = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const PaginationButton = styled(Button)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
