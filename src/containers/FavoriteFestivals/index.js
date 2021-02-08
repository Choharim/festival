import React, { useEffect } from "react";
import useStore from "useStore";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FavoriteFestivals = () => {
  const { LogInStore, FavoriteStore } = useStore();
  useEffect(() => {
    if (!LogInStore.logInSuccess) {
      alert("로그인을 해주세요!");
    }
  }, []);

  return useObserver(() => (
    <Container>
      {!LogInStore.logInSuccess ? (
        <Wrap>
          <Logo>어디갈까?</Logo>
          <LogInBtn to="/logIn">로그인 하러가기</LogInBtn>
        </Wrap>
      ) : null}
    </Container>
  ));
};

export default FavoriteFestivals;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 68.8px);
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.span`
  font-family: "Stylish", sans-serif;
  font-size: 80px;
`;

const LogInBtn = styled(Link)`
  margin-top: 50px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 25px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  cursor: pointer;
`;
