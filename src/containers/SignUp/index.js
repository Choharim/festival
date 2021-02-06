import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import useStore from "useStore";
import { useObserver } from "mobx-react";
import Agreement from "./_fragments/Agreement";
import Form from "./_fragments/Form";

const SignUp = () => {
  const [user, setUser] = useState({ id: "", pw: "", pw2: "" });
  const [users, setUsers] = useState([]);
  const [agreement, setAgreement] = useState([]);
  const { LogInStore } = useStore();
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
  }, []);
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
    <Container>
      <Logo onClick={() => history.push("/")}>어디갈까?</Logo>
      <FormContainer onSubmit={handleSubmit}>
        <Form user={user} users={users} setUser={setUser} />
        <Agreement agreement={agreement} setAgreement={setAgreement} />
        <Btn>회원가입 완료</Btn>
      </FormContainer>
      <div>
        <LogInText>이미 아이디가 있으신가요?</LogInText>
        <LogInBtn to="logIn">로그인</LogInBtn>
      </div>
    </Container>
  ));
};

export default SignUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Logo = styled.span`
  margin-top: 40px;
  font-size: 38px;
  font-family: "Stylish", sans-serif;
  cursor: pointer;
`;

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

const Btn = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  cursor: pointer;
`;

const LogInText = styled.span`
  margin-right: 10px;
`;

const LogInBtn = styled(Link)`
  text-decoration: underline;
`;