import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { regex } from "~/utils";
import { Button } from "~/views/components";
import { useErrorAlert } from "~/views/components/ErrorAlertProvider";
import { type IUserContent, useUser } from "~/views/swr/users";

interface Form {
  email: string;
  password: string;
  repeat_password: string;
  name: string;
}

interface Props {
  onClose: () => void;
  userInfo: IUserContent;
}
const UserEditModal = ({ onClose, userInfo }: Props) => {
  const router = useRouter();

  const setErrorAlert = useErrorAlert();

  const { mutate: userMutate } = useUser({
    page: Number(router.query.page),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    reValidateMode: "onSubmit",
    defaultValues: { name: userInfo.name },
  });

  const handleFormSubmit = async (data) => {
    try {
      /** TODO
       * API를 정상적으로 받아서 사용할 경우
       *  post 로 데이터 추가 요청하고 useSWR mutate을 사용해서
       * list api 를 재호출해서 최신 데이터를 가져옵니다.
       *
       * */
      //  userMutate();
      const body = {
        name: data.name,
      };
      await axios.post(`/api/users/${userInfo.id}`, body);
      onClose();
      userMutate();
      reset();
    } catch (e) {
      setErrorAlert(true);
    }
  };

  return (
    <UserEditModalBox>
      <UserCreateModalHeader>
        <UserCreateModalTitle>사용자 생성</UserCreateModalTitle>
        <UserCreateModalCloseButton onClick={onClose}>
          X
        </UserCreateModalCloseButton>
      </UserCreateModalHeader>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormBox>
          <FormLabel>아이디</FormLabel>
          <span>{userInfo?.email}</span>
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
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SubmitButton type={"submit"}>생성</SubmitButton>
        </ButtonArea>
      </Form>
    </UserEditModalBox>
  );
};

export default UserEditModal;
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
