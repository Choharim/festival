import React, { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import useStore from "useStore";
import { useObserver } from "mobx-react";
import { useHistory } from "react-router-dom";

const Form = ({ user, setUser, users }) => {
  const { LogInStore } = useStore();
  const [idBlur, setIdBlur] = useState(false);
  const [pwBlur, setPwBlur] = useState(false);
  let history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.id !== "" &&
      user.pw !== "" &&
      user.pw === user.pw2 &&
      users.every((each) => each.userName !== user.id)
    ) {
      axios({
        method: "post",
        url: "http://localhost:5000/users",
        data: {
          userName: user.id,
          password: user.pw,
        },
      });
      LogInStore.setUserName(user.id);
      LogInStore.setLogInSuccess(true);
      history.push("/");
    }
  };

  return useObserver(() => (
    <FormContainer onSubmit={handleSubmit}>
      <Label
        warning={
          (user.id === "" || users.some((each) => each.userName === user.id)) &&
          idBlur
        }
      >
        아이디
      </Label>
      <Input
        type="text"
        value={user.id}
        name="id"
        onChange={(e) => {
          handleChange(e);
          setIdBlur(true);
        }}
        warning={
          (user.id === "" || users.some((each) => each.userName === user.id)) &&
          idBlur
        }
        onBlur={() => setIdBlur(true)}
      />
      <WarningText
        warning={
          (user.id === "" || users.some((each) => each.userName === user.id)) &&
          idBlur
        }
      >
        {user.id === "" ? "아이디를 적어주세요!" : "이미 있는 아이디입니다"}
      </WarningText>
      <Label warning={user.pw === "" && pwBlur}>비밀번호</Label>
      <Input
        type="text"
        value={user.pw}
        name="pw"
        onChange={(e) => {
          handleChange(e);
          setPwBlur(true);
        }}
        warning={user.pw === "" && pwBlur}
        onBlur={() => setPwBlur(true)}
      />
      <WarningText warning={user.pw === "" && pwBlur}>
        비밀번호를 적어주세요!
      </WarningText>
      <Label warning={user.pw !== user.pw2 && user.pw2 !== ""}>
        비밀번호 확인
      </Label>
      <Input
        type="text"
        value={user.pw2}
        name="pw2"
        onChange={(e) => {
          handleChange(e);
        }}
        warning={user.pw !== user.pw2 && user.pw2 !== ""}
      />
      <WarningText warning={user.pw !== user.pw2 && user.pw2 !== ""}>
        비밀번호를 확인해주세요!
      </WarningText>
      <Btn>확인</Btn>
    </FormContainer>
  ));
};

export default Form;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 30%;
  margin: 20px 0;

  @media only screen and (max-width: 900px) {
    width: 50%;
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
  ${(props) =>
    props.warning &&
    css`
      color: #ff7777;
    `}
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  ${(props) =>
    props.warning &&
    css`
      box-shadow: #ff7777 0px 1px 3px 0px, #ff7777 0px 0px 0px 1px;
    `}
`;

const WarningText = styled.span`
  margin-top: 5px;
  font-size: 13px;
  color: #ff7777;
  visibility: hidden;
  ${(props) =>
    props.warning &&
    css`
      color: #ff7777;
      visibility: visible;
    `}
`;

const Btn = styled.button`
  align-self: flex-end;
  padding: 5px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
