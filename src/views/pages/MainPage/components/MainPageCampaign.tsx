import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";

import { format } from "~/utils";
import { Pagination, Switch, Table } from "~/views/components";
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
      /** TODO
       * API를 정상적으로 받아서 사용할 경우
       *  patch 로 데이터 수정을 요청하고 useSWR mutate을 사용해서
       * list api 를 재호출해서 최신 데이터를 가져옵니다.
       * */
      //  campaignMutate();
    } catch (e) {
      alert(e || "에러입니다.");
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
        <Table.Head>
          <Table.Row>
            <Table.HeadCell align={"center"}>상태</Table.HeadCell>
            <Table.HeadCell align={"left"}>캠페인명</Table.HeadCell>
            <Table.HeadCell align={"left"}>캠페인 목적</Table.HeadCell>
            <Table.HeadCell align={"right"}>노출수</Table.HeadCell>
            <Table.HeadCell align={"right"}>클릭수</Table.HeadCell>
            <Table.HeadCell align={"right"}>CTR</Table.HeadCell>
            <Table.HeadCell align={"right"}>동영상조회수</Table.HeadCell>
            <Table.HeadCell align={"right"}>VTR</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {campaignData.content.map((item) => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell align={"center"}>
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={(check) =>
                      handleSwitchChange(check, item.id)
                    }
                  />
                </Table.Cell>
                <Table.Cell align={"left"}>{item.name}</Table.Cell>
                <Table.Cell align={"left"}>
                  {campaignObj[item.campaign_objective]}
                </Table.Cell>
                <Table.Cell align={"right"}>
                  {format.comma(item.impressions)}
                </Table.Cell>
                <Table.Cell align={"right"}>
                  {format.comma(item.clicks)}
                </Table.Cell>
                <Table.Cell align={"right"}>
                  {format.floatToPercent(item.ctr)}
                </Table.Cell>
                <Table.Cell align={"right"}>
                  {format.comma(item.video_views)}
                </Table.Cell>
                <Table.Cell align={"right"}>
                  {format.floatToPercent(item.vtr)}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Pagination
        totalPages={campaignData.total_pages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default MainPageCampaign;
const Container = styled.section``;
const Title = styled.h2`
  padding: 15px;
`;
