import React from "react";
import Modal from "components/Modal";
import styled from "styled-components";
import { useObserver } from "mobx-react";
import useStore from "useStore";

const CheckLogOut = ({ checkLogOut, setCheckLogOut }) => {
  const { LogInStore } = useStore();

  return useObserver(() => (
    <Modal visible={checkLogOut}>
      <Text>정말로 로그아웃 하시겠습니까?</Text>
      <BtnWrap>
        <Btn
          onClick={() => {
            setCheckLogOut(false);
          }}
        >
          아니오
        </Btn>
        <Btn
          onClick={() => {
            setCheckLogOut(false);
            LogInStore.setUserName("");
            LogInStore.setLogInSuccess(false);
          }}
        >
          예
        </Btn>
      </BtnWrap>
    </Modal>
  ));
};

export default CheckLogOut;

const Text = styled.span`
  font-size: 23px;
  font-weight: bolder;
  margin: 40px 0;

  @media only screen and (max-width: 700px) {
    font-size: 18px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Btn = styled.button`
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  padding: 10px 40px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  cursor: pointer;

  @media only screen and (max-width: 700px) {
    padding: 10px 30px;
  }
`;
