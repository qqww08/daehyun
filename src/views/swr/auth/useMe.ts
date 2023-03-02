import useSWR, { type SWRResponse } from "swr";

export interface IAuthMe {
  id: number;
  email: string;
  name: string;
  company: {
    id: number;
    name: string;
  };
}
export const useMe = (): SWRResponse<IAuthMe> => {
  return useSWR<IAuthMe>("/api/auth/me");
};
