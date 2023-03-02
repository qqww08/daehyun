import type { GetStaticProps } from "next";

export { default } from "~/views/pages/MainPage";
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      fallback: {
        "/api/auth/me": {
          id: 1,
          email: "abc@abc.com",
          name: "홍길동",
          company: {
            id: 1,
            name: "와이즈버즈",
          },
        },
      },
    },
  };
};
