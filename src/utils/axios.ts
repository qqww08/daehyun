import axios from "axios";

export const fetcher = <TResponse>(url, ...arg): Promise<TResponse> => axios.get(url, ...arg).then((res) => res.data);
const instance = axios.create({
  timeout: 30000,
});
export default instance;
