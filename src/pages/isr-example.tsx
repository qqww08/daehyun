import type { GetStaticProps } from "next";

import type { IUsers } from "~/interfaces/users";
import { fetcher } from "~/utils/axios";

interface Props {
  userData: IUsers[];
}
const IsrExample = (props: Props) => {
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

export const getStaticProps: GetStaticProps = async () => {
  const userData = await fetcher<IUsers[]>("https://api.github.com/users");

  return { revalidate: 3600, props: { userData } };
};
export default IsrExample;
