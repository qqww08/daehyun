import type { GetServerSideProps } from "next";

import type { IUsers } from "~/interfaces/users";
import { fetcher } from "~/utils/axios";

interface Props {
  userData: IUsers[];
}
const SsrExample = (props: Props) => {
  const { userData } = props;

  return (
    <section>
      {userData.map((item) => (
        <div key={item.id}>
          <p>id {item.id}</p>
          <img src={item.avatar_url} width={50} height={50} alt={item.login} />
        </div>
      ))}
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const userData = await fetcher<IUsers[]>("https://api.github.com/users");

  return { props: { userData } };
};
export default SsrExample;
