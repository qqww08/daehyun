import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import { format } from "~/utils/formats";
import { Pagination, Switch } from "~/views/components";
import { type TCampaignObjective, useCampaigns } from "~/views/swr/campaigns";

const MainPageCampaign = () => {
  const router = useRouter();

  const {
    data: campaignData,
    isLoading,
    mutate: campaignMutate,
  } = useCampaigns({ page: Number(router.query.page) });

  const campaignObj: {
    [key in TCampaignObjective]: string;
  } = {
    WEBSITE_CONVERSIONS: "웹사이트 전환",
    WEBSITE_TRAFFIC: "웹사이트 트래픽",
    SALES: "판매",
    APP_INSTALLATION: "앱설치",
    LEAD: "리드",
    BRAND: "브랜드 인지도 및 도달 범위",
    VIDEO_VIEWS: "동영상 조회",
  };

  const handleSwitchChange = async (checked: boolean, id: number) => {
    try {
      const body = {
        enabled: checked,
      };
      await axios.patch(`/api/campaigns/${id}`, body);
      /** API를 정상적으로 받아서 사용할 경우
       *  patch 로 데이터 수정을 요청하고 useSWR mutate을 사용해서
       * list api 를 재호출해서 최신 데이터를 가져옵니다.
       *  TODO campaignMutate();
       * */
    } catch (e) {
      alert(e);
    }
  };
  const handlePageChange = (page: number) => {
    router.replace({ query: { page } }, undefined, { shallow: true });
  };

  if (isLoading) return <div>loading</div>;

  return (
    <Container>
      <Title>캠페인 관리</Title>
      <Table>
        <TableHeaderGroup>
          <TableRow>
            <TableHeaderCell align={"center"}>상태</TableHeaderCell>
            <TableHeaderCell align={"left"}>캠페인명</TableHeaderCell>
            <TableHeaderCell align={"left"}>캠페인 목적</TableHeaderCell>
            <TableHeaderCell align={"right"}>노출수</TableHeaderCell>
            <TableHeaderCell align={"right"}>클릭수</TableHeaderCell>
            <TableHeaderCell align={"right"}>CTR</TableHeaderCell>
            <TableHeaderCell align={"right"}>동영상조회수</TableHeaderCell>
            <TableHeaderCell align={"right"}>VTR</TableHeaderCell>
          </TableRow>
        </TableHeaderGroup>
        <TableRowGroup>
          {campaignData.content.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell align={"center"}>
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={(check) =>
                      handleSwitchChange(check, item.id)
                    }
                  />
                </TableCell>
                <TableCell align={"left"}>{item.name}</TableCell>
                <TableCell align={"left"}>
                  {campaignObj[item.campaign_objective]}
                </TableCell>
                <TableCell align={"right"}>
                  {format.comma(item.impressions)}
                </TableCell>
                <TableCell align={"right"}>
                  {format.comma(item.clicks)}
                </TableCell>
                <TableCell align={"right"}>
                  {format.floatToPercent(item.ctr)}
                </TableCell>
                <TableCell align={"right"}>
                  {format.comma(item.video_views)}
                </TableCell>
                <TableCell align={"right"}>
                  {format.floatToPercent(item.vtr)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableRowGroup>
      </Table>
      <Pagination
        totalPages={campaignData.total_pages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default MainPageCampaign;
const Container = styled.main``;
const Title = styled.h2`
  padding: 15px;
`;
const Table = styled.table`
  width: 100%;
  table-layout: auto;
  display: table;
`;
const TableHeaderGroup = styled.thead`
  display: table-header-group;
  padding: 0 10px;
`;
const TableHeaderCell = styled.th<{ align: "center" | "left" | "right" }>`
  height: 40px;
  display: table-cell;
  vertical-align: middle;
  text-align: ${({ align }) => align};
  color: ${({ theme }) => theme.color.gray2};
  border-top: 1px solid ${({ theme }) => theme.color.gray};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  padding: 10px;
`;
const TableRowGroup = styled.tbody`
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
