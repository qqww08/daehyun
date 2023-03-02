export const fetcher = async (arg) => {
  const res = await fetch(arg);
  if (!res.ok) {
    const error: any = new Error("error");
    // 에러 객체에 부가 정보를 추가합니다.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};
