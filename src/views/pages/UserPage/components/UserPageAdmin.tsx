import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import { Button, Modal, Pagination, Table } from "~/views/components";
import UserEditModal from "~/views/pages/UserPage/components/UserEditModal";
import { type IUserContent, useUser } from "~/views/swr/users";

const UserPageAdmin = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<IUserContent | null>(null);
  const isUserEmail = Boolean(userInfo);

  const { data: userData, isLoading } = useUser({
    page: Number(router.query.page),
  });
  const handleEditModalShow = (data) => {
    setUserInfo(data);
  };
  const handleCloseClick = () => {
    setUserInfo(null);
  };
  const handlePageChange = (page: number) => {
    router.replace({ query: { page } }, undefined, { shallow: true });
  };

  if (isLoading) return <div>loading</div>;

  return (
    <Container>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell align={"left"}>아이디</Table.HeadCell>
            <Table.HeadCell align={"left"}>이름</Table.HeadCell>
            <Table.HeadCell align={"left"}>마지막 로그인 일시</Table.HeadCell>
            <Table.HeadCell align={"right"}>수정</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {userData.content.map((item) => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell align={"left"}>{item.email}</Table.Cell>
                <Table.Cell align={"left"}>{item.name}</Table.Cell>
                <Table.Cell align={"left"}>
                  {dayjs(item.last_login_at).format("YYYY-MM-DD HH:mm:ss")}
                </Table.Cell>
                <Table.Cell align={"right"}>
                  <EditButton onClick={() => handleEditModalShow(item)}>
                    수정
                  </EditButton>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Pagination
        totalPages={userData.total_pages}
        onPageChange={handlePageChange}
      />
      <Modal isVisible={isUserEmail} onClose={handleCloseClick}>
        <UserEditModal onClose={handleCloseClick} userInfo={userInfo} />
      </Modal>
    </Container>
  );
};

export default UserPageAdmin;
const Container = styled.section``;
const EditButton = styled(Button)`
  padding: 3px;
  color: ${({ theme }) => theme.color.main};
`;
