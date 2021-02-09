import React from "react";
import styled from "styled-components";
import { FaRegPaperPlane } from "react-icons/fa";

const ChatBot = () => {
  return (
    <Container>
      <ChatBox>
        <Head>
          <span>어디갈까봇</span>
        </Head>
        <Body>hi</Body>
        <Foot>
          <Input type="text" placeholder="무엇이 궁금하세요?" />
          <Btn />
        </Foot>
      </ChatBox>
    </Container>
  );
};

export default ChatBot;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 20px;
  height: calc(100vh - 68.8px);
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 68.8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Body = styled.div`
  width: 100%;
  height: calc(100vh - 206.4px);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #f2f2f2;
`;

const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 68.8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px;
  border: none;
  outline: none;
`;

const Btn = styled(FaRegPaperPlane)`
  height: 100%;
  font-size: 32px;
  margin-right: 20px;
  cursor: pointer;
`;
