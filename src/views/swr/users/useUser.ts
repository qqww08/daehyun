import useSWR, { SWRResponse } from "swr";

import { PageList } from "~/views/swr/types";

export interface IUserContent {
  id: number;
  email: string;
  name: string;
  last_login_at: string;
}
interface Params {
  page?: number;
}
export const useUser = ({ page = 1 }: Params = {}): SWRResponse<
  PageList<IUserContent>
> => {
  /** TODO
   * API를 정상적으로 받아서 사용할 경우 아래와 같이 사용되고
   * useSWR의 key값이 바뀌면서 재호출 하게 되며 새로운 데이터를 가져옵니다
   * @example
   * ```tsx
   *  useSWR<ICampaigns>(`/api/users?page=${page}&size=${size = 25 }`);
   * ```
   */
  return useSWR<PageList<IUserContent>>(`/api/users`);
};
