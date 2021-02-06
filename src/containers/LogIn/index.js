import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import axios from "axios";

const LogIn = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    id: "",
    pw: "",
  });
  let history = useHistory();
  const { LogInStore } = useStore();
  const [idBlur, setIdBlur] = useState(false);
  const [pwBlur, setPwBlur] = useState(false);

  useEffect(() => {
    window.Kakao.Auth.createLoginButton({
      container: "#kakao-login-btn",
      success: function (authObj) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log(res);
            LogInStore.setUserName(res.id);
            LogInStore.setNickName(res.properties.nickname);
            LogInStore.setLogInSuccess(true);
            history.push("/");
          },
          fail: (res) => {
            LogInStore.setUserName("");
            LogInStore.setNickName("");
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

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      users.some(
        (each) => each.userName === user.id && each.password === user.pw
      )
    ) {
      LogInStore.setUserName(user.id);
      LogInStore.setNickName(
        users.find((each) => each.userName === user.id).nickName
      );
      LogInStore.setLogInSuccess(true);
      history.push("/");
    } else {
      setUser({ id: "", pw: "" });
      alert("잘못된 정보입니다");
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return useObserver(() => (
    <Container>
      <Logo onClick={() => history.push("/")}>어디갈까?</Logo>
      <Form onSubmit={handleSubmit}>
        <Label warning={user.id === "" && idBlur}>아이디</Label>
        <Input
          type="text"
          name="id"
          warning={user.id === "" && idBlur}
          value={user.id}
          onChange={(e) => {
            handleChange(e);
            setIdBlur(true);
          }}
          onBlur={() => setIdBlur(true)}
        />
        <WarningText warning={user.id === "" && idBlur}>
          아이디를 적어주세요
        </WarningText>
        <Label warning={user.pw === "" && pwBlur}>비밀번호</Label>
        <Input
          type="text"
          name="pw"
          warning={user.pw === "" && pwBlur}
          value={user.pw}
          onChange={(e) => {
            handleChange(e);
            setPwBlur(true);
          }}
          onBlur={() => setPwBlur(true)}
        />
        <WarningText warning={user.pw === "" && pwBlur}>
          비밀번호를 적어주세요
        </WarningText>
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
  cursor: pointer;
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
