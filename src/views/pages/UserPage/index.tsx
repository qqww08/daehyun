import axios from "axios";
import type { ReactElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { regex } from "~/utils";
import { Button, ErrorAlertProvider, Modal } from "~/views/components";
import { useErrorAlert } from "~/views/components/ErrorAlertProvider";
import GnbHeader from "~/views/components/Header/GnbHeader";
import UserPageAdmin from "~/views/pages/UserPage/components/UserPageAdmin";
import { useUser } from "~/views/swr/users";

const errorMessages = {
  email: {
    validate: "아이디(이메일)을 입력하세요",
    correct: "올바른 이메일 주소를 입력하세요.",
    duplication: "이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.",
  },
  pass: {
    validate: "비밀번호를 입력하세요.",
    phraseCheck: "8~15자 영문, 숫자, 특수문자를 사용하세요",
    repeat: "비밀번호가 일치하지 않습니다. ",
  },
  name: {
    validate: "이름을 입력하세요.",
    correct: "이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)",
  },
};

interface Form {
  email: string;
  password: string;
  repeat_password: string;
  name: string;
}
const UserPage = () => {
  const { mutate: userMutate } = useUser();
  const setErrorAlert = useErrorAlert();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Form>({ reValidateMode: "onSubmit" });
  const passwordWatch = watch("password");
  const [isVisible, setIsVisible] = useState(false);
  const handleCreateClick = () => {
    setIsVisible(true);
    reset();
  };
  const handleCloseClick = () => {
    setIsVisible(false);
  };

  const handleExistsCheck = async (email) => {
    try {
      console.log("email =>", email);
      const res: any = await axios.get(`/api/users/${email}/exists`);
      return res.data;
    } catch (e) {
      setErrorAlert(true);
    }
  };
  const handleFormSubmit = async (data) => {
    try {
      await axios.post("/api/users", data);
      userMutate();
      handleCloseClick();
    } catch (e) {
      setErrorAlert(true);
    }
  };
  return (
    <ErrorAlertProvider>
      <MainContainer>
        <Title>사용자 관리</Title>
        <CreateButton onClick={handleCreateClick}>생성</CreateButton>
        <UserPageAdmin />
        <Modal isVisible={isVisible} onClose={handleCloseClick}>
          <UserCreateModalBox>
            <UserCreateModalHeader>
              <UserCreateModalTitle>사용자 생성</UserCreateModalTitle>
              <UserCreateModalCloseButton onClick={handleCloseClick}>
                X
              </UserCreateModalCloseButton>
            </UserCreateModalHeader>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormBox>
                <FormLabel>아이디</FormLabel>
                <FormInputBox>
                  <FormInput
                    {...register("email", {
                      required: errorMessages.email.validate,
                      pattern: {
                        value: regex.EMAIL,
                        message: errorMessages.email.correct,
                      },
                      minLength: {
                        value: 1,
                        message: errorMessages.email.correct, // JS only: <p>error message</p> TS only support string
                      },
                      maxLength: {
                        value: 50,
                        message: errorMessages.email.correct, // JS only: <p>error message</p> TS only support string
                      },
                      validate: {
                        checkUrl: async (email) =>
                          (await handleExistsCheck(email)) ||
                          ": 이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.",
                      },
                    })}
                  />
                  {errors?.email && (
                    <FormError>{errors?.email?.message}</FormError>
                  )}
                </FormInputBox>
              </FormBox>
              <FormBox>
                <FormLabel>비밀번호</FormLabel>

                <FormInputBox>
                  <FormInput
                    type={"password"}
                    {...register("password", {
                      required: errorMessages.pass.validate,
                      pattern: {
                        value: regex.PASS,
                        message: errorMessages.pass.phraseCheck,
                      },
                    })}
                    placeholder={"영문, 숫자, 특수문자 조합 8~15자"}
                  />
                  {errors?.password && (
                    <FormError>{errors?.password?.message}</FormError>
                  )}
                </FormInputBox>
              </FormBox>
              <FormBox>
                <FormLabel>비밀번호 확인</FormLabel>

                <FormInputBox>
                  <FormInput
                    type={"password"}
                    {...register("repeat_password", {
                      required: errorMessages.pass.validate,
                      validate: (value) =>
                        value === passwordWatch ||
                        "비밀번호가 일치하지 않습니다. ",
                    })}
                  />
                  {errors?.repeat_password && (
                    <FormError>{errors?.repeat_password?.message}</FormError>
                  )}
                </FormInputBox>
              </FormBox>
              <FormBox>
                <FormLabel>이름</FormLabel>

                <FormInputBox>
                  <FormInput
                    {...register("name", {
                      required: errorMessages.name.validate,
                      pattern: {
                        value: regex.NAME,
                        message: errorMessages.name.correct,
                      },
                    })}
                  />
                  {errors?.name && (
                    <FormError>{errors?.name?.message}</FormError>
                  )}
                </FormInputBox>
              </FormBox>
              <ButtonArea>
                <CancelButton onClick={handleCloseClick}>취소</CancelButton>
                <SubmitButton type={"submit"}>생성</SubmitButton>
              </ButtonArea>
            </Form>
          </UserCreateModalBox>
        </Modal>
      </MainContainer>
    </ErrorAlertProvider>
  );
};
export default UserPage;
const MainContainer = styled.main``;
const Title = styled.h2`
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
`;

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <GnbHeader />
      {page}
    </>
  );
};

const UserCreateModalBox = styled.div`
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
