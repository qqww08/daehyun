import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { regex } from "~/utils";
import { Button, Modal, Pagination, Table } from "~/views/components";
import { useUser } from "~/views/swr/users";

interface Form {
  email: string;
  password: string;
  repeat_password: string;
  name: string;
}
const UserPageAdmin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Form>({ reValidateMode: "onSubmit" });
  const [userEmail, setUserEmail] = useState(null);
  const isUserEmail = Boolean(userEmail);

  const {
    data: userData,
    isLoading,
    mutate: userMutate,
  } = useUser({
    page: Number(router.query.page),
  });
  const handleEditModalShow = (data) => {
    setUserEmail(data);
    setValue("name", data.name);
  };
  const handleCloseClick = () => {
    setUserEmail(null);
    reset();
  };
  const handlePageChange = (page: number) => {
    router.replace({ query: { page } }, undefined, { shallow: true });
  };

  const handleFormSubmit = async (data) => {
    try {
      const body = {
        name: data.name,
      };
      await axios.post(`/api/users/${data.id}`, body);
      handleCloseClick();
      userMutate();
    } catch (e) {
      alert(e);
    }
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
        <UserEditModalBox>
          <UserCreateModalHeader>
            <UserCreateModalTitle>사용자 생성</UserCreateModalTitle>
            <UserCreateModalCloseButton onClick={handleCloseClick}>
              X
            </UserCreateModalCloseButton>
          </UserCreateModalHeader>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormBox>
              <FormLabel>아이디</FormLabel>
              <span>{userEmail?.email}</span>
            </FormBox>

            <FormBox>
              <FormLabel>이름</FormLabel>

              <FormInputBox>
                <FormInput
                  {...register("name", {
                    required: "이름을 입력하세요.",
                    pattern: {
                      value: regex.NAME,
                      message:
                        "이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)",
                    },
                  })}
                />
                {errors?.name && <FormError>{errors?.name?.message}</FormError>}
              </FormInputBox>
            </FormBox>
            <ButtonArea>
              <CancelButton onClick={handleCloseClick}>취소</CancelButton>
              <SubmitButton type={"submit"}>생성</SubmitButton>
            </ButtonArea>
          </Form>
        </UserEditModalBox>
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
const UserEditModalBox = styled.div`
  min-width: 80vw;
  padding: 30px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
`;
const UserCreateModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserCreateModalTitle = styled.div``;
const UserCreateModalCloseButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Form = styled.form``;
const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const FormLabel = styled.span`
  margin-bottom: 5px;
`;
const FormInputBox = styled.div`
  position: relative;
`;
const FormInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.color.gray};
`;
const FormError = styled.div`
  position: absolute;
  left: 0;
  top: 52px;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.color.red};
  background-color: ${({ theme }) => theme.color.white};
`;
const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;
const CancelButton = styled(Button)`
  width: 80px;
  height: 50px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.gray2};
  color: ${({ theme }) => theme.color.black};
`;
const SubmitButton = styled(CancelButton)`
  background-color: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
`;
const CreateButton = styled(Button)`
  margin: 10px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
`;
