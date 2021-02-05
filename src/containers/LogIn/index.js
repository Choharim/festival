import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useObserver } from "mobx-react";
import useStore from "useStore";

const LogIn = () => {
  const [user, setUser] = useState({ id: "", pw: "" });
  let history = useHistory();
  const { LogInStore } = useStore();

  useEffect(() => {
    window.Kakao.Auth.createLoginButton({
      container: "#kakao-login-btn",
      success: function (authObj) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log(res);
            LogInStore.setUserName(res.id);
            LogInStore.setLogInSuccess(true);
            history.push("/");
          },
          fail: (res) => {
            LogInStore.setUserName("");
            LogInStore.setLogInSuccess(false);
            alert("잘못된 정보입니다.");
          },
        });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  }, [history, LogInStore]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (input) => (e) => {
    setUser({ ...user, [input]: e.target.value });
  };

  return useObserver(() => (
    <Container>
      <Logo onClick={() => history.push("/")}>어디갈까?</Logo>
      <Form onSubmit={handleSubmit}>
        <Label>아이디</Label>
        <Input type="text" value={user.id} onChange={handleChange("id")} />
        <Label>비밀번호</Label>
        <Input type="text" value={user.pw} onChange={handleChange("pw")} />
        <BtnWrap>
          <Link to="signUp"> 회원가입</Link>
          <Btn>확인</Btn>
        </BtnWrap>
      </Form>
      <KaKaoBtn id="kakao-login-btn"></KaKaoBtn>
    </Container>
  ));
};

export default LogIn;

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

const Form = styled.form`
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
  margin: 10px 0 5px 0;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`;

const Btn = styled.button`
  margin-top: 20px;
  padding: 5px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const KaKaoBtn = styled.button`
  width: 30%;
  border-radius: 10px;
  outline: none;
  border: none;
  background-color: transparent;
  > img {
    width: 100%;
  }

  @media only screen and (max-width: 900px) {
    width: 50%;
  }
`;
