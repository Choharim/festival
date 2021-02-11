import React from "react";
import styled from "styled-components";
import chatBot from "images/chatBot.png";
import speechBubble from "images/speechBubble.png";
import { useHistory } from "react-router-dom";

const ChatBot = () => {
  let history = useHistory();

  return (
    <>
      <TextBox image={speechBubble}></TextBox>
      <Text>질문하세요!</Text>
      <ChatBotIcon
        image={chatBot}
        onClick={() => history.push("/chatBot")}
      ></ChatBotIcon>
    </>
  );
};

export default ChatBot;

const ChatBotIcon = styled.div`
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 65px;
  height: 65px;
  border: 2px solid black;
  border-radius: 50%;
  background-size: contain;
  background-image: url(${(props) => props.image});
  background-color: #fff;
  cursor: pointer;
`;

const TextBox = styled.div`
  position: fixed;
  bottom: 85px;
  right: 15px;
  width: 70px;
  height: 70px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.image});
`;

const Text = styled.span`
  position: fixed;
  bottom: 118px;
  right: 20px;
  font-size: 12px;
  font-weight: bolder;
`;
