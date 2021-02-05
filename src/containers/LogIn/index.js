import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const LogIn = () => {
  const [user, setUser] = useState({ id: "", pw: "" });
  let history = useHistory();

  useEffect(() => {
    window.Kakao.Auth.createLoginButton({
      container: "#kakao-login-btn",
      success: function (authObj) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log(res);
            history.push("/");
          },
          fail: (res) => {
            alert("잘못된 정보입니다.");
          },
        });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (input) => (e) => {
    setUser({ ...user, [input]: e.target.value });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>아이디</Label>
        <Input type="text" value={user.id} onChange={handleChange("id")} />
        <Label>비밀번호</Label>
        <Input type="text" value={user.pw} onChange={handleChange("pw")} />
        <Btn>확인</Btn>
      </Form>
      <KaKaoBtn id="kakao-login-btn"></KaKaoBtn>
    </Container>
  );
};

export default LogIn;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 30%;
`;

const Label = styled.label`
  margin: 10px 0 5px 0;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 5px 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const Btn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  align-self: flex-end;
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const KaKaoBtn = styled.button`
  width: 30%;
  border-radius: 5px;
  outline: none;
  border: none;
  background-color: transparent;
`;
