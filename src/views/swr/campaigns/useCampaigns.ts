import useSWR, { type SWRResponse } from "swr";

import { PageList } from "~/views/swr/types";

export type TCampaignObjective =
  | "WEBSITE_CONVERSIONS"
  | "WEBSITE_TRAFFIC"
  | "SALES"
  | "APP_INSTALLATION"
  | "LEAD"
  | "BRAND"
  | "VIDEO_VIEWS";
export interface ICampaignsContent {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective: TCampaignObjective;

  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
}

interface Params {
  page?: number;
}
export const useCampaigns = ({ page = 1 }: Params = {}): SWRResponse<
  PageList<ICampaignsContent>
> => {
  /** TODO
   * API를 정상적으로 받아서 사용할 경우 아래와 같이 사용되고
   * useSWR의 key값이 바뀌면서 재호출 하게 되며 새로운 데이터를 가져옵니다
   * @example
   * ```tsx
   *  useSWR<ICampaigns>(`/api/campaigns?page=${page}&size=${size = 25 }`);
   * ```
   */
  return useSWR<PageList<ICampaignsContent>>(`/api/campaigns`);
};
