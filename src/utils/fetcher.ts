import axios from "axios";

export const fetcher = async (arg) => {
  const res = await axios(arg);

  return res;
};
