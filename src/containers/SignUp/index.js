import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Agreement from "./_fragments/Agreement";
import Form from "./_fragments/Form";

const SignUp = () => {
  const [user, setUser] = useState({ id: "", pw: "", pw2: "" });
  const [users, setUsers] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <Container>
      <Logo onClick={() => history.push("/")}>어디갈까?</Logo>
      <Form user={user} users={users} setUser={setUser} />
      <Agreement />
      <div>
        <LogInText>이미 아이디가 있으신가요?</LogInText>
        <LogInBtn to="logIn">로그인</LogInBtn>
      </div>
    </Container>
  );
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

const LogInText = styled.span`
  margin-right: 10px;
`;

const LogInBtn = styled(Link)`
  text-decoration: underline;
`;
