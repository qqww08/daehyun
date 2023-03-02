import styled from "styled-components";

const TableHead = styled.thead`
  display: table-header-group;
`;
const TableHeadCell = styled.th<{ align: "center" | "left" | "right" }>`
  height: 40px;
  display: table-cell;
  vertical-align: middle;
  text-align: ${({ align }) => align};
  color: ${({ theme }) => theme.color.gray2};
  border-top: 1px solid ${({ theme }) => theme.color.gray};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  padding: 10px;
`;
const TableBody = styled.tbody`
  display: table-row-group;
  padding: 0 10px;
`;
const TableRow = styled.tr`
  display: table-row;
`;
const TableCell = styled.td<{ align: "center" | "left" | "right" }>`
  display: table-cell;
  height: 40px;
  vertical-align: middle;
  text-align: ${({ align }) => align};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  padding: 10px;
`;
const TableLayout = styled.table`
  width: 100%;
  table-layout: auto;
  display: table;
`;

export const Table = Object.assign(TableLayout, {
  Head: TableHead,
  HeadCell: TableHeadCell,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
});
