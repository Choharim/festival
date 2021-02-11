import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FaRegPaperPlane } from "react-icons/fa";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import user from "images/user.png";
import chatBot from "images/chatBot.png";

const ChatBot = () => {
  const [chat, setChat] = useState([{ text: "", loading: false }]);
  const { LogInStore } = useStore();

  useEffect(() => {
    if (LogInStore.logInSuccess) {
      window.setTimeout(
        () =>
          setChat([
            { text: `${LogInStore.nickName}님, 기분이 어때요?`, loading: true },
          ]),
        2000
      );
    } else {
      window.setTimeout(
        () => setChat([{ text: "새로운 손님, 기분이 어때요?", loading: true }]),
        2000
      );
    }
  }, []);

  return useObserver(() => (
    <Container>
      <ChatBox>
        <Head>
          <span>어디갈까봇</span>
        </Head>
        <Body>
          {chat.map((each, i) =>
            each.loading ? (
              <TextWrap left={i % 2 === 0}>
                <Profile
                  src={i % 2 === 0 ? chatBot : user}
                  left={i % 2 === 0}
                />
                <SpeechBubble>{each.text}</SpeechBubble>
              </TextWrap>
            ) : (
              <TextWrap left={i % 2 === 0}>
                <Profile
                  src={i % 2 === 0 ? chatBot : user}
                  left={i % 2 === 0}
                />
                <SpeechBubble>...</SpeechBubble>
              </TextWrap>
            )
          )}
        </Body>
        <Foot>
          <Input type="text" placeholder="무엇이 궁금하세요?" />
          <Btn />
        </Foot>
      </ChatBox>
    </Container>
  ));
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

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  padding: 10px;
  ${(props) =>
    props.left
      ? css`
          justify-content: flex-start;
        `
      : css`
          justify-content: flex-end;
        `}
`;
const Profile = styled.img`
  height: 40px;
  padding: 5px;
  border: 1px solid black;
  background-color: #fff;
  border-radius: 50%;
  ${(props) =>
    props.left
      ? css`
          margin-right: 10px;
        `
      : css`
          margin-left: 10px;
        `}
`;

const SpeechBubble = styled.div`
  padding: 7px 10px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
