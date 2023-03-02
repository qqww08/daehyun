import type { GetStaticProps } from "next";

export { default } from "~/views/pages/UserPage";
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
        "/api/users": {
          content: [
            {
              id: 1,
              email: "user1@wisebirds.ai",
              name: "사용자1",
              last_login_at: "2022-11-14T07:37:24.914Z",
            },
            {
              id: 2,
              email: "user2@wisebirds.ai",
              name: "사용자2",
              last_login_at: "2022-11-14T07:37:24.914Z",
            },
            {
              id: 3,
              email: "user3@wisebirds.ai",
              name: "사용자3",
              last_login_at: "2022-11-14T07:37:24.914Z",
            },
            {
              id: 4,
              email: "user4@wisebirds.ai",
              name: "사용자4",
              last_login_at: "2022-11-14T07:37:24.914Z",
            },
            {
              id: 5,
              email: "user5@wisebirds.ai",
              name: "사용자5",
              last_login_at: "2022-11-14T07:37:24.914Z",
            },
          ],
          size: 25,
          total_elements: 27,
          total_pages: 2,
        },
      },
    },
  };
};
