import React from "react";
import Modal from "components/Modal";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Success = ({ showSuccess }) => {
  return (
    <Modal visible={showSuccess}>
      <Logo>어디갈까?</Logo>
      <Text>회원가입이 완료되었습니다</Text>
      <CheckIcon />
    </Modal>
  );
};

export default Success;

const Logo = styled.span`
  font-size: 32px;
  font-family: "Stylish", sans-serif;
`;

const Text = styled.span`
  font-size: 23px;
  font-weight: bolder;
  margin: 10px 0;
`;

const CheckIcon = styled(AiOutlineCheckCircle)`
  font-size: 50px;
`;
